function seek(entity_vector_, target_vector_, speed) {
  //let targetVector = [target.m_x_pos, target.m_y_pos];
  //let entityVector = [entity.m_x_pos, entity.m_y_pos];
  // Calculate the desired velocity as a vector pointing from the entity to the target.
  let desired_velocity = subtractVectors(target_vector_, entity_vector_);

  // Normalize the desired velocity to get it in the direction of the target only.
  desired_velocity = normalize(desired_velocity);

  // Multiply the normalized vector by the entity's maximum speed to get the maximum desired velocity.
  // if (Math.abs(distance(entity_vector_, target_vector_)) < speed) { // Clip speed if going to overshoot
  //     speed = Math.abs(distance(entity_vector_, target_vector_));
  // }
  // if (Math.abs(distance(entity_vector_, target_vector_)) <= 5) { // Clip speed if going to overshoot
  //     speed = 0;
  // }
  desired_velocity = multiplyVector(desired_velocity, speed);

  // Calculate the steering force as the difference between the desired velocity and the entity's current velocity.
  //let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
  let steering_force = desired_velocity;
  // Change the energy for each time it seeks

  // Return the steering force which will adjust the entity's velocity in the next update.
  return steering_force;
}

function flee(entity_vector_, target_, speed_) {
  // Calculate the vector from the entity to the target
  //let entityVector = [entity.m_x_pos, entity.m_y_pos];
  let desired_velocity = subtractVectors(entity_vector_, target_);

  desired_velocity = normalize(desired_velocity); // Normalize to get the direction

  desired_velocity = multiplyVector(desired_velocity, speed_); // Scale to maximum speed
  let steering_force = desired_velocity;
  // The steering force is the difference between desired velocity and current velocity
  //let steeringForce = subtractVectors(desiredVelocity, entity.velocity);
  // Change the energy for each time it flees
  //entity.energy = entity.energy - 5;
  // Return the computed steering force to adjust the entity's velocity away from the target
  return steering_force;
}

function wander(entity_, speed_) {
  // Parameters for wander behavior
  //let wander_radius = 20; // Radius of the wander circle
  let wander_distance = 2 * speed_; // Distance the wander circle is in front of the entity
  //let wander_jitter = .5; // How much the target point can change each tick
  // random amount of radians to offset the entities orientation.
  // radians = degrees, 0.26 = 15, .52 = 30, .78 = 45, 1.04 = 60, 1.56 = 90, 2.08 = 110, 2.6 = 135, 3.12 = 180]
  let max_radian_offset = 0.52;
  // double radians and multiple by random number then subtract radians to get a number between -radian;s and +radians
  let wander_offset = 2 * max_radian_offset * Math.random() - max_radian_offset;
  //console.log("wander_offset: " + wander_offset)
  // add offset to current orientation and ensure it is with 3.14 and -3.14
  let temp_orientaton = wander_offset + entity_.m_orientation;
  //console.log("temp_orientaton: " + temp_orientaton)
  if (temp_orientaton > 3.14) {
    let leftover = temp_orientaton - 3.14;
    temp_orientaton = -3.14 + leftover;
  }
  if (temp_orientaton < -3.14) {
    let leftover = temp_orientaton + 3.14;
    temp_orientaton = 3.14 - leftover;
  }
  //console.log("temp orient: " + temp_orientaton)
  // Initialize entity.target to the entity's current position if it doesn't exist
  // Creates a shallow copy of entity.position & assigns to entity.target so target won't affect position
  //entity.target = entity.target || [...entity.position];
  let entity_vector = [entity_.m_x_pos, entity_.m_y_pos];
  let target_vector = [Math.cos(temp_orientaton), Math.sin(temp_orientaton)];
  target_vector = multiplyVector(target_vector, wander_distance);
  let target_local = addVectors(entity_vector, target_vector);
  // console.log("target_local" + target_local)
  // Convert the local target to world space using the entity's current position
  //target_vector = addVectors(entity_vector, target_local);

  // Seek towards the target
  return seek([entity_.m_x_pos, entity_.m_y_pos], target_local, speed_);
}

function directMovement(entity_, direction_, speed_) {
  // Assuming 'direction' is a normalized vector representing the desired direction of movement
  let desired_velocity = multiplyVector(direction_, entity_.max_speed);

  // Update entity's velocity directly towards the desired direction
  entity_.velocity = desired_velocity;

  // Calculate the steering force required to align the entity's current velocity with the desired velocity
  let steeringForce = subtractVectors(desired_velocity, entity_.velocity);

  // Change the energy for each time it seeks
  entity_.energy = entity_.energy - 5;
  return steeringForce;
}

// Subtracts one vector from another and returns the resulting vector.
function subtractVectors(vector_1_, vector_2_) {
  return [vector_1_[0] - vector_2_[0], vector_1_[1] - vector_2_[1]];
}

// Normalizes a vector to a unit vector (length of 1), maintaining its direction.
function normalize(vector_) {
  const length = Math.sqrt(vector_[0] ** 2 + vector_[1] ** 2); // Calculate the vector's length.
  if (length === 0) return [0, 0]; // Handle the zero-length case to avoid division by zero.
  return [vector_[0] / length, vector_[1] / length]; // Scale the vector components to normalize it.
}

// Multiplies a vector by a scalar and returns the resulting scaled vector.
function multiplyVector(vector_, scalar_) {
  return [vector_[0] * scalar_, vector_[1] * scalar_]; // Scale both components of the vector.
}

// Adds two vectors together and returns the resulting vector.
function addVectors(vector_1_, vector_2_) {
  return [vector_1_[0] + vector_2_[0], vector_1_[1] + vector_2_[1]]; // Add corresponding components.
}

// Converts local space coordinates to world space based on position and orientation.
function localToWorld(position_, orientation_, local_point_) {
  // Assuming orientation is in radians and points are [x, y]
  let cos_theta = Math.cos(orientation_); // Cosine of the orientation angle.
  let sin_theta = Math.sin(orientation_); // Sine of the orientation angle.

  // Calculate the world coordinates by rotating and then translating the local point.
  let world_x =
    cos_theta * local_point_[0] - sin_theta * local_point_[1] + position_[0];
  let world_y =
    sin_theta * local_point_[0] + cos_theta * local_point_[1] + position_[1];

  return [world_x, world_y]; // Return the transformed coordinates.
  return [world_x, world_y]; // Return the transformed coordinates.
}

function distance(position_1_, position_2_) {
  return Math.sqrt(
    (position_1_[0] - position_2_[0]) ** 2 +
      (position_1_[1] - position_2_[1]) ** 2
  );
}

module.exports = { seek, flee, wander };
