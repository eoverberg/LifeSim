//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React, { useRef, useEffect } from 'react';
//import raw from './assets/LifeSimulation02.xml';
//mport raw from './assets/usefile.xml';
// class Map 
// {
//       constructor()
//       {
//             this.map_height = 0.0;
//             this.map_width = 0.0;   
//             this.initial_plants = 0;   
//             this.initial_predators = 0;
//             this.initial_grazers = 0;
//             this.initial_obstacles = 0;
//       }
//       get width() { return this.map_width; }
//       set width(num) { this.map_width = num; }
//       get height() { return this.map_height; }
//       set height(num) { this.map_height = num; } 
//       get num_plants() { return this.initial_plants }
//       set num_plants(num) { this.initial_plants = num }
//       get num_grazers() { return this.initial_grazers }
//       set num_grazers(num) { this.initial_grazers = num }
//       get num_predators() { return this.initial_predators }
//       set num_predators(num) { this.initial_predators = num }
//       get num_obstacles() { return this.initial_obstacles }
//       set num_obstacles(num) { this.initial_obstacles = num }
// }

// class Grazer
// {
//       constructor()
//       {
//             this.x = 0;
//             this.y = 0;
//       }
//       set x_coord(num) { this.x = num; }
//       get x_coord() { return this.x; }
//       get y_coord() { return this.y; }
//       set y_coord(num) { this.y = num; }
// }

// class Obstacle
// {
//       constructor()
//       {
//             this.x = 0;
//             this.y = 0;
//             this.diameter = 0.0;
//       }
//       set x_coord(num) { this.x = num; }
//       get x_coord() { return this.x; }
//       get y_coord() { return this.y; }
//       set y_coord(num) { this.y = num; }
//       get diam() { return this.diameter; }
//       set diam(num) { this.diameter = num; }
// }

// class Plant
// {
//       constructor()
//       {
//             this.x = 0;
//             this.y = 0;
//             this.diameter = 0.0;
//       }
//       set x_coord(num) { this.x = num; }
//       get x_coord() { return this.x; }
//       get y_coord() { return this.y; }
//       set y_coord(num) { this.y = num; }
//       get diam() { return this.diameter; }
//       set diam(num) { this.diameter = num; }
// }

// class Predator
// {
//       constructor()
//       {
//             this.x = 0;
//             this.y = 0;
//       }
//       set x_coord(num) { this.x = num; }
//       get x_coord() { return this.x; }
//       get y_coord() { return this.y; }
//       set y_coord(num) { this.y = num; }
// }

// const map1 = new Map();
// let plants = [];
// let predators = [];
// let grazers = [];
// let obstacles = [];

// fetch(raw)
// .then(r=>r.text())
// .then(text=>{
//       let lines =  text.split('\n');
//       map1.width = parseFloat(lines[3]);
//       map1.height = parseFloat(lines[6]);
//       map1.num_plants = parseInt(lines[11]);

//       for (let i = 0; i < (map1.num_plants); i += 1)
//       {
//             const temp = new Plant();
//             temp.x_coord = parseInt(lines[30+11*i]);
//             temp.y_coord = parseInt(lines[33+11*i]);
//             temp.diam = parseFloat(lines[36+11*i]);
//             plants.push(temp);
//       }

//       let grazers_start = 29 + 11 * map1.num_plants;
//       let grazers_end = grazers_start + 18;
//       map1.num_grazers = parseInt(lines[grazers_start + 2]);
                  
//       for (let i = 0; i < (map1.num_grazers); i += 1)
//       {
//             const temp = new Grazer();
//             temp.x_coord = parseInt(lines[grazers_end+3+11*i]);
//             temp.y_coord = parseInt(lines[grazers_end+6+11*i]);
//             grazers.push(temp);
//       }

//       let predators_start = grazers_end + 2 + 11 * map1.num_grazers;
//       let predators_end = predators_start + 30;
//       map1.num_predators = parseInt(lines[predators_start + 2]);
                  
//       for (let i = 0; i < (map1.num_predators); i += 1)
//       {
//             const temp = new Predator();
//             temp.x_coord = parseInt(lines[predators_end+3+14*i]);
//             temp.y_coord = parseInt(lines[predators_end+6+14*i]);
//             predators.push(temp);
//       }

//       let obstacles_start = predators_end + 2 + 14 * map1.num_predators;
//       let obstacles_end = obstacles_start + 3;
//       map1.num_obstacles = parseInt(lines[obstacles_start + 2]);
       
//       for (let i = 0; i < (map1.num_obstacles); i += 1)
//       {
//             const temp = new Obstacle();
//             temp.x_coord = parseInt(lines[obstacles_end+3+14*i]);
//             temp.y_coord = parseInt(lines[obstacles_end+6+14*i]);
//             temp.diam = parseFloat(lines[obstacles_end+9+14*i]);
//             obstacles.push(temp);
//       }
// });

let urlName = window.location.pathname;
if (urlName === '/')
{
  urlName = '/test';
}
//imports picture
const raw = require(`./assets${urlName}.xml`);

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

//component for canvas
const Canvas = props => {
    const canvasRef = useRef(null)    


    //hoook for drawing on canvas
    useEffect(() => {
      //reference
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      //getting the text from the folder
      fetch(raw)
      .then(r=>r.text())
      .then(text=>{
        //split on line then 
        let lines =  text.split('\n');
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
          drawLine(context, 0, i, context.canvas.width, i, "#000000");
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
    
    });
    }, []);
    
    return (<>
    <canvas ref={canvasRef} {...props}/>
    </>);
  
  };
  

  export default Canvas;



    // couldn't import classes/objects with file info already parsed
    //
    //   for (let i = 0; i < map1.num_obstacles; i++)
    //   {
    //     drawCircle(context, obstacles[i].x_coord, obstacles[i].y_coord, obstacles[i].diam,"grey");
    //   }
    //   for (let i = 0; i < map1.num_grazers; i++)
    //   {
    //     drawBlock(context, grazers[i].x_coord, grazers[i].y_coord,"blue");
    //  }
    //  for (let i = 0; i < map1.num_predators; i++)
    //   {
    //     drawBlock(context, predators[i].x_coord, predators[i].y_coord,"red");
    //  }