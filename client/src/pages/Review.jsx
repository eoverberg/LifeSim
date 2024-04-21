import { useLocalStorage } from "../components/useLocalStorage";
import GetStatistic from "../components/GetStats";
import DisplayStatistics from "../components/DisplayStats";

const Review = () => {
     const [statistics, setStatistics] = useLocalStorage("stats", "default");
     const [name] = useLocalStorage("student_name", "");
     const [displayData] = useLocalStorage("display_data", "");
    //setStatistics = {setStats}
    //<GetStats> </GetStats>
    return(
    <h5>
        <GetStatistic setStatistics = {setStatistics} name = {name}/>
        <DisplayStatistics statistics = {statistics} displayData = {displayData}/>
    </h5>
    );
    
};

export default Review;