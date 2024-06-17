// app/lib/actions.ts

'use server';
import { AuthError } from 'next-auth';
import { signIn } from '../../auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      redirect: false, // Empêche la redirection automatique
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    return undefined; // Renvoie undefined en cas de succès
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
