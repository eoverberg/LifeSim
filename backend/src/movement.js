function seek(entity, target) {
    let desiredVelocity = subtractVectors(target.position, entity.position);
    desiredVelocity = normalize(desiredVelocity);
    desiredVelocity = multiplyVector(desiredVelocity, entity.maxSpeed);
    
    let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
    return steeringForce;
}

function flee(entity, target) {
    // Calculate the vector from the entity to the target
    let desiredVelocity = subtractVectors(entity.position, target.position);
    desiredVelocity = normalize(desiredVelocity); // Normalize to get the direction
    desiredVelocity = multiplyVector(desiredVelocity, entity.maxSpeed); // Scale to maximum speed
    
    // The steering force is the difference between desired velocity and current velocity
    let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
    return steeringForce;
}

function wander(entity) {
    // Parameters for wander behavior
    let wanderRadius = 10; // Radius of the wander circle
    let wanderDistance = 15; // Distance the wander circle is in front of the entity
    let wanderJitter = 1; // How much the target point can change each tick

    // Ensure entity has a wanderTarget property
    entity.wanderTarget = entity.wanderTarget || [wanderRadius, 0]; // Initialize if not set

    // Add a small random vector to the target's position
    entity.wanderTarget[0] += Math.random() * wanderJitter - wanderJitter * 0.5;
    entity.wanderTarget[1] += Math.random() * wanderJitter - wanderJitter * 0.5;

    // Re-project this new vector back to the wander circle
    entity.wanderTarget = normalize(entity.wanderTarget);
    entity.wanderTarget = multiplyVector(entity.wanderTarget, wanderRadius);

    // Move the target to a position in front of the entity
    let targetLocal = addVectors(entity.wanderTarget, [wanderDistance, 0]);
    let targetWorld = localToWorld(entity.position, entity.orientation, targetLocal);

    // Seek towards the target
    return seek(entity, {position: targetWorld});
}

function directMovement(entity, direction) {
    // Assuming 'direction' is a normalized vector representing the desired direction of movement
    let desiredVelocity = multiplyVector(direction, entity.maxSpeed);

    // Update entity's velocity directly towards the desired direction
    entity.velocity = desiredVelocity;

    // Calculate the steering force required to align the entity's current velocity with the desired velocity
    let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
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

