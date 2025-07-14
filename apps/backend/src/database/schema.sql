-- Community Wallet Database Schema
-- This file contains the complete database schema for the Community Wallet MVP

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    stellar_public_key TEXT UNIQUE,
    phone TEXT,
    country_code TEXT DEFAULT 'MX',
    timezone TEXT DEFAULT 'America/Mexico_City',
    language TEXT DEFAULT 'es',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Groups table
CREATE TABLE public.groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    stellar_account_id TEXT UNIQUE, -- Multi-signature stellar account for the group
    invite_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
    settings JSONB DEFAULT '{
        "min_contribution": 10,
        "max_contribution": 10000,
        "contribution_frequency": "monthly",
        "withdrawal_requires_approval": true,
        "max_members": 50,
        "auto_invest_enabled": true,
        "yield_distribution": "proportional"
    }',
    total_balance DECIMAL(20, 7) DEFAULT 0,
    total_yield DECIMAL(20, 7) DEFAULT 0,
    member_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Group memberships
CREATE TABLE public.group_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'pending')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_contributed DECIMAL(20, 7) DEFAULT 0,
    total_withdrawn DECIMAL(20, 7) DEFAULT 0,
    current_balance DECIMAL(20, 7) DEFAULT 0,
    yield_earned DECIMAL(20, 7) DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'left')),
    
    UNIQUE(group_id, user_id)
);

-- Transactions table
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('contribution', 'withdrawal', 'yield_distribution', 'fee')),
    amount DECIMAL(20, 7) NOT NULL,
    fee DECIMAL(20, 7) DEFAULT 0,
    stellar_transaction_id TEXT UNIQUE,
    stellar_operation_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled')),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    
    -- Ensure amount is positive for contributions and negative for withdrawals
    CHECK (
        (type = 'contribution' AND amount > 0) OR
        (type = 'withdrawal' AND amount < 0) OR
        (type = 'yield_distribution' AND amount > 0) OR
        (type = 'fee' AND amount < 0)
    )
);

-- Withdrawal requests table (for groups that require approval)
CREATE TABLE public.withdrawal_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    amount DECIMAL(20, 7) NOT NULL CHECK (amount > 0),
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id),
    review_notes TEXT,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

-- Yield distributions table (tracks Blend protocol earnings)
CREATE TABLE public.yield_distributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    total_yield DECIMAL(20, 7) NOT NULL CHECK (total_yield > 0),
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    blend_pool_id TEXT,
    apy_rate DECIMAL(8, 4), -- Annual Percentage Yield
    distributed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(group_id, period_start, period_end)
);

-- Individual yield allocations
CREATE TABLE public.yield_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    yield_distribution_id UUID NOT NULL REFERENCES public.yield_distributions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    allocated_amount DECIMAL(20, 7) NOT NULL CHECK (allocated_amount > 0),
    basis_balance DECIMAL(20, 7) NOT NULL, -- Balance used to calculate allocation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(yield_distribution_id, user_id)
);

