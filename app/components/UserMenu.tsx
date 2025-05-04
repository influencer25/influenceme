import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
      >
        <Image
          src="/img/avatar.png"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-300"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
          <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">Account</Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            onClick={() => { window.location.href = '/logout'; }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 