"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PinnacleLogo } from '@/components/ui/PinnacleLogo';
import { supabaseBrowser } from '@/lib/supabase';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = supabaseBrowser();
        const {error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if(error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSent(true);
        setLoading(false);
    }

    if(sent) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <div className="mb-8">
                    <Link href='/'><PinnacleLogo variant='default' height={44}/></Link>
                </div>
                <Card className='w-full max-w-sm text-center'>
                    <CardContent className='pt-6 space-y-3'>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-xl font-bold text-ink">Check your email</h2>
                        <p className="text-sm text-ink-muted leading-relaxed">
                            We sent a password reset link to <strong>{email}</strong>. 
                            Check your inbox and follow the link.
                        </p>
                        <Link href='/login' className='text-brand text-sm hover:underline block mt-2'>Back to sign in</Link>
                    </CardContent>
                </Card>
            </div>
        )
    }
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4'>
      <div className="mb-8">
        <Link href='/'><PinnacleLogo variant='default' height={44}/></Link>
      </div>

      <Card className='w-full max-w-sm'>
        <CardHeader>
            <CardTitle className='font-serif text-xl'>Reset your password</CardTitle>
            <CardDescription>Enter your email and we'll send you a reset link</CardDescription>

        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className="space-y-1.5">
                    <Label htmlFor='email'>Email</Label>
                    <input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='you@example.com' required autoFocus className='field'/>
                </div>

                {error && <p className='text-sm text-destructive'>{error}</p>}

                <Button type='submit' variant='navy' className='w-full' disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</Button>

                <p className="text-center text-sm text-ink-muted">
                    Remembered it?
                    <Link href='/login' className='text-brand hover:underline font-medium'>Sign in</Link>
                </p>
            </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
