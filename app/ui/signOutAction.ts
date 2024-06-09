// signOutAction.js

'use server';

import { signOut } from '../../auth';

export async function handleSignOut() {
  await signOut();
}
