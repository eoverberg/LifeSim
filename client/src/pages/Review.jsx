import { useLocalStorage } from "../components/useLocalStorage";
import GetStatistic from "../components/GetStats";
import DisplayStatistics from "../components/DisplayStats";
const Review = () => {
     const [statistics, setStatistics] = useLocalStorage("stats", "default");
    return(
    <h>
        <p>Top Scores:</p>
        <GetStatistic setStatistics = {setStatistics}/>
        <DisplayStatistics statistics = {statistics}/>
    </h>
    );
    
};

export default Review;