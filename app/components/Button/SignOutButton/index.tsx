'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

export default function SignOutButton() {
  return (
    <button
      type="button"
      className="flex h-full items-center space-x-3"
      onClick={() => signOut()}
    >
      <span className="text-lg font-semibold 2xl:text-2xl">Sair</span>
      <div className="text text-xl 2xl:text-2xl">
        <FiLogOut />
      </div>
    </button>
  );
}
