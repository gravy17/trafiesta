import Image from "next/image";
import Link from "next/link";
import React from "react";

export function NavBarLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline" title="Go to homepage">
      <Image src="/logo.svg" alt="Trafiesta" width={58} height={56} className="object-cover" />
    </Link>
  );
}
