function seek(entityVector, targetVector, speed) {
    //let targetVector = [target.x, target.y];
    //let entityVector = [entity.x, entity.y];
    // Calculate the desired velocity as a vector pointing from the entity to the target.
    let desiredVelocity = subtractVectors(targetVector, entityVector);

    // Normalize the desired velocity to get it in the direction of the target only.
    desiredVelocity = normalize(desiredVelocity);

    // Multiply the normalized vector by the entity's maximum speed to get the maximum desired velocity.
    if (Math.abs(distance(entityVector, targetVector)) < speed) { // Clip speed if going to overshoot
        speed = Math.abs(distance(entityVector, targetVector));
    }
    if (Math.abs(distance(entityVector, targetVector)) <= 5) { // Clip speed if going to overshoot
        speed = 0;
    }
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
    let target = [entity.x, entity.y]
    // Add a small random vector to the target's position
    let randomDisplacement = [
        target[0] += Math.random() * wanderJitter - wanderJitter * 0.5,
        target[1] += Math.random() * wanderJitter - wanderJitter * 0.5
    ];
    randomDisplacement = normalize(randomDisplacement);
    randomDisplacement = multiplyVector(randomDisplacement, wanderRadius);

    // Calculate the forward vector based on the entity's orientation
    let oVector = [Math.sin(entity.orientation / 360), Math.cos(entity.orientation / 360)]
    let forwardVector = multiplyVector(oVector, wanderDistance);
    // Combine the forward vector and random displacement to get the target in local space
    let targetLocal = addVectors(forwardVector, randomDisplacement);

    // Convert the local target to world space using the entity's current position
    target = addVectors(entityVector, targetLocal);
    // Seek towards the target
    return seek([entity.x, entity.y], target, speed);
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

function distance(position1, position2) {
    return Math.sqrt((position1[0] - position2[0]) ** 2 + (position1[1] - position2[1]) ** 2);
}

module.exports = { seek, flee, wander };


