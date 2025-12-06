"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/app/(dashboard)/_components/actions";
import { Menu } from "lucide-react";
interface InfoProps {
  boardId: string;
}
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const TabSeperator = () => {
  return <div className="w-[1.5px] h-6 bg-neutral-300 mx-2" />;
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });
  if (!data) {
    return Info.Skeleton();
  }
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to Boards" side="bottom" sideOffset={2}>
        <Button asChild variant="board">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                poppins.className
              )}
            >
              BoLab
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Edit title" side="bottom" sideOffset={2}>
        <Button
          onClick={() => onOpen(data?._id, data?.title)}
          variant="board"
          className="text-base font-normal px-2 cursor-pointer"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={2}>
              <div>
                <Hint label="Menu" side="bottom" sideOffset={2}>
                  <Button size= "icon" variant="board" >
                    <Menu/>
                  </Button>
                </Hint>
              </div>
      </Actions>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div
      className="absolute top-2 left-2 bg-white rounded-md px-2 h-12 flex items-center shadow-sm
    w-[300px] animate-pulse"
    ></div>
  );
};
