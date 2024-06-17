import Link from 'next/link';
import { handleSignOut } from './signOutAction';
import { useRouter } from 'next/navigation';

export default function SideNav() {
  const router = useRouter();

  const onSignOut = async () => {
    await handleSignOut();
    router.push('/login');
  };

  return (
    <div className="flex w-full px-3 py-4 md:px-2 justify-end">
      <div>
        <form
          action={onSignOut}
        >
          <button className="text-accent">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
