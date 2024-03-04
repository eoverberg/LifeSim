function seek(character, target) {
    let desiredVelocity = subtractVectors(target.position, character.position);
    desiredVelocity = normalize(desiredVelocity);
    desiredVelocity = multiplyVector(desiredVelocity, character.maxSpeed);
    
    let steeringForce = subtractVectors(desiredVelocity, character.velocity);
    return steeringForce;
}

function flee(character, target) {
    // Calculate the vector from the character to the target
    let desiredVelocity = subtractVectors(character.position, target.position);
    desiredVelocity = normalize(desiredVelocity); // Normalize to get the direction
    desiredVelocity = multiplyVector(desiredVelocity, character.maxSpeed); // Scale to maximum speed
    
    // The steering force is the difference between desired velocity and current velocity
    let steeringForce = subtractVectors(desiredVelocity, character.velocity);
    return steeringForce;
}

function wander(character) {
    // Parameters for wander behavior
    let wanderRadius = 10; // Radius of the wander circle
    let wanderDistance = 15; // Distance the wander circle is in front of the character
    let wanderJitter = 1; // How much the target point can change each tick

    // Ensure character has a wanderTarget property
    character.wanderTarget = character.wanderTarget || [wanderRadius, 0]; // Initialize if not set

    // Add a small random vector to the target's position
    character.wanderTarget[0] += Math.random() * wanderJitter - wanderJitter * 0.5;
    character.wanderTarget[1] += Math.random() * wanderJitter - wanderJitter * 0.5;

    // Re-project this new vector back to the wander circle
    character.wanderTarget = normalize(character.wanderTarget);
    character.wanderTarget = multiplyVector(character.wanderTarget, wanderRadius);

    // Move the target to a position in front of the character
    let targetLocal = addVectors(character.wanderTarget, [wanderDistance, 0]);
    let targetWorld = localToWorld(character.position, character.orientation, targetLocal);

    // Seek towards the target
    return seek(character, {position: targetWorld});
}

function directMovement(character, direction) {
    // Assuming 'direction' is a normalized vector representing the desired direction of movement
    let desiredVelocity = multiplyVector(direction, character.maxSpeed);

    // Update character's velocity directly towards the desired direction
    character.velocity = desiredVelocity;

    // Calculate the steering force required to align the character's current velocity with the desired velocity
    let steeringForce = subtractVectors(desiredVelocity, character.velocity);
    return steeringForce;
}

function subtractVectors(vector1, vector2) {
    return [vector1[0] - vector2[0], vector1[1] - vector2[1]];
}

function normalize(vector) {
    const length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
    if (length === 0) return [0, 0];
    return [vector[0] / length, vector[1] / length];
}

function multiplyVector(vector, scalar) {
    return [vector[0] * scalar, vector[1] * scalar];
}



function addVectors(vector1, vector2) {
    return [vector1[0] + vector2[0], vector1[1] + vector2[1]];
}

// Converts local space coordinates to world space
function localToWorld(position, orientation, localPoint) {
    // Assuming orientation is in radians and points are [x, y]
    let cosTheta = Math.cos(orientation);
    let sinTheta = Math.sin(orientation);

    let worldX = cosTheta * localPoint[0] - sinTheta * localPoint[1] + position[0];
    let worldY = sinTheta * localPoint[0] + cosTheta * localPoint[1] + position[1];

    return [worldX, worldY];
}

