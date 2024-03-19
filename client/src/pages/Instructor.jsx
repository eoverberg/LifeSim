import StudentAdder from "../components/StudentAdder";
import StudentDeleter from "../components/StudentDeleter";
import { useLocalStorage } from "../components/useLocalStorage";

const Instructor = () => { 
    const [roster, setRoster] = useLocalStorage("roster", "default");
    
    return(
        <>
        <StudentAdder
            setRoster={setRoster}
            roster={roster}
        />
        <StudentDeleter
            setRoster={setRoster}
            roster={roster}
        />
        </>
    );

};

export default Instructor;

    //<h1>
    // <select ref={dropdown_menu}/>
    // <button onClick={click_handle}>Delete</button>
    // <p ref={display_text}>Instructor does that thing here.</p>
    // </h1>
    // const dropdown_menu = new createRef(null);
    // const display_text = new createRef(null);
    //const roster_s = Get_students().length;
    // useEffect(() =>{

        // const ddm = dropdown_menu.current;
        // const dis = display_text.current;
        
        // let default_opt = document.createElement("option");
        // default_opt.text = 'Delete Student';
        // default_opt.value="";
        // default_opt.disabled = default_opt.selected;
        // ddm.add(default_opt);
        
       // dis.innerHTML = roster_s;
        // for (let student of roster_s)
        // {
        //   let option = document.createElement("option");
        //   option.text = student;
        //   option.value = student;
        //   ddm.add(option);
        // }
    // });
    
    // function click_handle(){
    //     //delete_student(dropdown_menu.value);
    // } 