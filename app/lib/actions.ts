'use server';
import { signIn } from '../../auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const response = await signIn('credentials', {
      redirect: false, // Empêche la redirection automatique
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (!response.ok) {
      // Simule une erreur d'authentification
      const error = new Error('Invalid credentials.');
      (error as any).type = 'CredentialsSignin';
      throw error;
    }

    return undefined; // Renvoie undefined en cas de succès
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'Invalid credentials.';
    }
    return 'Something went wrong.';
  }
}
