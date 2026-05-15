-- Fix 1: RLS Policy Always True (rls_policy_always_true)
-- Replaces the overly permissive `WITH CHECK (true)` with a more specific `auth.role() = 'anon'`
-- This ensures that only public anonymous users can use this policy.
DROP POLICY IF EXISTS "Allow public insert access" ON public.messages;
CREATE POLICY "Allow public insert access" ON public.messages FOR INSERT WITH CHECK (auth.role() = 'anon');

-- Fix 2 & 3: SECURITY DEFINER functions executable by public/anon/authenticated roles 
-- (anon_security_definer_function_executable, authenticated_security_definer_function_executable)
-- Revokes EXECUTE permissions from the API exposed roles.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM public, anon, authenticated;
