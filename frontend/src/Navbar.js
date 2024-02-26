import React, {createRef, useEffect} from "react";
import { studentMenu } from './studentMenu';
//different student urls to run different sims at same time
const Navbar = () => {
  const dropdown_menu = createRef(null);

  function changeHandle(){
    const name = dropdown_menu.current.value;
    window.location.href = `./${name}`;
  }

  useEffect(() =>{
  const ddm = dropdown_menu.current;
  for (let student of studentMenu)
   {
    let option = document.createElement("option");
    option.text = student.name;
    ddm.add(option);
  }
  });

  return (
    <nav className="desktop-nav">
      <p>Select student before uploading file</p>
      <select ref={dropdown_menu} onChange={changeHandle}/>

    </nav>
  );
};

export default Navbar;