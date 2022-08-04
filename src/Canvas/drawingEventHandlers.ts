import { setCursorPosition } from './functions';

export const handleMouseDown = (
  event,
  generator,
  canvasRef,
  color,
  setIsDrawing,
  setLines,
  createLine
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
  event,
  generator,
  canvasRef,
  color,
  isDrawing,
  lines,
  setLines,
  createLine
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

export const handleMouseUp = (setIsDrawing) => {
  setIsDrawing(false);
};
