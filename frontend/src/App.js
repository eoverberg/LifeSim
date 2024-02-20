//used to get file from website
// three way to pass a student name, url/ form data/ local storage
// currently using url
import React, {createRef} from "react";
import './App.css';
import { useLocalStorage } from "./useLocaleStorage";
//let file 

//https://youtu.be/73SpYrjsNlk?si=ziNN44rcPouppVKA
function App(props) {
  const fileInput = createRef(); //creates empty reference to use form data
  const nameInput = createRef();
  const [nameIn, setName] = useLocalStorage("name2", "");; //to get student name from storage
  const urlName = window.location.pathname; //to get student name from url
  
  //function for button push 
  //send data to server
  const onSubmit = async (e) => {
    //prevents website refresh
    e.preventDefault();
    
    //creates form data to send 
    const formData = new FormData();
    //formData.set("userName", nameInput.current.value) //to send user enter name to file storage 
    formData.set("avatar", fileInput.current.files[0]);

    //http request to backend
    try{
        const response = await fetch(`/profile/${urlName}`,{ //send student name as parameter
            method: "POST",
            body: formData 
        });
        await response.json();
        if (response.ok) {
            alert("File uploaded"); //popup after submission
        } else {
            console.error("some error occured");
        }
    }catch (e) {
        console.error(e.message)
    }
    }

    //html to display
    //textbox was experiment for multiuser, probably dont need
   return (
   <div>
      <h2 id="demo">Upload Initial File</h2>
           <form onSubmit={onSubmit}>
                <input type="text" name="userName" ref={nameInput}/>
                <input type="file" name="avatar" ref={fileInput}/> 
                <input type="submit" value="Submit"/>
                
           </form>
   </div>
   );

}

export default App;
