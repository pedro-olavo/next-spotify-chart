import { unstable_getServerSession } from 'next-auth';
import { options } from '../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function useAuth() {
  const session = await unstable_getServerSession(options);

  if (!session) {
    redirect('auth/signin');
  }

  return session.user;
}
