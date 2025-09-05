import Image from "next/image";
import Link from "next/link";
import React from "react";

export function NavBarActions() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/House.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Home</span>
      </Link>

      <Link href="/dashboard" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/ChartPieSlice.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Dashboard</span>
      </Link>

      <Link href="/wallet" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/Wallet.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Wallet</span>
      </Link>

      <Link href="/plan" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/ListChecks.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Plan a trip</span>
      </Link>

      <Link href="/commission" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/HandCoins.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Commission for life</span>
      </Link>

      <div className="h-8 w-px bg-gray-200 mx-1"></div>

      <button className="hidden h-[40px] w-[104px] md:inline-flex bg-[#0066ff] text-white px-4 py-2 rounded-md text-sm font-medium">
        <span className="w-full">Subscribe</span>
      </button>

      <Link href="#" className="flex flex-col items-center justify-between text-[var(--foreground)] h-[56px]" aria-label="Notifications">
        <Image src="/Bell.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Notification</span>
      </Link>

      <Link href="/cart" className="flex flex-col items-center justify-between text-[var(--foreground)] h-[56px]" aria-label="Cart">
        <Image src="/Basket.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Carts</span>
      </Link>

      <Link href="/create" className="hidden sm:flex flex-col items-center justify-between text-[var(--foreground)] hover:opacity-90 h-[56px]">
        <Image src="/PlusSquare.svg" alt="" width={32} height={32} className="mb-1" />
        <span className="text-xs font-medium">Create</span>
      </Link>

      <Link href="/profile" className="flex flex-row justify-between text-[var(--foreground)] h-[56px] w-[91px]">
        <Image src="/Ellipse 775.svg" alt="" width={52} height={52} className="mb-1" />
        <Image src="/CaretDown.svg" alt="" width={24} height={24} className="mb-1" />
      </Link>
    </div>
  );
}
