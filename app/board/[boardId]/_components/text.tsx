import { Kalam } from "next/font/google";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn } from "@/lib/utils";

import { colorToCss } from "@/lib/utils";

import { TextLayer } from "@/types/canvas";

import { useMutation } from "@/liveblocks.config";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnHeight, maxFontSize);
};
interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e : ContentEditableEvent)=>{
    updateValue(e.target.value)
  }
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        className={cn(
          "h-full w-full flex items-center justify-center flex-col drop-shadow-md outline-none",
          kalam.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "000",
          fontSize: calculateFontSize(width, height),
        }}
        html={value || "Text Here"}
        onChange={handleContentChange}
      ></ContentEditable>
    </foreignObject>
  );
};
