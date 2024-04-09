import { useRef, useEffect } from 'react';

function InitStats({displayData}){


//    useEffect(() => {   
        
        let lines = displayData.split(',')
        let num_plants = parseInt(lines[2]);
        let num_grazers = parseInt(lines[4]);
        let num_predators = parseInt(lines[3]);
        let num_obstacles = parseInt(lines[5]);


//        }, [displayData,num_plants,num_obstacles,num_grazers,num_predators]);
        return (<>
            <b class = "plantCounter"> Number of Plants: {num_plants} </b>
            <b class = "grazerCounter"> Number of Grazers: {num_predators}</b>     
            <b class = "predatorCounter"> Number of Predators: {num_grazers}</b>     
            <b class = "obstaclesCounter"> Number of Obstacles: {num_obstacles}</b>     
            </>
          );
}
export default InitStats;