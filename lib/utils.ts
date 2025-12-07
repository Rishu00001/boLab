import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  "#dc2626",
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#db2777",
  "#14b8a6",
  "#eab308",
];

export function connectionIdToColor(connectionId: number) {
  return COLORS[Number(connectionId) % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y),
  };
}
export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }
  if ((corner & Side.Top) === Side.Top) {
    ((result.y = Math.min(point.y, bounds.y + bounds.height)),
      (result.height = Math.abs(bounds.y + bounds.height - point.y)));
  }
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }
  return result;
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids: string[] = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) continue;

    const { x, y, width, height } = layer;

    // rectangle intersection check
    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
}

export function getContrastingTextColor(color: Color): "black" | "white" {
  // Calculate relative luminance
  const { r, g, b } = color;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If luminance is high (light color), return black; else white
  return luminance > 0.5 ? "black" : "white";
}

export function penPointsToPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("Can not transform");
  }
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    if (left > x) {
      left = x;
    }
    if (top > y) {
      top = y;
    }
    if (right < x) {
      right = x;
    }
    if (bottom < y) {
      bottom = y;
    }
  }
  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  let d = `M${stroke[0][0].toFixed(2)},${stroke[0][1].toFixed(2)} Q`;

  for (let i = 1; i < stroke.length; i++) {
    const [x0, y0] = stroke[i];
    const [x1, y1] = stroke[i - 1];
    const mx = (x1 + x0) / 2;
    const my = (y1 + y0) / 2;
    d += `${x1.toFixed(2)},${y1.toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)} `;
  }

  return d + "Z";
}
