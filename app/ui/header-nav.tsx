import Link from 'next/link';
import { handleSignOut } from './signOutAction';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function SideNav() {
  const router = useRouter();
  const { user } = useUser(); 

  const onSignOut = async () => {
    // Supprime les données de l'utilisateur du localStorage
    localStorage.removeItem('user');
    
    // Exécute l'action de déconnexion
    await handleSignOut();

    // Redirige l'utilisateur vers la page de connexion
    router.push('/login');
  };

  return (
    <div className='flex justify-between w-full items-center pt-6 pb-8 pr-16'>
      {user && (
        <h2>Bienvenue, {user.name}!</h2>
      )}
    <div className="flex  px-3 py-4 md:px-2 justify-end gap-4">
      <div>
        < Link href="/home" className="text-primary">
              <div className="hidden md:block">Home</div>
          </Link>
      </div>
      <div>
      < Link href="/score" className="text-secondary">
            <div className="hidden md:block">Score</div>
        </Link>
      </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onSignOut(); }}
        >
          <button className="text-accent">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </div>
    </div>
  );
}
