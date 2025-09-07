import Image from "next/image";
import React from "react";

export function HeroSection() {
  return (
    <section className="w-full max-w-[1412px] max-h-[200px] ml-auto mr-4 mb-2">
      <Image src="/banner.png" alt="A Jet 2 Holiday" width={1412} height={200} className="rounded-xs object-contain" />
    </section>
  );
}
