"use client";
import { currentUser } from "@clerk/nextjs/server";
import { UserAvatar } from "./user-avatar";
import { useSelf, useOthers } from "@/liveblocks.config";
import { User } from "lucide-react";
import { connectionIdToColor } from "@/lib/utils";

const MAX_DISPLAYED_AVATARS = 2;
export const Partcipants = () => {
  const users = useOthers();
  const self = useSelf();
  const hasMoreUsers = users.length > MAX_DISPLAYED_AVATARS;

  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md
        p-3 flex items-center shadow-md"
    >
      <div className="flex gap-x-2">
        {users.slice(0, MAX_DISPLAYED_AVATARS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.charAt(0).toUpperCase()}
            />
          );
        })}
        {
          self && (
            <UserAvatar
              borderColor={connectionIdToColor(self.connectionId)}
             src={self.info?.picture}
             name={`${self.info?.name} (You)`}
             fallback={self.info?.name?.charAt(0).toUpperCase()}
            />
          )
        }
        {
          hasMoreUsers && (
            <UserAvatar
              borderColor={connectionIdToColor(self.connectionId)}
              name = {`${users.length - MAX_DISPLAYED_AVATARS} more`}
              fallback={`+${users.length - MAX_DISPLAYED_AVATARS}`}
            />
          )
        }
      </div>
    </div>
  );
};
Partcipants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div
      className="absolute h-12 top-2 right-2 rounded-md p-3 flex items-center 
      shadow-md bg-white"
    >
      <div className="flex gap-x-2 animate-pulse">

        {/* Fake avatar 1 */}
        <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300"></div>

      </div>
    </div>
  );
};


