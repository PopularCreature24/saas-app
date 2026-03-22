'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function AuthErrorPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground max-w-md">
          There was an error during authentication. This could be due to:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside">
          <li>Invalid or expired sign-in link</li>
          <li>Account already exists with different provider</li>
          <li>Network connectivity issues</li>
        </ul>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/auth/login">
            <Button variant="outline">Try Again</Button>
          </Link>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
