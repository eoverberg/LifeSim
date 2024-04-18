import React, {createRef, useEffect} from "react";
//problem bitch

function DisplayStatistics({statistics, setStatistics })
{
    const foo = createRef(null)
    const first = createRef(null)
    const second = createRef(null)
    const third = createRef(null)
    const fourth = createRef(null)
    const fifth = createRef(null)
    const time_stat = createRef(null)
    const plant_stat = createRef(null)
    const grazer_stat = createRef(null)
    const pred_stat = createRef(null)
    const last_score = createRef(null)
    useEffect(()=>{
        // kept to show the incoming JSON
        //const bar = foo.current
        //bar.innerHTML = statistics
        
        if(statistics !== "default")
        {
            // could be better
            const first_spot = first.current
            const second_spot = second.current
            const third_spot = third.current
            const fourth_spot = fourth.current
            const fifth_spot = fifth.current
            const time = time_stat.current
            const plant = plant_stat.current
            const grazer = grazer_stat.current
            const predator = pred_stat.current
            const score = last_score.current;
            // json of a list of scores.
            // scores should be sorted on the backend.
            let scores = JSON.parse(statistics)
            let list = scores.top.top_scores;
            
            
       
            first_spot.innerHTML = `First Place: ${list[0].name}-----Score:${list[0].score} `
            second_spot.innerHTML = `Second Place: ${list[1].name}-----Score:${list[1].score} `
            third_spot.innerHTML = `Third Place: ${list[2].name}-----Score:${list[2].score} `
            fourth_spot.innerHTML = `Fourth Place: ${list[3].name}-----Score:${list[3].score} `
            fifth_spot.innerHTML = `Fifth Place: ${list[4].name}------Score:${list[4].score} `
            if (scores.stats !== "" && scores.stats !== 0 && scores.stats.end_stats.time_seconds >0){
                let info = scores.stats.end_stats;
                time.innerHTML =   `Total Time in Seconds: ${info.time_seconds}`
                plant.innerHTML =   `Plant Total Generations: ${info.plant_gen.length}---Children per Generation: ${info.plant_gen}`
                grazer.innerHTML =   `Grazer Total Generations: ${info.grazer_gen.length}---Children per Generation: ${info.grazer_gen}`
                predator.innerHTML =   `Predator Total Generations: ${info.predator_gen.length}---Children per Generation:: ${info.predator_gen}`
                score.innerHTML = `Score: ${info.score}` 
            }
        }
    },[statistics,foo, last_score, first,second,third,fourth,fifth, time_stat,plant_stat,grazer_stat,pred_stat])
    return(
        <>
        <p ref={foo}></p>
        <p ref={first}></p>
        <p ref={second}></p>
        <p ref={third}></p>
        <p ref={fourth}></p>
        <p ref={fifth}></p>
        <br></br>
        <p>Latest Run Statistics</p>
        <p ref={time_stat}></p>
        <p ref={plant_stat}></p>
        <p ref={grazer_stat}></p>
        <p ref={pred_stat}></p>
        <p ref={last_score}></p>
        </>
    )
}
export default DisplayStatistics