
 function isColliding(entity1, entity2) {
    const dx = entity1.xPos - entity2.xPos;
    const dy = entity1.yPos - entity2.yPos;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (entity1.size * entity2.size);
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


module.exports = {isColliding, checkLOS, findPredator, findClosest};
