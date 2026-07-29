import Image from "next/image";
import React from "react";

export function HeroSection() {
  return (
    <section className="w-full h-fill mb-4 relative">
      <Image src="/banner.png" alt="A Jet 2 Holiday" width={1516} height={200} className="rounded-xs object-stretch" />
      <Image src="/ArrowLeft.svg" alt="back" width={24} height={24} className="absolute top-2 left-2"/>
    
      <div className="w-fit absolute -bottom-28 right-0">
        <div className="w-fit flex gap-2">
          <button className="bg-indigo-50 p-2 w-40">
            <Image src="/UserPlus.svg" alt="Add person" width={20} height={20} className="text-blue-700 mx-auto"/>
          </button>
          <button className="bg-none border-none">
            <Image src="/DotsThree.svg" alt="Share" width={21} height={4} className="text-dark"/>
          </button>
        </div>
        <div className="w-40 mr-auto mt-6 flex align-middle justify-end">
          <button className="bg-none border-none">
            <Image src="/box.svg" alt="Person" width={20} height={20} className="text-blue-700"/>
          </button>
          <button className="bg-none border-none w-10 h-8">
            <Image src="/xx.svg" alt="Settings" width={100} height={20} className="h-6 text-dark object-cover"/>
          </button>
        </div>
      </div>
    </section>
  );
}
