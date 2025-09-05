"use client";

import React from "react";
import { NavBarLogo } from "./NavBarLogo";
import { NavBarSearch } from "./NavBarSearch";
import { NavBarActions } from "./NavBarActions";

export function NavBar() {
  return (
    <nav className="w-full bg-[var(--background)] border-b border-gray-100 px-4 sm:px-6 py-3">
      <div className="mx-auto w-full max-w-[1376px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <NavBarLogo />
        </div>

        <div className="flex-1">
          <NavBarSearch />
        </div>

        <div className="flex items-center">
          <NavBarActions />
        </div>
      </div>
    </nav>
  );
}
