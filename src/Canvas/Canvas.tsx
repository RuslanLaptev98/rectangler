import React from 'react';
import './Canvas.css';
import rough from 'roughjs/bundled/rough.esm';
import {
  chooseColor,
  createLine,
  combineLinesIntoRectangle,
} from './functions';
import {
  handleMouseUp,
  handleMouseDown,
  handleMouseMove,
} from './drawingEventHandlers';

const Canvas: React.FC = () => {
  const generator = rough.generator();

  const canvasRef = React.useRef(null);

  const [rectangles, setRectangles] = React.useState([]);
  const [lines, setLines] = React.useState([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState('#5bc197');

  React.useEffect(() => {
    // Setting canvas and context
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    // Drawing lines
    lines.forEach((line) => roughCanvas.draw(line.roughLine));

    // Combining 4 lines into rectangle
    combineLinesIntoRectangle(
      generator,
      isDrawing,
      lines,
      color,
      setLines,
      setColor,
      setRectangles,
      chooseColor
    );
  }, [lines, isDrawing]);

  React.useEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    rectangles.forEach((rectangle) => roughCanvas.draw(rectangle));
  });

  return (
    <div className='Canvas'>
      <canvas
        id='canvas'
        ref={canvasRef}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
        onMouseDown={(event) =>
          handleMouseDown(
            event,
            generator,
            canvasRef,
            color,
            setIsDrawing,
            setLines,
            createLine
          )
        }
        onMouseMove={(event) =>
          handleMouseMove(
            event,
            generator,
            canvasRef,
            color,
            isDrawing,
            lines,
            setLines,
            createLine
          )
        }
        onMouseUp={() => handleMouseUp(setIsDrawing)}
      ></canvas>
    </div>
  );
};

export default Canvas;
