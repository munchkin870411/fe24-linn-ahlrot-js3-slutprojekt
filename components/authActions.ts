'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function loginWithGoogle() {
  await signIn('google');
  redirect('/');
}

export async function logout() {
  await signOut();
  redirect('/');
}
