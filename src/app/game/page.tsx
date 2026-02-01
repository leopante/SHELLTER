import CrabGame from '@/components/CrabGame';
import Link from 'next/link';

export default function GamePage() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-shell-surface border border-shell-border rounded-lg hover:border-shell-primary transition-colors text-sm"
        >
          <span>←</span>
          <span>Back</span>
        </Link>
      </div>
      <CrabGame />
    </div>
  );
}
