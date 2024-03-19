import FileUpload from "../components/FileUpload.jsx"
import Canvas from "../components/Canvas.jsx";
import { useLocalStorage } from "../components/useLocalStorage.jsx";
import GetData from "../components/GetData.jsx";
import IntervalControl from "../components/IntervalControl.jsx";

const StudentSimulation = () => {
    const [name, setName] = useLocalStorage("student_name", "");
    const [runFlag, setRunFlag] = useLocalStorage("run_flag", false);
    const [fileName, setFileName] = useLocalStorage("file_name", "");
    const [nameMod, setMod] = useLocalStorage("name_modifier", 0);
    const [displayData, setData] = useLocalStorage("display_data", "");
    return (
        <>
        <h1>{name}</h1>
        <FileUpload 
        name={name}
        nameMod={nameMod}
        setName={setName}
        setRunFlag={setRunFlag}
        setFileName={setFileName}
        setMod={setMod}
        />
        <IntervalControl
        name={name}
        runFlag={runFlag}
        setRunFlag={setRunFlag}
        fileName={fileName}
        setFileName={setFileName}
        nameMod={nameMod}
        setMod={setMod}
        />
        <GetData
        fileName={fileName}
        setData={setData}
        />
        <Canvas 
        displayData={displayData}
        runFlag={runFlag}
        fileName={fileName}/>
        </>
    );
};

export default StudentSimulation;