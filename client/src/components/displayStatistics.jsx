import React, {createRef, useEffect} from "react";
//problem bitch

function DisplayStatistics({statistics, setStatistics })
{
    const foo = createRef(null)
    useEffect(()=>{
        const bar = foo.current
        bar.innerHTML = statistics
    },[statistics,foo])
    return(
        <p ref={foo}></p>
    )
}
export default DisplayStatistics