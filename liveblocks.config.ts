// liveblocks.config.ts
import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Layer, Color } from "@/types/canvas";
// --- Create Liveblocks Client ---
export const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

// --- Set up React context for Rooms ---
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useUpdateMyPresence,
    useStorage,
    useMutation,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useMyPresence,
    useSelf,
    useHistory,
    useCanRedo,
    useCanUndo,
    useRedo,
    useUndo,
    useOther,
  },
} = createRoomContext(client);

// --- Extend Liveblocks types globally ---
declare global {
  interface Liveblocks {
    Presence: {
      // Example:
      cursor?: { x: number; y: number } | null,
      selection : string[],
      pencilDraft : [x : number , y : number , pressure : number][] | null,
      penColor : Color | null;
    };

    Storage: {
      layers : LiveMap<string,LiveObject<Layer>>;
      layerIds : LiveList<string>;
    };

    UserMeta: {
      id?: string;
      info?: {
        name?: string;
        picture?: string;
      };
    };

    RoomEvent: {
      // Example:
      // type: "PING" | "DRAW";
    };

    ThreadMetadata: {
      // Example:
      // x: number;
      // y: number;
    };

    RoomInfo: {
      // Example:
      // title: string;
      // url: string;
    };
  }
}
