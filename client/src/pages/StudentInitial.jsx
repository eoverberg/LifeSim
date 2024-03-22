import { useLocalStorage } from "../components/useLocalStorage.jsx";
import GetRoster from "../components/GetRoster.jsx";
import StudentSelection from "../components/StudentSelection.jsx";

const StudentInitial = () => {
    const [name, setName] = useLocalStorage("student_name", " ");
    const [roster, setRoster] = useLocalStorage("roster", "default");
    return (
        <>

        <h1>Student logon screen</h1>

        <GetRoster
        setRoster = {setRoster}
        />

        <StudentSelection
        roster = {roster}
        setName = {setName}
        />

        </>
    );
};

export default StudentInitial;