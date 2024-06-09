import Link from 'next/link';
import { handleSignOut } from './signOutAction';

export default function SideNav() {
  return (
    <div className="flex w-full px-3 py-4 md:px-2 justify-end">
      <div>
        <form
          action={async () => {
            await handleSignOut();
          }}
        >
          <button className="text-accent">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
