import { isColliding } from './utilities';
import Entity from './entity'

class Obstacle extends Entity {
    constructor(xPos,yPos,zPos,lifeTime, diameter) {
        super(xPos,yPos,zPos,lifeTime);
        this.diameter = diameter; // Obstacle size, could allow entities to go around it
        this.height = zPos;
    }
}