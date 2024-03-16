import FileUpload from "../components/FileUpload.js"
import Canvas from "../components/Canvas.js";
import { useLocalStorage } from "../components/useLocalStorage";
//import GetData from "../components/GetData.js";
import IntervalControl from "../components/IntervalControl.js";
import GetBuffer from "../components/GetBuffer.js";
import RunBuffer from "../components/RunBuffer.js";

const StudentSimulation = () => {
    const [name, setName] = useLocalStorage("student_name", "");
    const [runFlag, setRunFlag] = useLocalStorage("run_flag", false);
    const [bufferFlag, setBufferFlag] = useLocalStorage("buffer_flag", false);
    const [fileName, setFileName] = useLocalStorage("file_name", "");
    const [nameMod, setMod] = useLocalStorage("name_modifier", 0);
    const [displayData, setData] = useLocalStorage("display_data", "");
    const [buffer, setBuffer] = useLocalStorage("buffer", "");
    const [bufferLine, setBufferLine] = useLocalStorage("buffer_line", 0);
    const [bufferA, setBufferA] = useLocalStorage("buffer_a", "")
    const [intervalTime, setIntervalTime] = useLocalStorage("interval_time", 1000)
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
        setBufferFlag={setBufferFlag}
        />
        <RunBuffer
        buffer={buffer}
        setBuffer={setBuffer}
        bufferLine={bufferLine}
        setBufferLine={setBufferLine}
        bufferFlag={bufferFlag}
        setBufferFlag={setBufferFlag}
        runFlag={runFlag}
        setRunFlag={setRunFlag}
        setData={setData}
        bufferA={bufferA}
        intervalTime={intervalTime}
        />
        <GetBuffer
        fileName={fileName}
        nameMod={nameMod}
        setMod={setMod}
        name={name}
        setBuffer={setBuffer}
        bufferFlag={bufferFlag}
        setBufferFlag={setBufferFlag}
        setFileName={setFileName}
        setBufferA={setBufferA}
        buffer={buffer}
        bufferA={bufferA}
        />
        <IntervalControl
        setIntervalTime={setIntervalTime}
        />
        <Canvas 
        displayData={displayData}
        />
        </>
    );
};

export default StudentSimulation;

/*
 <GetData
        fileName={fileName}
        setData={setData}
        />




*/