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
    useEffect(()=>{
        // kept to show the incoming JSON
        const bar = foo.current
        bar.innerHTML = statistics
        
        if(statistics !== "default")
        {
            // could be better
            const first_spot = first.current
            const second_spot = second.current
            const third_spot = third.current
            const fourth_spot = fourth.current
            const fifth_spot = fifth.current
            // json of a list of scores.
            // scores should be sorted on the backend.
            let scores = JSON.parse(statistics)
            let list = scores.top_scores

       
            first_spot.innerHTML = `First Place: ${list[0].name}-----Score:${list[0].score} `
            second_spot.innerHTML = `Second Place: ${list[1].name}-----Score:${list[1].score} `
            third_spot.innerHTML = `Third Place: ${list[2].name}-----Score:${list[2].score} `
            fourth_spot.innerHTML = `Fourth Place: ${list[3].name}-----Score:${list[3].score} `
            fifth_spot.innerHTML = `Fifth Place: ${list[4].name}------Score:${list[4].score} `
        }
    },[statistics,foo, first,second,third,fourth,fifth])
    return(
        <>
        <p ref={foo}></p>
        <p ref={first}></p>
        <p ref={second}></p>
        <p ref={third}></p>
        <p ref={fourth}></p>
        <p ref={fifth}></p>
        </>
    )
}
export default DisplayStatistics