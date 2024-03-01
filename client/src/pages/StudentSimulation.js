import FileUpload from "../components/FileUpload.js"
import Canvas from "../components/Canvas.js";
import { useLocalStorage } from "../components/useLocalStorage";

const StudentSimulation = () => {
    const [name, setName] = useLocalStorage("student_name", "");
    const [runflag, setrunflag] = useLocalStorage("run_flag", false);
    const [file_name, setFileName] = useLocalStorage("file_name", "");
    const [nameMod, setMod] = useLocalStorage("name_modifier", 0);

    return (
        <>
        <h1>{name}</h1>
        <FileUpload 
        name={name}
        nameMod={nameMod}
        setName={setName}
        setRunFlag={setrunflag}
        setFileName={setFileName}
        setMod={setMod}
        />
        
        <Canvas 
        runflag={runflag}
        file_name={file_name}/>
        </>
    );
};

export default StudentSimulation;