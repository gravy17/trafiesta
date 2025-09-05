

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { FlightsSection } from "./components/FlightsSection";
import { HotelsSection } from "./components/HotelsSection";
import { ActivitiesSection } from "./components/ActivitiesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background items-center">
      <NavBar />
      <main className="flex flex-1 w-full max-w-[1376px] px-2 sm:px-6 gap-6 mt-2">
        <div className="hidden md:block w-[16%] min-w-48 max-w-xs flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col items-center max-w-full">
          <HeroSection />
          <div className="w-full flex flex-col gap-8">
            <FlightsSection />
            <HotelsSection />
            <ActivitiesSection />
          </div>
        </div>
      </main>
    </div>
  );
}
