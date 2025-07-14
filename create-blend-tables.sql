-- Script para crear todas las tablas de Blend necesarias
-- Ejecutar este script en Supabase antes de usar las funcionalidades de Blend

-- Crear tabla para inversiones de Blend
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

-- Crear tabla para retiros de Blend
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

-- Crear tabla para configuración de Blend por grupo
CREATE TABLE IF NOT EXISTS group_blend_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE UNIQUE,
    auto_invest_enabled BOOLEAN DEFAULT true,
    min_amount_to_invest DECIMAL(20, 7) DEFAULT 100, -- Mínimo para auto-inversión
    auto_invest_frequency VARCHAR(20) DEFAULT 'daily' CHECK (auto_invest_frequency IN ('daily', 'weekly', 'monthly')),
    last_auto_invest_date TIMESTAMPTZ,
    
    -- Configuración de Blend pool
    blend_pool_address VARCHAR(64), -- Dirección del pool de Blend
    
    -- Metadatos adicionales
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crear tabla para logs de auto-inversión
CREATE TABLE IF NOT EXISTS auto_invest_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    execution_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'skipped')),
    amount_invested DECIMAL(20, 7), -- Solo si fue exitoso
    transaction_hash VARCHAR(64), -- Solo si fue exitoso
    error_message TEXT, -- Solo si falló
    triggered_by VARCHAR(20) DEFAULT 'automatic' CHECK (triggered_by IN ('automatic', 'manual')),
    
    -- Metadatos adicionales
    metadata JSONB DEFAULT '{}'
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_group_id ON group_blend_investments(group_id);
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_date ON group_blend_investments(investment_date DESC);
CREATE INDEX IF NOT EXISTS idx_group_blend_investments_type ON group_blend_investments(investment_type);

CREATE INDEX IF NOT EXISTS idx_group_blend_withdrawals_group_id ON group_blend_withdrawals(group_id);
CREATE INDEX IF NOT EXISTS idx_group_blend_withdrawals_date ON group_blend_withdrawals(withdrawal_date DESC);

CREATE INDEX IF NOT EXISTS idx_group_blend_settings_group_id ON group_blend_settings(group_id);

CREATE INDEX IF NOT EXISTS idx_auto_invest_logs_group_id ON auto_invest_logs(group_id);
CREATE INDEX IF NOT EXISTS idx_auto_invest_logs_execution_date ON auto_invest_logs(execution_date DESC);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_group_blend_investments_updated_at 
    BEFORE UPDATE ON group_blend_investments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_blend_withdrawals_updated_at 
    BEFORE UPDATE ON group_blend_withdrawals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_group_blend_settings_updated_at 
    BEFORE UPDATE ON group_blend_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar configuración por defecto para grupos existentes
INSERT INTO group_blend_settings (group_id, auto_invest_enabled, min_amount_to_invest)
SELECT id, true, 100
FROM groups
WHERE NOT EXISTS (
    SELECT 1 FROM group_blend_settings WHERE group_id = groups.id
);

-- Verificar que las tablas se crearon correctamente
SELECT 
    'group_blend_investments' as table_name,
    COUNT(*) as record_count
FROM group_blend_investments
UNION ALL
SELECT 
    'group_blend_withdrawals' as table_name,
    COUNT(*) as record_count
FROM group_blend_withdrawals
UNION ALL
SELECT 
    'group_blend_settings' as table_name,
    COUNT(*) as record_count
FROM group_blend_settings
UNION ALL
SELECT 
    'auto_invest_logs' as table_name,
    COUNT(*) as record_count
FROM auto_invest_logs;

-- Mostrar estructura de las tablas
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('group_blend_investments', 'group_blend_withdrawals', 'group_blend_settings', 'auto_invest_logs')
ORDER BY table_name, ordinal_position; 