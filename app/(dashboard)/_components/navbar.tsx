"use client";

import { OrganizationSwitcher, UserButton , useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
  const {organization} = useOrganization();
  return (
    <div className="flex items-center justify-between gap-x-4 p-5">
      {/* For large screens */}
      <div className="hidden lg:flex flex-1 z-30">
        <SearchInput />
      </div>

      {/* For small screens */}
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal={true}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "200px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      {/* Right-side user button */}
      <UserButton />
    </div>
  );
};
