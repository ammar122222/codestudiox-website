// src/components/layout/SiteHeader.tsx
import logo from '/logo.png';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle?: string;
  backLink?: string;   // optional “Back to …” link
}

export default function SiteHeader({
  title,
  subtitle = 'Welcome back to CodeStudioX',
  backLink,
}: Props) {
  const { logout } = useAdmin();

  return (
    <header className="bg-slate-800/50 border-b border-electric-blue/20 p-6">
      <div className="flex justify-between items-center">
        {/* logo + titles */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="text-3xl font-bold gradient-text">{title}</h1>
            <p className="text-gray-400">{subtitle}</p>
          </div>
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          {backLink && (
            <Link to={backLink} className="text-electric-blue text-sm hover:underline">
              Back
            </Link>
          )}
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
