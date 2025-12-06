"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connctionId) => (
        <Cursor key={connctionId} connectionId={connctionId} />
      ))}
    </>
  );
};
export const CursorsPresence = memo(() => {
  return (
    <>
     {/* todo:draft pencil */}
      <Cursors />
    </>
  );
});
CursorsPresence.displayName = "CursorsPresence";
