"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PinnacleLogo } from "@/components/ui/PinnacleLogo";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const ResetPassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const supabase = supabaseBrowser();
        supabase.auth.onAuthStateChange((event) => {
            if(event === 'PASSWORD_RECOVERY') setReady(true);
        })
    }, [])

    async function handleReset(e: FormEvent) {
        e.preventDefault();
        if(password !== confirm) {
            setError("Password do not match.");
            return;
        }
        if(password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        };
        setLoading(true);
        setError('');

        const supabase = supabaseBrowser();
        const {error} = await supabase.auth.updateUser({password});

        if(error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push('/login');
    }
    
    if(!ready) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <p className="text-ink-muted text-sm">Verifying reset link...</p>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Link href='/'><PinnacleLogo variant="default" height={44}/></Link>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="font-serif text-xl">Set new password</CardTitle>
            <CardDescription>Choose a strong password for your account</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleReset} className="space-y-4">
                <div className="space-y-1 5">
                    <Label htmlFor="password">New password</Label>
                    <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8} autoFocus className="field" />
                </div>

                <div className="space-y-1 5">
                    <Label htmlFor="confirm">Confirm password</Label>
                    <input type="password" id="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" required className="field" />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" variant='navy' className="w-full" disabled={loading}>{loading ? 'Updating...' : 'Update password'}</Button>
            </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default ResetPassword
