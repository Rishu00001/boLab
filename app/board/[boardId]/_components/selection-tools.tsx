"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf, useMutation } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    // 🔹 All hooks must run on every render – no conditions above them
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();
    const moveToBack  = useMutation((
        {storage}
    )=>{
        const liveLayerIds = storage.get("layerIds");
        const indices : number[] = [];
        const arr = liveLayerIds.toArray();
        for(let i = 0; i < arr.length; i++ ){
            if(selection.includes(arr[i])){
                indices.push(i)
            }
        }
        for(let i = 0; i < indices.length; i++){
            liveLayerIds.move(indices[i],i)
        }
    },[selection])
   
    const moveToFront = useMutation(({ storage }) => {
  const liveLayerIds = storage.get("layerIds");
  const indices: number[] = [];
  const arr = liveLayerIds.toArray();

  // Find indices of all selected layers
  for (let i = 0; i < arr.length; i++) {
    if (selection.includes(arr[i])) {
      indices.push(i);
    }
  }

  // Move each selected layer to the top (end of list)
  // IMPORTANT: iterate backwards so indices don’t shift
  for (let i = indices.length - 1; i >= 0; i--) {
    liveLayerIds.move(indices[i], liveLayerIds.length - 1);
  }
}, [selection]);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);
        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    // 🔹 Conditional return ONLY AFTER hooks
    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-2 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
          )`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col ">
               <Hint label="Bring to front">
                <Button variant={"board"}size={"icon"}  onClick={moveToFront} >
                   <BringToFront/>
                </Button>
               </Hint>
               <Hint label="Send to back" side="bottom">
                <Button variant={"board"} size={"icon"} onClick={moveToBack}  >
                   <SendToBack />
                </Button>
               </Hint>
        </div>
        <div className="flex items-center  border-l border-neutral-300">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
