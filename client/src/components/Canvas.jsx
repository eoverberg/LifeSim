// draws simulation to screen

import { useRef, useEffect } from 'react';


    //for drawing grid
function drawLine(ctx, x1, y1, x2, y2, bColor)
{
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = .5;
  ctx.strokeStyle = bColor;
  ctx.fillStyle = bColor;
  ctx.fill();
  ctx.stroke();
};

//draws a big line that looks like a square
function drawBlock(ctx, x1, y1, bColor)
{
  ctx.beginPath();
  ctx.moveTo(x1, y1+5);
  ctx.lineTo(x1+10, y1+5);
  ctx.lineWidth = 10;
  ctx.strokeStyle = bColor;
  ctx.stroke();
};

function drawCircle(ctx, x1, y1, d1, bColor)
{
  ctx.beginPath();
  ctx.arc(x1+5, y1+5, d1/2, 0, 2*Math.PI);
  ctx.lineWidth = 1;
  ctx.strokeStyle = bColor;
  ctx.fillStyle = bColor;
  ctx.fill();
  ctx.stroke();
};
    
function Canvas({displayData, setSimEnd}) {

  const canvasRef = useRef(null); 

    //hoook for drawing on canvas
  useEffect(() => {
    //reference
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    try{
      let lines = displayData.split(',');
   
    context.canvas.width = parseFloat(lines[0]);;
    context.canvas.height = parseFloat(lines[1]);
    context.canvas.style = "border:1px solid #000000;";
    let num_plants = parseInt(lines[2]);
    let grazers_start = 6 + 3 * num_plants;
    let num_grazers = parseInt(lines[3]);
    let predators_start = grazers_start + 2 * num_grazers;
    let num_predators = parseInt(lines[4]);
    let obstacles_start = predators_start + 2 * num_predators;
    let num_obstacles = parseInt(lines[5]);
     //draw grid
    for(let i = 25; i < context.canvas.width; i+=25)
    {
      drawLine(context, i, 0, i, context.canvas.height, "black");
    }
    for(let i = 25; i < context.canvas.height; i+=25)
    {
      drawLine(context, 0, i, context.canvas.width, i, "black");
    }
      //draw plants
    for (let i = 0; i < num_plants; i++)
    {
      drawCircle(context, parseInt(lines[6 + 3*i]), parseInt(lines[7 +3*i]), parseFloat(lines[8 +3*i]),"green");
    }
    //draw grazers
    for (let i = 0; i < num_grazers; i++)
    {
      drawBlock(context, parseInt(lines[grazers_start+2*i]), parseInt(lines[grazers_start+1+2*i]),"blue");
    }
    //draw predators
    for (let i = 0; i < num_predators; i++)
    {
      drawBlock(context, parseInt(lines[predators_start+2*i]), parseInt(lines[predators_start+1+2*i]),"red");
    }
    //draw obstacles
    for (let i = 0; i < num_obstacles; i++)
    {
      drawCircle(context, parseInt(lines[obstacles_start+3*i]), parseInt(lines[obstacles_start+1+3*i]), parseFloat(lines[obstacles_start+2+3*i]),"grey");
    }
    if (num_grazers === 0 || num_plants === 0 || num_predators ===0)
    {
      setSimEnd(true);
    }
    } 
    catch(error)
    {
      alert("Cannot display due to error");
    }
  }, [displayData, setSimEnd]);

  return (<>
    <canvas ref={canvasRef} class = "bordered-component"  />
    </>
  );

};

export default Canvas;