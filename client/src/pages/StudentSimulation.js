import FileUpload from "../components/FileUpload.js"
import Canvas from "../components/Canvas.js";
import { useLocalStorage } from "../components/useLocalStorage";
import GetData from "../components/GetData.js";

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