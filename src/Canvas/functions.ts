import { RoughGenerator } from 'roughjs/bin/generator';

export const createLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  generator: RoughGenerator
) => {
  const roughLine = generator.line(x1, y1, x2, y2, { stroke: color });
  return { x1, y1, x2, y2, roughLine };
};

export const setCursorPosition = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const position = canvasRef.current?.getBoundingClientRect();
  const { clientX, clientY } = event;
  const positionX = clientX - (position?.left ?? 0);
  const positionY = clientY - (position?.top ?? 0);
  return { x: positionX, y: positionY };
};

export const chooseColor = (
  setColor: React.Dispatch<React.SetStateAction<string>>
) => {
  const colors = ['#5bc197', '#C481A2', '#85B6BF', '#B91D1D'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  setColor(randomColor);
};

export const combineLinesIntoRectangle = (
  generator: RoughGenerator,
  isDrawing: boolean,
  lines: any[],
  color: string,
  setLines: React.Dispatch<React.SetStateAction<any[]>>,
  setColor: React.Dispatch<React.SetStateAction<string>>,
  setRectangles: React.Dispatch<React.SetStateAction<any[]>>,
  chooseColor: (setColor: React.Dispatch<React.SetStateAction<string>>) => void
) => {
  if (lines.length && lines.length % 4 === 0 && isDrawing === false) {
    // Getting coordinates of all 4 lines
    let xArr: number[] = [];
    let yArr: number[] = [];

    lines?.forEach((line) => {
      xArr = xArr.concat([line.x1, line.x2]);
      yArr = yArr.concat([line.y1, line.y2]);
    });

    // Sorting arrays in reverse
    xArr = xArr.sort().reverse();
    yArr = yArr.sort().reverse();

    // Splitting arrays in halves
    const xMaxArr = xArr.slice(0, 4);
    const xMinArr = xArr.slice(4, 8);
    const yMaxArr = yArr.slice(0, 4);
    const yMinArr = yArr.slice(4, 8);

    // Getting averages for min and max values
    const reducer = (prev: number, current: number) => prev + current;
    const yMin = yMinArr.reduce(reducer) / yMinArr.length;
    const xMin = xMinArr.reduce(reducer) / xMinArr.length;
    const yMax = yMaxArr.reduce(reducer) / yMaxArr.length;
    const xMax = xMaxArr.reduce(reducer) / xMaxArr.length;

    const xLength = xMax - xMin;
    const yLength = yMax - yMin;

    // Generating a new rectangle & clearing lines
    const rectangle = generator.rectangle(xMin, yMin, xLength, yLength, {
      stroke: color,
    });
    setRectangles((prevState) => [...prevState, rectangle]);
    setLines([]);

    // Randomly choosing color for next rectangle
    chooseColor(setColor);
  }
};
