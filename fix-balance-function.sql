-- Corrección para la función calculate_group_balance
-- Ejecutar este SQL en Supabase SQL Editor

CREATE OR REPLACE FUNCTION calculate_group_balance(group_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    total_balance DECIMAL := 0;
BEGIN
    SELECT COALESCE(SUM(gm.current_balance), 0)
    INTO total_balance
    FROM public.group_memberships gm
    WHERE gm.group_id = group_uuid AND gm.status = 'active';
    
    -- Update the group total balance
    UPDATE public.groups 
    SET total_balance = total_balance
    WHERE id = group_uuid;
    
    RETURN total_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 