import { useLocalStorage } from "../components/useLocalStorage";
import GetStatistic from "../components/GetStats";
import DisplayStatistics from "../components/DisplayStats";
const Review = () => {
     const [statistics, setStatistics] = useLocalStorage("stats", "default");
     const [name, setName] = useLocalStorage("student_name", "");
    //setStatistics = {setStats}
    //<GetStats> </GetStats>
    return(
    <h5>
        <p>Top Scores:</p>
        <GetStatistic setStatistics = {setStatistics} name = {name}/>
        <DisplayStatistics statistics = {statistics}/>
        <p>{setStatistics}</p>
    </h5>
    );
    
};

export default Review;