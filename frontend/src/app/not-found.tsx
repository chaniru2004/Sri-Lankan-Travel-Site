import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-ceylon-500/20 border border-ceylon-400 text-ceylon-300 flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-playfair text-6xl font-bold text-white">404</h1>
      <h2 className="font-playfair text-2xl font-bold text-sand-100">Page Not Found in Ceylon</h2>
      <p className="text-xs text-sand-200">
        The destination or travel story you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-ceylon-500 hover:bg-ceylon-400 text-ceylon-950 font-bold text-xs uppercase tracking-wider transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
