 function seek(entityVector, targetVector, speed) {
    //let targetVector = [target.x, target.y];
    //let entityVector = [entity.x, entity.y];
    // Calculate the desired velocity as a vector pointing from the entity to the target.
    let desiredVelocity = subtractVectors(targetVector, entityVector);
    
    // Normalize the desired velocity to get it in the direction of the target only.
    desiredVelocity = normalize(desiredVelocity);
    
    // Multiply the normalized vector by the entity's maximum speed to get the maximum desired velocity.
    desiredVelocity = multiplyVector(desiredVelocity, speed);
    
    // Calculate the steering force as the difference between the desired velocity and the entity's current velocity.
    //let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
    let steeringForce = desiredVelocity;
    // Change the energy for each time it seeks

    // Return the steering force which will adjust the entity's velocity in the next update.
    return steeringForce;
}

 function flee(entityVector, target, speed) {
    // Calculate the vector from the entity to the target
    //let entityVector = [entity.x, entity.y];
    let desiredVelocity = subtractVectors(entityVector, target);
    
    desiredVelocity = normalize(desiredVelocity); // Normalize to get the direction
    
    desiredVelocity = multiplyVector(desiredVelocity, speed); // Scale to maximum speed
    let steeringForce = desiredVelocity;
    // The steering force is the difference between desired velocity and current velocity
    //let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
    // Change the energy for each time it flees
    //entity.energy = entity.energy - 5;
    // Return the computed steering force to adjust the entity's velocity away from the target
    return steeringForce;
}

 function wander(entity, speed) {
    // Parameters for wander behavior
    let wanderRadius = 10; // Radius of the wander circle
    let wanderDistance = 15; // Distance the wander circle is in front of the entity
    let wanderJitter = 1; // How much the target point can change each tick

    // Initialize entity.target to the entity's current position if it doesn't exist
    // Creates a shallow copy of entity.position & assigns to entity.target so target won't affect position
    //entity.target = entity.target || [...entity.position]; 
    let entityVector = [entity.x, entity.y];
    let target = [entity.x,entity.y]
    // Add a small random vector to the target's position
    let randomDisplacement = [
    target[0] += Math.random() * wanderJitter - wanderJitter * 0.5,
    target[1] += Math.random() * wanderJitter - wanderJitter * 0.5
    ];
    randomDisplacement = normalize(randomDisplacement);
    randomDisplacement = multiplyVector(randomDisplacement, wanderRadius);

    // Calculate the forward vector based on the entity's orientation
    let oVector = [Math.sin(entity.orientation/360),Math.cos(entity.orientation/360)]
    let forwardVector = multiplyVector(oVector, wanderDistance);
    // Combine the forward vector and random displacement to get the target in local space
    let targetLocal = addVectors(forwardVector, randomDisplacement);

    // Convert the local target to world space using the entity's current position
    target = addVectors(entityVector, targetLocal);
    // Seek towards the target
    return seek([entity.x,entity.y], target, speed);
}

 function directMovement(entity, direction) {
    // Assuming 'direction' is a normalized vector representing the desired direction of movement
    let desiredVelocity = multiplyVector(direction, entity.maxSpeed);

    // Update entity's velocity directly towards the desired direction
    entity.velocity = desiredVelocity;

    // Calculate the steering force required to align the entity's current velocity with the desired velocity
    let steeringForce = subtractVectors(desiredVelocity, entity.velocity);

    // Change the energy for each time it seeks
    entity.energy = entity.energy - 5;
    return steeringForce;
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

// Converts local space coordinates to world space based on position and orientation.
 function localToWorld(position, orientation, localPoint) {
    // Assuming orientation is in radians and points are [x, y]
    let cosTheta = Math.cos(orientation); // Cosine of the orientation angle.
    let sinTheta = Math.sin(orientation); // Sine of the orientation angle.

    // Calculate the world coordinates by rotating and then translating the local point.
    let worldX = cosTheta * localPoint[0] - sinTheta * localPoint[1] + position[0];
    let worldY = sinTheta * localPoint[0] + cosTheta * localPoint[1] + position[1];

    return [worldX, worldY]; // Return the transformed coordinates.
}

module.exports = {seek, flee, wander};



// #define _USE_MATH_DEFINES
// #include <iostream>
// #include <fstream>
// #include <cmath>
// #include <vector>
// #include <algorithm>
// #include <limits>

// using namespace std;


// //class that assists in vector operations
// //overloads operators, double check if involved in math.
// class MVector
// {
// public:
//     //Vector with two double
//     //double used over float to match given data
//     double x;
//     double z;

//     //initialize fields to 0
//     MVector()
//     {
//         x = 0.0;
//         z = 0.0;
//     }

//     //user initialized fields
//     MVector(double inputX, double inputZ)
//     {
//         x = inputX;
//         z = inputZ;
//     }

// 	//change coordinates
//     void setVector(double inputX, double inputZ)
//     {
//         x = inputX;
//         z = inputZ;
//     }

//     //sets vector to one unit of length but keeps direction
//     //no current use for original vector but could keep original and return result
//     void normalize()
//     {
//         double mag = magnitude();
//         x = x / mag;
//         z = z / mag;
//     }

//     //returns the length of vector from (0,0)
//     double magnitude()
//     {
//         return sqrt((x * x) + (z * z));
//     }

//     //returns the length of vector from input origin
//     double distanceTo(MVector origin)
//     {
//         return sqrt(pow((x - origin.x),2) + pow((z - origin.z), 2));
//     }

//     //finds the closest point of this vector to a given line segment
//     //line segment ends are defined by the parameters
//     //returns a vector of the position
//     MVector closestPoint(MVector A, MVector B) 
//     {
//         double T = ((*this - A)*(B - A)) / ((B - A) * (B - A));
//         if (T >= 1.0)
//             return B;
//         else if (T <= 0.0)
//             return A;
//         else
//             return (A + ((B - A) * T));
//     }

//     //scalar multiplication
//     MVector operator*(double scalar)
//     {
//         MVector mVect;
//         mVect.x = x * scalar;
//         mVect.z = z * scalar;
//         return mVect;
//     }

//     //dot product 
//     double operator*(MVector dot)
//     {
//         MVector mVect;
//         mVect.x = x * dot.x;
//         mVect.z = z * dot.z;
//         return  (mVect.x + mVect.z);
//     }


//     //subtracts both fields from relative fields of another vector
//     MVector operator-(MVector diff)
//     {
//         MVector mVect;
//         mVect.x = x - diff.x;
//         mVect.z = z - diff.z;
//         return mVect;
//     }

//     //add both fields with relative fields of another vector
//     MVector operator+(MVector diff)
//     {
//         MVector mVect;
//         mVect.x = x + diff.x;
//         mVect.z = z + diff.z;
//         return mVect;
//     }

   

// };

// //data structure to hold steering output data
// struct steeringOutput {
//     MVector linear;
//     double angular = 0.0;
// };

// //class to hold and update character data
// class Character
// {
// public:
//     int characterID;   // used to keep track of character for plotting, could be used for targeting
//     MVector position;  // tracks location of character 
//     MVector velocity;  // distance and direction character will travel in one time unit
//     MVector linearAcceleration; // distance and direction the velocity will change
//     double maxVelocity;  //maximum distance the character can travel in one time unit
//     double maxAcceleration; //maximum amount the velocity can change
//     int behavior;        //enum of behaviors used for steering output and behavior
//     double pathOffSet;  //used in path following

//     //included for future use, not currently used
//     bool collision;     //track collisions, currently always set to false.
//     double angularAcceleration; // radians the characters rotation will change
//     double orientation;  //radians the character is facing
//     double rotation;     //radians the character will change in one time unit
    

//     Character(int charID, MVector pos, MVector vel, double orient, int behav, double maxVel, double maxAcc, double pathoffset) {
//         characterID = charID;
//         position = pos;
//         velocity = vel;
//         linearAcceleration = MVector(0.0, 0.0);
//         orientation = orient;
//         behavior = behav;
//         maxVelocity = maxVel;
//         maxAcceleration = maxAcc;
//         collision = false;
//         angularAcceleration = 0.0;
//         rotation = 0.0;
//         pathOffSet = pathoffset;
//     }
    
//     //target character with defualt values
//     Character(int charID, MVector pos) {
//         characterID = charID;
//         position = pos;
//         velocity = MVector();
//         linearAcceleration = MVector();
//         maxVelocity = 0.0;
//         maxAcceleration = 0.0;
//         collision = false;
//         angularAcceleration = 0.0;
//         orientation = 0.0;
//         behavior = 1;
//         rotation = 0.0;
//         pathOffSet = 0.0;
//     }

//     //updates character data from steering output and delta time 
//     void update(steeringOutput steering, double time) {

//         position = position + velocity * time;       //updates with previous velocity
//         orientation = orientation + rotation * time; //updates with previous rotation

//         velocity = velocity + steering.linear * time; // updates velocity with incoming steering parameter
//         rotation = rotation + steering.angular * time;// updates rotation with incoming steering parameter        
//         linearAcceleration = steering.linear;         // used to track incoming steering parameter
//         if (velocity.magnitude() < (.02)) //stops character at small speeds
//         {
//             velocity = velocity * 0.0;
//         }

//         if (velocity.magnitude() > maxVelocity)//ensures character doesn't exceed limit
//         {
//             velocity.normalize(); //set travel distance to one, keeps direction
//             velocity = velocity * maxVelocity;//set travel distance to max
//         }
//     }
// };

// // Creates path and finds position along the path.
// // Parameter is defined as the percentage along the path or segment. 
// // class terminology
// // "vectors" are dynamic arrays and referred to as arrays
// // "MVectors" are used as 2D math vectors and referred to as positions/points.
// class Path {
// public:
    
//     int pathID;        // name of path(currently not used)
//     int segments;      // number of line segments along the path
//     vector<int> pathX; // x coordinates of each point along the path
//     vector<int> pathY; // y coordinates of each point along the path
//     vector<double> distance; // Length of each line segment
//     vector<double> param; // Parameter of each line segment

    
//     Path(int ID, vector<int>& pathx, vector<int>& pathy){
//         pathID = ID;
//         pathX = pathx;  
//         pathY = pathy; 
//         segments = pathX.size() - 1; 
//         distance.resize(segments+1, 0); // initilaizes to 0 with correct number of elements
//         param.resize(segments+1, 0.0); // initilaizes to 0.0 with correct number of elements
//         assemble();
//     }
    
//     // initializes distance and parameter arrays.
//     void assemble()
// 	{
//         // current distance of path = last distance + distance of current line segment 
//         for (int i = 1; i <= segments; i++)
//             distance[i] = distance[i-1] + MVector(pathX[i-1], pathY[i-1]).distanceTo(MVector(pathX[i], pathY[i]));
        
//         // maximum distance should be last element.
//         double maxD = *max_element(distance.begin(), (distance.end())); // algorithm.max_element{returns pointer} 

//         for (int i = 0; i <= segments; i++)
//             param[i] = distance[i] / maxD; // current distance over maximum distance.
//     }
    
//     // returns position of targets point on path
//     MVector getPosition(double targetParam)
// 	{
//         int currLineIndex = 0; // Index of line in arrays
        
//         // finds beginning point of Line the target is on. 
//         for (int i = 0; i < segments; i++)
//             if (targetParam > param[i] && param[i] > param[currLineIndex])
//                 currLineIndex = i;
            
//         // beginning and end of the segment the target is on
//         MVector A (pathX[currLineIndex], pathY[currLineIndex]);
//         MVector B (pathX[currLineIndex+1], pathY[currLineIndex+1]);
        
//         // converts the input parameter to a parameter on segment then to a point
//         double T = (targetParam - param[currLineIndex])/(param[currLineIndex+1] - param[currLineIndex]);
// 		MVector P = A + ((B - A) * T);
//         return P;
//     }
    
//     //returns parameter of characters closest point on path
//     double getParameter(MVector position)
// 	{
//         MVector A (pathX[0], pathY[0]); // start point of line segment
//         MVector B (pathX[0], pathY[0]); // end point of line segment
//         MVector closestPoint;           // closest point of character to line segment
//         int closestSegment = 0;         // index of the start point of line segment 

//         double closestDistance = position.distanceTo(A) + distance[segments]; //largest distance possible from path
        
//         for (int i = 0; i < segments; i++)
//         {
//             // sets vectors of line segment
//             A.setVector(pathX[i], pathY[i]);
//             B.setVector(pathX[i+1], pathY[i+1]);

//             MVector checkPoint = position.closestPoint(A, B);       // find closest point on line segment
//             double checkDistance = position.distanceTo(checkPoint); // uses closest point to find distance to beginning of segment
//             // saves information if distance is smaller than previously saved distance 
//             if (checkDistance < closestDistance)
//             {
//                 closestPoint = checkPoint;
//                 closestDistance = checkDistance;
//                 closestSegment = i;
//             }
//         }

//         //sets line segment to closest line segment
//         A.setVector(pathX[closestSegment], pathY[closestSegment]);
//         B.setVector(pathX[closestSegment + 1], pathY[closestSegment + 1]);
//         double paramA = param[closestSegment];
//         double paramB = param[closestSegment+1];
        
//         //sets point on line segment closest to player position
//         MVector C = closestPoint;
        
//         //finds parameter of point closest on line
//         double T = C.distanceTo(A) / B.distanceTo(A);
//         double paramC = paramA + (T * (paramB - paramA));
//         return paramC;
//     }
    
// };

// steeringOutput getSteeringContinue(Character mover);
// steeringOutput getSteeringSeek(Character mover, Character target);
// steeringOutput getSteeringFollowPath(Character mover, Path path);
// steeringOutput getSteeringFlee(Character mover, Character target);
// steeringOutput getSteeringArrive(Character mover, Character target);

// int main()
// {
//     cout << "check" << endl;
    
//     //initializes characters in array 
//     Character characters[] = {
//         //(ID, Position, Velocity, Orientation, Behavior, MaxVelocity, MaxAcceleration, offset)
//         Character(2701, MVector(20.0, 95.0), MVector(0.0, 0.0), 0.0, 11, 4.0, 2.0, 0.04) 
//     };

//     //initializes path to follow
//     vector<int> pathX = {  0, -20, 20, -40,  40, -60,  60,   0 };
//     vector<int> pathY = { 90,  65, 40,  15, -10, -35, -60, -85 };
//     Path path(1, pathX, pathY);
    
//     float simTime = 0.0f;      // simulation time counter 
//     float simDuration = 125.0f;// desired duration
//     steeringOutput steering;   // steering object to use in loop

//     //opens file to store data
//     ofstream myfile;

//     //myfile.open("/Volumes/NO NAME/AI/pathExample.txt");
// 	myfile.open("F:\\AI\\program2\\pathExample.txt");
	
//     myfile.precision(15);  //sets precision to 15 digits to match provided data
//     myfile << boolalpha;   //sets boolean to output true/false to match provided data

//     //writes initial character data to file
//     for (Character& current : characters)
//     {
//         myfile << simTime << ", "
//             << current.characterID << ", "
//             << current.position.x << ", "
//             << current.position.z << ", "
//             << current.velocity.x << ", "
//             << current.velocity.z << ", "
//             << current.linearAcceleration.x << ", "
//             << current.linearAcceleration.z << ", "
//             << current.orientation << ", "
//             << current.behavior << ", "
//             << current.collision << endl;
//     }

//     while (simTime < simDuration) //until desired time
//     {
//         simTime += .5; //iterates time counter by step

//         for (Character& current : characters) //iterates character loops 
//         {
//             //selects steering output based on behavior field
//             switch (current.behavior)
//             {
//             case 1: //Continue behavior
//                 steering = getSteeringContinue(current);
//                 break;
//             case 6: //Seek behavior
//                 steering = getSteeringSeek(current, characters[0]);
//                 break;
//             case 7: //Flee behavior
//                 steering = getSteeringFlee(current, characters[0]);
//                 break;
//             case 8: //Arrive behavior
//                 steering = getSteeringArrive(current, characters[0]);
//                 break;
//             case 11: //Path Follow behavior
//                 steering = getSteeringFollowPath(current, path);
//                 break;
//             default://if in doubt, go all out
//                 steering = getSteeringContinue(current);
//             }
            
//             current.update(steering, .5); //updates characters with steering output

//             //writes current character data to file
//             myfile << simTime << ", "
//                 << current.characterID << ", "
//                 << current.position.x << ", "
//                 << current.position.z << ", "
//                 << current.velocity.x << ", "
//                 << current.velocity.z << ", "
//                 << current.linearAcceleration.x << ", "
//                 << current.linearAcceleration.z << ", "
//                 << current.orientation << ", "
//                 << current.behavior << ", "
//                 << current.collision << endl;
//         }
//     }
//     myfile.close(); //all data is written, close file
//     return 0;
// }

// //returns same speed and direction of mover.
// steeringOutput getSteeringContinue(Character mover)
// {
//     steeringOutput result { mover.linearAcceleration, mover.angularAcceleration };
//     return result;
// }

// //Calculates the velocity of the mover character to head torwards target
// //finds distance and direction to target, sets speed based on movers limitations
// steeringOutput getSteeringSeek(Character mover, Character target)
// {
//     steeringOutput result;
//     MVector acceleration;
//     acceleration = target.position - mover.position; // finds distance and direction to target
//     acceleration.normalize(); // set travel distance to one, keeps direction

//     result.linear = acceleration * mover.maxAcceleration; // set travel distance to max
//     result.angular = 0.0; // not changing orientation
//     return result;
// }

// //Calculates target along given path
// //uses seek to find steering parameters.
// steeringOutput getSteeringFollowPath(Character mover, Path path){
   
//     double currentParam = path.getParameter(mover.position); // get path parameter closest to mover
//     double targetParam = currentParam + mover.pathOffSet; // creates target parameter with offset 
//     MVector targetPosition = path.getPosition(targetParam); // gets position from parameter
//     Character target(1111, targetPosition); // creates target character for steering output functions
//     return(getSteeringSeek(mover, target));  //returns seek steering output 
// }


// //Calculates the velocity of the mover character to head away from target
// //finds distance and direction to target, sets speed based on movers limitations
// steeringOutput getSteeringFlee(Character mover, Character target)
// {
//     steeringOutput result;
//     MVector acceleration;
//     acceleration = mover.position - target.position;//finds distance and direction to target
//     acceleration.normalize();//set travel distance to one, keeps direction

//     result.linear = acceleration * mover.maxAcceleration;//set travel distance to max
//     result.angular = 0.0; //not changing orientation 
//     return result;
// }

// //Calculates the velocity of the mover character to head torward target and stop
// //finds distance and direction to target, sets speed based on distance from target
// steeringOutput getSteeringArrive(Character mover, Character target)
// {
//     float arrivalRadius = 4.0; // distance to slam on brakes
//     float slowRadius = 32.0;   // distance to start slowing down
//     float timeToTarget = 1.0;  // iterations to get to desiredVelocity
//     double distance = 0.0;
//     double desiredSpeed;      // speed based on target closeness
//     MVector  desiredVelocity; // velocity/acceleration based on speed
//     steeringOutput result;

//     desiredVelocity = target.position - mover.position;//find difference in positions
//     distance = desiredVelocity.magnitude();//find distant to target

//     if (distance < arrivalRadius)     //close to target set speed to stop,
//         desiredSpeed = 0.0;           //acceleration should oppose current velocity at end
//     else if (distance > slowRadius)   //far away, set speed limit to maximum
//         desiredSpeed = mover.maxVelocity;
//     else                              //slow radius set speed limit based on distance from target.
//         desiredSpeed = mover.maxVelocity * distance / slowRadius;

//     desiredVelocity.normalize();                      //set travel distance to one, keeps direction
//     desiredVelocity = desiredVelocity * desiredSpeed; //set wanted velocity to speed limit

//     desiredVelocity = desiredVelocity - mover.velocity;      //find difference with current velocity
//     desiredVelocity = desiredVelocity * (1 / timeToTarget);  //calculate acceleration needed 

//     if (desiredVelocity.magnitude() > mover.maxAcceleration) // if acceleration exceeds limit
//     {
//         desiredVelocity.normalize();             //set travel distance to one, keeps direction
//         desiredVelocity = desiredVelocity * mover.maxAcceleration;//set travel distance to max
//     }
//     result.linear = desiredVelocity; //set linear acceleration to found acceleration
//     result.angular = 0.0;            //not changing orientation 
//     return result;
// }