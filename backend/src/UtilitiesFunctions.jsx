
 function isColliding(entity1, entity2) {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (entity1.size + entity2.size);
}

function distanceTo(position1,position2) {
    return Math.sqrt((position1[0] - position2[0]) ** 2 + (position1[1] - position2[1]) ** 2);
}

// parameters: 
    //      source (x,y) 
    //      difference in source and target(x,y)
    //      distance betweeen source and target
    //      list of entities that could block LOS
    // returns true if an obstacle is between target and source
function checkPath(source,target,obstacles)
{
    // check if any obstacles
    if (obstacles.length === 0)
    {
        return target;
    }
    let sX = source[0];
    let sY = source[1];
    let coords= [target[0], target[1]]
    let xDiff = target[0] - sX;
    let yDiff = target[1] - sY;
    let distance = (xDiff)**2 + (yDiff)**2;
    // iterate through obstacles and check if it is blocking path
    for(let obstacle of obstacles) 
    {
        // find closest point on path to obstacle     
        let position = ((obstacle.x-sX)*(xDiff)+(obstacle.y-sY)*(yDiff))/distance;
        // if 0 or 1 obstacle is closest to target or source and not blocking los
        console.log("position: "+position);
        if (position < 1 && position > 0)
        {
            // find closest (x,y) on line to obstacle  
            let lineX = sX+(position*(xDiff));
            let lineY = sY+(position*(yDiff));
            // find distance from obstacle to line
            let xDiff2 = lineX-obstacle.x;
            let yDiff2 = lineY-obstacle.y;
            let disToLine =(xDiff2)**2+(yDiff2)**2;
            // if distance is less than obstacle radius, it is blocking path 
            console.log("distance to line: " + disToLine);
    
            if (disToLine <= obstacle.z)
            {
                //if point is on line, take recipical of original slope for 90  
                if (disToLine === 0)
                {
                    xDiff2 = -yDiff;
                    yDiff2 = xDiff;
                }
                //normalize distance line then multiply by .z
                //use diff2 for direction if not on line
                //change path to beside obstactle
                let normDL = normalize([xDiff2, yDiff2]);
                console.log("normDL: " + normDL);
                let edgeDist = multiplyVector(normDL,obstacle.z);
                console.log("edgeDist: " + edgeDist);

                let obsEdge = [obstacle.x+edgeDist[0]  , obstacle.y +edgeDist[1] ]
                if (distanceTo(source, coords) > distanceTo(source, obsEdge))
                {
                    coords = obsEdge
                }
            
            }        
        }
    }
    return coords
}

// parameters: 
    //      source (x,y) 
    //      difference in source and target(x,y)
    //      distance betweeen source and target
    //      list of entities that could block LOS
    // returns true if an obstacle is between target and source
  function checkLOS(sX,sY,xDiff,yDiff,distance,obstacles)
    {
        // flag if LOS is blocked
        let blocked = false;
        // iterate through obstacles and check if it is blocking LOS
        for(let obstacle of obstacles) 
        {
        // find closest point on line of sight to obstacle     
        let position = ((obstacle.x-sX)*(xDiff)+(obstacle.y-sY)*(yDiff))/distance;
        // if 0 or 1 obstacle is closest to target or source and not blocking los
        if (position < 1 && position > 0)
        {
            // find closest (x,y) on line to obstacle  
            let lineX = sX+(position*(xDiff));
            let lineY = sY+(position*(yDiff));
            // find distance from obstacle to line
            let distoLine =(obstacle.x-lineX)**2+(obstacle.y-lineY)**2;
            // if distance is less than obstacle radius, it is blocking line of sight 
            if (distoLine <= obstacle.z)
            {
                blocked = true;
            }        
        }
        // if any obstacle is blocking LOS, exit for loop
        if(blocked)
            {
                break;
            }
        } // for loop 
        return blocked;
    }

   //returns summation of predators
   function findPredator(sX,sY,distance,ent2Find, obstructions)
   {
       // distance squared so square root is never needed
       let discheck = (distance)**2;
       let targetX = 0;
       let targetY = 0;
       let sumX = 0;
       let sumY = 0;
       // loop through list of predators, list should never change
       for(let pred of ent2Find)
       {
           // (x,y) difference is used a lot in checkLOS
           let xDiff = pred.x-sX;
           let yDiff = pred.y-sY;
           // check if predator is within LOS
           let distance2 = (xDiff)**2 + (yDiff)**2;
           if (distance2 < discheck && distance2 !== 0)
           {
               if(this.checkLOS(sX,sY,xDiff,yDiff,distance2,obstructions))
               {
                   continue; // next predator if blocking
               }
               sumX += xDiff;
               sumY += yDiff;
               targetX = sumX + sX;
               targetY = sumY + sY;
           }
       }
       return [targetX, targetY];
   }

   // source(x,y)
   // list of possible targets
   // list of possible obstacle blocking LOS
   // distance to check
   // returns closest entity in entities list
  function findClosest(sX, sY, entities, obstructions, distance, smellDistance)
   {
       let target;
       // closest distance to source, starts at LOS
       let discheck = (distance)**2;
       for(let ent of entities)
       {
           let xDiff = ent.x-sX;
           let yDiff = ent.y-sY;
           let distance2 = (xDiff)**2 + (yDiff)**2;
           // check if closest
           
           if (distance2 < discheck && distance2 !== 0)
           {   
               // ent is closest then change distance to check and return (x,y) to ent
               if((distance2<smellDistance) || !this.checkLOS(sX,sY,xDiff,yDiff,distance2,obstructions)) 
               {
                   discheck = distance2;
                   target = ent;
               }
           }
       }
       return target;   
   }
// Subtracts one vector from another and returns the resulting vector.
function subtractVectors(vector1, vector2) {
    return [vector1[0] - vector2[0], vector1[1] - vector2[1]];
}

// Normalizes a vector to a unit vector (length of 1), maintaining its direction.
 function normalize(vector) {
    const length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2); // Calculate the vector's length.
    if (length === 0) return [0, 0]; // Handle the zero-length case to avoid division by zero.
    return [vector[0] / length, vector[1] / length]; // Scale the vector components to normalize it.
}

// Multiplies a vector by a scalar and returns the resulting scaled vector.
 function multiplyVector(vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar]; // Scale both components of the vector.
}

// Adds two vectors together and returns the resulting vector.
 function addVectors(vector1, vector2) {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1]]; // Add corresponding components.
}


module.exports = {isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo};
