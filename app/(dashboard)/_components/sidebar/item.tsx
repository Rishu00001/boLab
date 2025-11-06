"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square w-10 h-10">
      <Hint label={name} side="right" align="start" sideOffset={2}>
      <Image
        onClick={handleClick}
        src={imageUrl || "/default-org.png"}
        alt={name}
        fill
        className={cn(
          "rounded-md cursor-pointer object-cover opacity-75 hover:opacity-100 transition",
          isActive && "opacity-100 ring-1 ring-offset-2 ring-offset-background ring-primary",
        )}
      />
      </Hint>
    </div>
  );
};
