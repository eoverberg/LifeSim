import { useLocalStorage } from "../components/useLocalStorage";
import UpdateRoster from "../components/updateRoster.js";
import StudentSelection from "../components/StudentSelection.js";

const StudentInitial = () => {
    const [name, setName] = useLocalStorage("student_name", "");
    const [roster, setRoster] = useLocalStorage("roster", "");
    return (
        <>
        <h1>Student logon screen</h1>
        <UpdateRoster
        setRoster = {setRoster}
        />
        <StudentSelection
        roster = {roster}
        setname = {setName}
        />

      </>
    );
};

export default StudentInitial;