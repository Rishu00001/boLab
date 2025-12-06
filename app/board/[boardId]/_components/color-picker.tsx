"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 max-w-[164px] pr-2 mr-2 border-r border-neutral-300
    items-center ">
      <ColorButton
        onClick={onChange}
        color={{ r: 243, g: 82, b: 35 }} // Red / Orange
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 165, b: 0 }} // Orange
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 255, g: 215, b: 0 }} // Yellow
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 34, g: 197, b: 94 }} // Green
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 59, g: 130, b: 246 }} // Blue
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 139, g: 92, b: 246 }} // Purple
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 236, g: 72, b: 153 }} // Pink
      />
      <ColorButton
        onClick={onChange}
        color={{ r: 30, g: 30, b: 30 }} // Black
      />
    </div>
  );
};

interface colorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: colorButtonProps) => {
  return (
    <button
      className="w-5 h-5 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-5 w-5 rounded-sm border-neutral-300"
        style={{
          background: colorToCss(color),
        }}
      />
    </button>
  );
};
