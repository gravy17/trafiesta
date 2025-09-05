import Image from "next/image";
import Link from "next/link";
import React from "react";

export function NavBarActions() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/House.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Home</span>
      </Link>

      <Link href="/dashboard" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/ChartPieSlice.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Dashboard</span>
      </Link>

      <Link href="/wallet" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/Wallet.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Wallet</span>
      </Link>

      <Link href="/plan" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/SuitcaseRolling.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Plan a trip</span>
      </Link>

      <Link href="/commission" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/HandCoins.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Commission for life</span>
      </Link>

      <div className="h-8 w-px bg-gray-200 mx-1"></div>

      <button className="hidden md:inline-flex items-center gap-2 bg-[#0066ff] text-white px-4 py-2 rounded-md text-sm font-medium">
        <span>Subscribe</span>
      </button>

      <Link href="#" className="flex flex-col items-center text-[var(--foreground)]" aria-label="Notifications">
        <Image src="/Bell.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Notifications</span>
      </Link>

      <Link href="/cart" className="flex flex-col items-center text-[var(--foreground)]" aria-label="Cart">
        <Image src="/Basket.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Cart</span>
      </Link>

      <Link href="/create" className="hidden sm:flex flex-col items-center text-[var(--foreground)] hover:opacity-90">
        <Image src="/PlusSquare.svg" alt="" width={20} height={20} className="mb-1" />
        <span className="text-xs font-medium">Create</span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center text-[var(--foreground)]">
        <Image src="/UserPlus.svg" alt="" width={20} height={20} className="mb-1" />
      </Link>
    </div>
  );
}
