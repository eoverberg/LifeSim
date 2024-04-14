import { useRef, useEffect } from 'react';
let num_plants = 0;
let num_grazers = 0;
let num_predators = 0;

function InitStats({displayData}){

//    useEffect(() => {   
        try {
                displayData.split(',')
        }catch(error)
        {
                return 
        }
        let lines = displayData.split(',')
        let num_plants = parseInt(lines[2]);
        let num_grazers = parseInt(lines[4]);
        let num_predators = parseInt(lines[3]);

//        }, [displayData,num_plants,num_obstacles,num_grazers,num_predators]);
        return (<>
            <b class = "plantCounter"> Number of Plants: {num_plants} </b>
            <b class = "grazerCounter"> Number of Grazers: {num_predators}</b>     
            <b class = "predatorCounter"> Number of Predators: {num_grazers}</b>        
            </>
          );
}
export default InitStats;