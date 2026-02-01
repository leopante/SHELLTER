import CrabGame from '@/components/CrabGame';
import Link from 'next/link';

export default function GamePage() {
  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-shell-surface border border-shell-border rounded-md hover:border-shell-primary transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>
      <CrabGame />
    </div>
  );
}
