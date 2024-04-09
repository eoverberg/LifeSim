import { useLocalStorage } from "../components/useLocalStorage";
import GetStatistic from "../components/getStatistics";
import DisplayStatistics from "../components/displayStatistics";
const Review = () => {
     const [statistics, setStatistics] = useLocalStorage("stats", "default");
    //setStatistics = {setStats}
    //<GetStats> </GetStats>
    return(<h>
        <p>Top Scores:</p>
        <GetStatistic setStatistics = {setStatistics}/>
        <DisplayStatistics statistics = {statistics}/>
        <p>{setStatistics}</p>
        <p>THis is a tester</p>
    </h>);
    
};

export default Review;