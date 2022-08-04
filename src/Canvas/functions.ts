export const createLine = (x1, y1, x2, y2, color, generator) => {
  const roughLine = generator.line(x1, y1, x2, y2, { stroke: color });
  return { x1, y1, x2, y2, roughLine };
};

export const setCursorPosition = (event, canvasRef) => {
  const position = canvasRef.current.getBoundingClientRect();
  const { clientX, clientY } = event;
  const positionX = clientX - position.left;
  const positionY = clientY - position.top;
  return { x: positionX, y: positionY };
};

export const chooseColor = (setColor) => {
  const colors = ['#5bc197', '#C481A2', '#85B6BF', '#B91D1D'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  setColor(randomColor);
};

export const combineLinesIntoRectangle = (
  generator,
  isDrawing,
  lines,
  color,
  setLines,
  setColor,
  setRectangles,
  chooseColor
) => {
  if (lines.length && lines.length % 4 === 0 && isDrawing === false) {
    // Getting coordinates of all 4 lines
    let xArr = [];
    let yArr = [];
    lines &&
      lines.forEach((line) => {
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
    const reducer = (prev, current) => prev + current;
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
