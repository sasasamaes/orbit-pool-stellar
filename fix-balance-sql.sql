-- Corrección de la función calculate_group_balance
-- Problema: "column reference 'total_balance' is ambiguous"

DROP FUNCTION IF EXISTS calculate_group_balance(UUID);

CREATE OR REPLACE FUNCTION calculate_group_balance(group_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    calculated_balance DECIMAL := 0;
BEGIN
    -- Calcular balance sumando current_balance de membresías activas
    SELECT COALESCE(SUM(gm.current_balance), 0)
    INTO calculated_balance
    FROM public.group_memberships gm
    WHERE gm.group_id = group_uuid AND gm.status = 'active';
    
    -- Actualizar el total_balance del grupo (con alias explícito)
    UPDATE public.groups g
    SET total_balance = calculated_balance
    WHERE g.id = group_uuid;
    
    RETURN calculated_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verificar la función corregida
SELECT 'Función calculate_group_balance corregida exitosamente' as status; 