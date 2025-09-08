

import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { FlightsSection } from "./components/FlightsSection";
import { HotelsSection } from "./components/HotelsSection";
import { ActivitiesSection } from "./components/ActivitiesSection";
import { TripSummary } from "./components/TripSummary";
import { AddToItinerary } from "./components/AddToItinerary";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 items-center">
      <NavBar />
      <main className="flex flex-1 w-full max-w-[1920px] px-2 sm:px-6 gap-6 mt-2">
        <div className="hidden md:block w-[300px] max-h-[800px] min-w-48 max-w-xs flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col justify-between max-w-full bg-white rounded-xs mt-4 p-4">
          <HeroSection />
          <TripSummary />
          <div className="w-fit mr-auto gap-1 flex flex-col md:flex-row justify-start mb-10 mt-4">
            <AddToItinerary 
              title="Activities" 
              description="Build, personalize, and optimize your itineraries with our trip planner."
              backgroundColor="slate"
              primaryColor="white"
              buttonTextColor="white"
              buttonBgColor="blue"
            />
            <AddToItinerary 
              title="Hotels" 
              description="Build, personalize, and optimize your itineraries with our trip planner."
              backgroundColor="skyblue"
              primaryColor="slate"
              buttonTextColor="white"
              buttonBgColor="blue"
            />
            <AddToItinerary 
              title="Flights" 
              description="Build, personalize, and optimize your itineraries with our trip planner."
              backgroundColor="blue"
              primaryColor="white"
              buttonTextColor="blue"
              buttonBgColor="white"
            />
          </div>
          <div className="w-full flex flex-col gap-4 mt-10">
            <div className="">
              <h2 className="text-dark text-xl font-semibold">Trip itineraries</h2>
              <p className="text-slate-500 text-sm">Your trip itineraries are placed here</p>
            </div>
            <FlightsSection />
            <HotelsSection />
            <ActivitiesSection />
          </div>
        </div>
      </main>
    </div>
  );
}