-- Audit log for important events
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES public.users(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('group_invite', 'contribution_received', 'withdrawal_approved', 'yield_distributed', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_stellar_public_key ON public.users(stellar_public_key);
CREATE INDEX idx_groups_creator_id ON public.groups(creator_id);
CREATE INDEX idx_groups_invite_code ON public.groups(invite_code);
CREATE INDEX idx_group_memberships_group_id ON public.group_memberships(group_id);
CREATE INDEX idx_group_memberships_user_id ON public.group_memberships(user_id);
CREATE INDEX idx_transactions_group_id ON public.transactions(group_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_stellar_transaction_id ON public.transactions(stellar_transaction_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);
CREATE INDEX idx_withdrawal_requests_group_id ON public.withdrawal_requests(group_id);
CREATE INDEX idx_withdrawal_requests_user_id ON public.withdrawal_requests(user_id);
CREATE INDEX idx_yield_distributions_group_id ON public.yield_distributions(group_id);
CREATE INDEX idx_yield_allocations_distribution_id ON public.yield_allocations(yield_distribution_id);
CREATE INDEX idx_audit_logs_table_record ON public.audit_logs(table_name, record_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON public.groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yield_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yield_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Group memberships: users can see groups they belong to
CREATE POLICY "Members can view group memberships" ON public.group_memberships
    FOR SELECT USING (
        user_id = auth.uid() OR 
        group_id IN (
            SELECT group_id FROM public.group_memberships 
            WHERE user_id = auth.uid() AND role IN ('admin', 'member')
        )
    );

-- Groups: users can see groups they are members of
CREATE POLICY "Members can view groups" ON public.groups
    FOR SELECT USING (
        id IN (
            SELECT group_id FROM public.group_memberships 
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

-- Transactions: users can see transactions from their groups
CREATE POLICY "Members can view group transactions" ON public.transactions
    FOR SELECT USING (
        group_id IN (
            SELECT group_id FROM public.group_memberships 
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

-- Functions for common operations
CREATE OR REPLACE FUNCTION get_user_groups(user_uuid UUID)
RETURNS TABLE(
    group_id UUID,
    group_name TEXT,
    role TEXT,
    member_count INTEGER,
    total_balance DECIMAL,
    user_balance DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        g.id,
        g.name,
        gm.role,
        g.member_count,
        g.total_balance,
        gm.current_balance
    FROM public.groups g
    JOIN public.group_memberships gm ON g.id = gm.group_id
    WHERE gm.user_id = user_uuid AND gm.status = 'active'
    ORDER BY gm.joined_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION calculate_group_balance(group_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    calculated_balance DECIMAL := 0;
BEGIN
    SELECT COALESCE(SUM(gm.current_balance), 0)
    INTO calculated_balance
    FROM public.group_memberships gm
    WHERE gm.group_id = group_uuid AND gm.status = 'active';
    
    -- Update the group total balance
    UPDATE public.groups 
    SET total_balance = calculated_balance
    WHERE id = group_uuid;
    
    RETURN calculated_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- INVITATIONS TABLE
-- =====================================================

CREATE TABLE public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    inviter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Invitation tokens
    invite_token TEXT NOT NULL UNIQUE, -- Secure token for URLs
    invite_code TEXT NOT NULL, -- Short code for manual entry
    
    -- Optional email for direct invitations
    email TEXT,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
    
    -- Expiry and usage tracking
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    used_by UUID REFERENCES public.users(id),
    
    -- Optional invitation message
    message TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for invitations
CREATE INDEX idx_invitations_token ON public.invitations(invite_token);
CREATE INDEX idx_invitations_code ON public.invitations(invite_code);
CREATE INDEX idx_invitations_group_id ON public.invitations(group_id);
CREATE INDEX idx_invitations_email ON public.invitations(email);
CREATE INDEX idx_invitations_status ON public.invitations(status);
CREATE INDEX idx_invitations_expires_at ON public.invitations(expires_at);

-- RLS for invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view invitations they created or that are for groups they admin
CREATE POLICY "Users can view relevant invitations" ON public.invitations
    FOR SELECT USING (
        inviter_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.group_memberships gm 
            WHERE gm.group_id = invitations.group_id 
            AND gm.user_id = auth.uid() 
            AND gm.role = 'admin' 
            AND gm.status = 'active'
        )
    );

-- Policy: Only group admins can create invitations
CREATE POLICY "Group admins can create invitations" ON public.invitations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.group_memberships gm 
            WHERE gm.group_id = invitations.group_id 
            AND gm.user_id = auth.uid() 
            AND gm.role = 'admin' 
            AND gm.status = 'active'
        )
    );

-- Policy: Only invitation creator or group admins can update invitations
CREATE POLICY "Can update own or group invitations" ON public.invitations
    FOR UPDATE USING (
        inviter_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.group_memberships gm 
            WHERE gm.group_id = invitations.group_id 
            AND gm.user_id = auth.uid() 
            AND gm.role = 'admin' 
            AND gm.status = 'active'
        )
    );

-- Policy: Only group admins can delete invitations
CREATE POLICY "Group admins can delete invitations" ON public.invitations
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.group_memberships gm 
            WHERE gm.group_id = invitations.group_id 
            AND gm.user_id = auth.uid() 
            AND gm.role = 'admin' 
            AND gm.status = 'active'
        )
    );

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_invitations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_invitations_updated_at
    BEFORE UPDATE ON public.invitations
    FOR EACH ROW
    EXECUTE FUNCTION update_invitations_updated_at();

-- Function to clean up expired invitations (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_invitations()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE public.invitations 
    SET status = 'expired'
    WHERE status = 'pending' 
    AND expires_at < NOW();
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tabla para registrar las inversiones automáticas en Blend
CREATE TABLE IF NOT EXISTS group_blend_investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    amount_invested DECIMAL(20, 7) NOT NULL, -- Cantidad invertida en USDC
    transaction_hash VARCHAR(64) NOT NULL, -- Hash de la transacción Stellar
    investment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    triggered_by UUID NOT NULL REFERENCES users(id), -- Usuario que activó la inversión
    investment_type VARCHAR(20) DEFAULT 'auto' CHECK (investment_type IN ('auto', 'manual')), -- Tipo de inversión
    
    -- Metadatos adicionales
    metadata JSONB DEFAULT '{}',
    
    -- Índices
    CONSTRAINT positive_amount_invested CHECK (amount_invested > 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla para registrar los retiros de Blend
CREATE TABLE IF NOT EXISTS group_blend_withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    amount_withdrawn DECIMAL(20, 7) NOT NULL, -- Cantidad retirada en USDC
    transaction_hash VARCHAR(64) NOT NULL, -- Hash de la transacción Stellar
    withdrawal_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reason TEXT, -- Razón del retiro
    triggered_by UUID NOT NULL REFERENCES users(id), -- Usuario que activó el retiro
    
    -- Metadatos adicionales
    metadata JSONB DEFAULT '{}',
    
    -- Índices
    CONSTRAINT positive_amount_withdrawn CHECK (amount_withdrawn > 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla para almacenar configuraciones de auto-inversión por grupo
CREATE TABLE IF NOT EXISTS group_blend_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE UNIQUE,
    
    -- Configuraciones de auto-inversión
    auto_invest_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    min_amount_to_invest DECIMAL(20, 7) NOT NULL DEFAULT 100, -- Mínimo $100 USDC
    investment_day INTEGER NOT NULL DEFAULT 3, -- Día del mes (1-28)
    reserve_amount DECIMAL(20, 7) NOT NULL DEFAULT 10, -- Cantidad a reservar para fees
    
    -- Pool de Blend a usar
    blend_pool_address VARCHAR(56), -- Dirección del pool de Blend
    
    -- Estadísticas
    total_invested DECIMAL(20, 7) NOT NULL DEFAULT 0,
    total_withdrawn DECIMAL(20, 7) NOT NULL DEFAULT 0,
    total_yield_earned DECIMAL(20, 7) NOT NULL DEFAULT 0,
    last_investment_date TIMESTAMPTZ,
    
    -- Metadatos
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_group_id ON group_blend_investments(group_id);
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_date ON group_blend_investments(investment_date DESC);
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_type ON group_blend_investments(investment_type);
CREATE INDEX IF NOT EXISTS idx_group_blend_withdrawals_group_id ON group_blend_withdrawals(group_id);
CREATE INDEX IF NOT EXISTS idx_group_blend_withdrawals_date ON group_blend_withdrawals(withdrawal_date DESC);
CREATE INDEX IF NOT EXISTS idx_group_blend_settings_group_id ON group_blend_settings(group_id);

-- Triggers para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_group_blend_investments_updated_at BEFORE UPDATE ON group_blend_investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_group_blend_withdrawals_updated_at BEFORE UPDATE ON group_blend_withdrawals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_group_blend_settings_updated_at BEFORE UPDATE ON group_blend_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabla para logs de ejecución del job de auto-inversión
CREATE TABLE IF NOT EXISTS auto_invest_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Estadísticas de ejecución
    groups_processed INTEGER NOT NULL DEFAULT 0,
    successful_investments INTEGER NOT NULL DEFAULT 0,
    failed_investments INTEGER NOT NULL DEFAULT 0,
    total_amount_invested DECIMAL(20, 7) NOT NULL DEFAULT 0,
    
    -- Errores y detalles
    errors TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para la tabla de logs
CREATE INDEX IF NOT EXISTS idx_auto_invest_logs_execution_date ON auto_invest_logs(execution_date DESC);