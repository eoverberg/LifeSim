import { isColliding } from './utilities';
import Entity from './entity'

class Obstacle extends Entity {
    constructor(xPos,yPos,zPosm,lifeTime, diameter) {
        super(xPos,yPos,zPosm,lifeTime);
        this.diameter = diameter; // Obstacle size, could allow entities to go around it
        this.height = zPosm;
    }
}