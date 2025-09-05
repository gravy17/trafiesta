import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Sidebar() {
  return (
    <aside className="w-[220px] h-full bg-white border-r border-gray-100">
      <nav className="py-6 px-4 flex flex-col gap-1">
        <Link href="/activities" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/ForkKnife.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Activities</span>
        </Link>
        
        <Link href="/hotels" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/SwimmingPool.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Hotels</span>
        </Link>
        
        <Link href="/flights" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/AirplaneInFlight.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Flights</span>
        </Link>
        
        <Link href="/study" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/Student.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Study</span>
        </Link>
        
        <Link href="/visa" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/NewspaperClipping.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Visa</span>
        </Link>
        
        <Link href="/immigration" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/globe.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Immigration</span>
        </Link>
        
        <Link href="/medical" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/FirstAidKit.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Medical</span>
        </Link>
        
        <Link href="/vacation-packages" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg">
          <Image src="/SuitcaseRolling.svg" alt="" width={20} height={20} />
          <span className="text-sm text-gray-700">Vacation packages</span>
        </Link>
        
        <div className="mt-4 px-3 py-3 bg-[#F5F7FA] rounded-lg flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/UserPlus.svg" alt="" width={20} height={20} />
            <span className="text-sm text-gray-700">Personal account</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
