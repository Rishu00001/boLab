"use client";

import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>

      <DialogContent
        // we use important utilities to override Radix default inline styles
        className="
          p-0
          shadow-none!
          bg-transparent
          h-[80vh]
          overflow-hidden
          max-w-[850px]!
          w-[850px]
        "
      >
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
