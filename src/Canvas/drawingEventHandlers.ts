import { RoughGenerator } from 'roughjs/bin/generator';
import { setCursorPosition } from './functions';
import { Drawable } from 'roughjs/bin/core';

export const handleMouseDown = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  generator: RoughGenerator,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  color: string,
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>,
  setLines: React.Dispatch<React.SetStateAction<any[]>>,
  createLine: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    generator: RoughGenerator
  ) => {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    roughLine: Drawable;
  }
) => {
  setIsDrawing(true);

  const cursorPosition = setCursorPosition(event, canvasRef);

  const line = createLine(
    cursorPosition.x,
    cursorPosition.y,
    cursorPosition.x,
    cursorPosition.y,
    color,
    generator
  );

  setLines((prevState) => [...prevState, line]);
};

export const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  generator: RoughGenerator,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  color: string,
  isDrawing: boolean,
  lines: any[],
  setLines: React.Dispatch<React.SetStateAction<any[]>>,
  createLine: (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    generator: RoughGenerator
  ) => {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    roughLine: Drawable;
  }
) => {
  if (!isDrawing) return;

  // initial position for current line
  const currentLineIndex = lines.length - 1;
  const { x1, y1 } = lines[currentLineIndex];

  const cursorPosition = setCursorPosition(event, canvasRef);

  const updatedLine = createLine(
    x1,
    y1,
    cursorPosition.x,
    cursorPosition.y,
    color,
    generator
  );

  // setting lines
  const linesCopy = [...lines];
  linesCopy[currentLineIndex] = updatedLine;
  setLines(linesCopy);
};

export const handleMouseUp = (
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsDrawing(false);
};
