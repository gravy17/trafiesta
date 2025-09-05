"use client";

import React from "react";
import { NavBarLogo } from "./NavBarLogo";
import { NavBarSearch } from "./NavBarSearch";
import { NavBarActions } from "./NavBarActions";

export function NavBar() {
  return (
    <nav className="w-full h-[134px] bg-[var(--background)] border-b border-gray-100 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1920px] flex items-center justify-between gap-4 h-full">
        <div className="flex items-center gap-4">
          <NavBarLogo />
        </div>

        <div className="flex-1 max-w-[400] mr-auto">
          <NavBarSearch />
        </div>

        <div className="flex items-center">
          <NavBarActions />
        </div>
      </div>
    </nav>
  );
}
