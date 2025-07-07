"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession } from '@/lib/supabase';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    async function check() {
      const { data } = await getSession();
      if (!data.session && pathname !== '/login') {
        router.push('/login');
      }
    }
    check();
  }, [pathname, router]);
  return <>{children}</>;
} 