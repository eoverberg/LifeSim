import StudentAdder from "../components/StudentAdder";
import StudentDeleter from "../components/StudentDeleter";
import GetRoster from "../components/GetRoster";
import { useLocalStorage } from "../components/useLocalStorage";
import InstructorFileUpload from "../components/InstructorFileUpload";

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
        <p>Upload file containing unchangable data</p>
        <InstructorFileUpload
        
        />
        </>
    );

};

export default Instructor;
