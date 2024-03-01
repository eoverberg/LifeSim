import React, {createRef, useEffect} from "react";

function StudentSelection () {
    const dropdown_menu = createRef(null);

    function changeHandle(){}

    return(
        <nav>
        <p>Select Student</p>
        <select ref={dropdown_menu} onChange={changeHandle}/>
        </nav>
    );
}

export default StudentSelection;