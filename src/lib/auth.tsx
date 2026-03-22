'use client';

import { SessionProvider, useSession as useNextAuthSession } from 'next-auth/react';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const useAuth = useNextAuthSession;
