import StudentAdder from "../components/StudentAdder";
import StudentDeleter from "../components/StudentDeleter";
import GetRoster from "../components/GetRoster";
import { useLocalStorage } from "../components/useLocalStorage";

const Instructor = () => { 
    const [roster, setRoster] = useLocalStorage("roster", "default");
    
    return(
        <>
        <GetRoster
        setRoster = {setRoster}
        />
        <StudentAdder
            setRoster={setRoster}
            roster={roster}
        />
        <StudentDeleter
            setRoster={setRoster}
            roster={roster}
        />
        <p>unchangable data here</p>
        </>
    );

};

export default Instructor;
