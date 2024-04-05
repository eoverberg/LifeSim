function isColliding(entity_1_, entity_2_) {
    const d_x = entity_1_.m_x_pos - entity_2_.m_x_pos;
    const d_y = entity_1_.m_y_pos - entity_2_.m_y_pos;
    const distance = Math.sqrt(d_x * d_x + d_y * d_y);
    return distance < (entity_1_.m_radius + entity_2_.m_radius);
}

function distanceTo(position_1_, position_2_) {
    return Math.sqrt((position_1_[0] - position_2_[0]) ** 2 + (position_1_[1] - position_2_[1]) ** 2);
}

// parameters: 
//      source (x,y) 
//      difference in source and target(x,y)
//      distance betweeen source and target
//      list of entities that could block LOS
// returns true if an obstacle is between target and source
function checkPath(source_, target_, obstacles_) {
    // check if any obstacles
    if (obstacles_.length === 0) {
        return target_;
    }
    let s_x = source_[0];
    let s_y = source_[1];
    let coords = [target_[0], target_[1]]
    let x_diff = target_[0] - s_x;
    let y_diff = target_[1] - s_y;
    let distance = (x_diff) ** 2 + (y_diff) ** 2;
    // iterate through obstacles and check if it is blocking path
    for (let obstacle of obstacles_) {
        // find closest point on path to obstacle     
        let position = ((obstacle.m_x_pos - s_x) * (x_diff) + (obstacle.m_y_pos - s_y) * (y_diff)) / distance;
        // if 0 or 1 obstacle is closest to target or source and not blocking los;
        if (position < 1 && position > 0) {
            // find closest (x,y) on line to obstacle  
            let line_x = s_x + (position * (x_diff));
            let line_y = s_y + (position * (y_diff));
            // find distance from obstacle to line
            let x_diff_2 = line_x - obstacle.m_x_pos;
            let y_diff_2 = line_y - obstacle.m_y_pos;
            let dis_to_line = (x_diff_2) ** 2 + (y_diff_2) ** 2;
            // if distance is less than obstacle radius, it is blocking path 
            if (dis_to_line <= obstacle.m_radius) {
                //if point is on line, take recipical of original slope for 90  
                if (dis_to_line === 0) {
                    x_diff_2 = -y_diff;
                    y_diff_2 = x_diff;
                }
                //normalize distance line then multiply by .m_radius
                //use diff2 for direction if not on line
                //change path to beside obstactle
                let norm_dis = normalize([x_diff_2, y_diff_2]);
                let edgeDist = multiplyVector(norm_dis, obstacle.m_radius);

                let obs_edge = [obstacle.m_x_pos + edgeDist[0], obstacle.m_y_pos + edgeDist[1]]
                if (distanceTo(source_, coords) > distanceTo(source_, obs_edge)) {
                    coords = obs_edge
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
function checkLOS(s_x_, s_y_, x_diff_, y_Diff_, distance_, obstacles_) {
    // flag if LOS is blocked
    let blocked = false;
    // iterate through obstacles and check if it is blocking LOS
    for (let obstacle of obstacles_) {
        // find closest point on line of sight to obstacle     
        let position = ((obstacle.m_x_pos - s_x_) * (x_diff_) + (obstacle.m_y_pos - s_y_) * (y_Diff_)) / distance_;
        // if 0 or 1 obstacle is closest to target or source and not blocking los
        if (position < 1 && position > 0) {
            // find closest (x,y) on line to obstacle  
            let line_x = s_x_ + (position * (x_diff_));
            let line_y = s_y_ + (position * (y_Diff_));
            // find distance from obstacle to line
            let dis_to_line = (obstacle.m_x_pos - line_x) ** 2 + (obstacle.m_y_pos - line_y) ** 2;
            // if distance is less than obstacle radius, it is blocking line of sight 
            if (dis_to_line <= obstacle.m_radius) {
                blocked = true;
            }
        }
        // if any obstacle is blocking LOS, exit for loop
        if (blocked) {
            break;
        }
    } // for loop 
    return blocked;
}

//returns summation of predators
function findPredator(s_x_, s_y_, distance_, ent_to_find_, obstructions_) {
    // distance squared so square root is never needed
    let dis_check = (distance_) ** 2;
    let target_x = 0;
    let target_y = 0;
    let sum_x = 0;
    let sum_y = 0;
    // loop through list of predators, list should never change
    for (let pred of ent_to_find_) {
        // (x,y) difference is used a lot in checkLOS
        let x_diff = pred.m_x_pos - s_x_;
        let y_diff = pred.m_y_pos - s_y_;
        // check if predator is within LOS
        let distance_2 = (x_diff) ** 2 + (y_diff) ** 2;
        if ((distance_2 < dis_check) && (distance_2 !== 0)) {
            if (checkLOS(s_x_, s_y_, x_diff, y_diff, distance_2, obstructions_)) {
                continue; // next predator if blocking
            }
            sum_x += x_diff;
            sum_y += y_diff;
            target_x = sum_x + s_x_;
            target_y = sum_y + s_y_;
        }
    }
    return [target_x, target_y];
}

// source(x,y)
// list of possible targets
// list of possible obstacle blocking LOS
// distance to check
// returns closest entity in entities list
function findClosest(s_x_, s_y_, entities_, obstructions_, distance_, smell_distance_) {
    let target;
    // closest distance to source, starts at LOS
    let dis_check = (distance_) ** 2;
    for (let ent of entities_) {
        let x_diff = ent.m_x_pos - s_x_;
        let y_diff = ent.m_y_pos - s_y_;
        let distance_2 = (x_diff) ** 2 + (y_diff) ** 2;
        // check if closest
        if (distance_2 < dis_check && distance_2 !== 0) 
        {// ent is closest then change distance to check and return ent
            if ((distance_2 < smell_distance_) || !checkLOS(s_x_, s_y_, x_diff, y_diff, distance_2, obstructions_)) 
            {
                dis_check = distance_2;
                target = ent;
            }
        }
    }
    return target;
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

function boundsCheck(world_x_, world_y_, pos_x_, pos_y_) {
    if (pos_x_ > world_x_) {
        pos_x_ = world_x_;
    }
    if (pos_x_ < 0) {
        pos_x_ = 0;
    }
    if (pos_y_ < 0) {
        pos_y_ = 0;
    }
    if (pos_y_ > world_y_) {
        pos_y_ = world_y_;
    }
}

module.exports = { isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo, boundsCheck };
