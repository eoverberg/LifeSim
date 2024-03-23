import { isColliding } from './utilities';

class Obstacle extends Entity {
    constructor(xPos,yPos,zPosm,lifeTime) {
        super(xPos,yPos,zPosm,lifeTime);
        this.size = size; // Obstacle size, could allow entities to go around it
    }
}