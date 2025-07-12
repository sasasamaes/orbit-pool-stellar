'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { Loader2 } from 'lucide-react';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthWrapper({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/login' 
}: AuthWrapperProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo);
      } else if (!requireAuth && user) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, requireAuth, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
}