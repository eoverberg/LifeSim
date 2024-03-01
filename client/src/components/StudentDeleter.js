import React, {createRef} from "react";

function FileUpload({userName, nameMod, setMod, setRunFlag, setFileName}) {
    const fileInput = createRef(); //creates empty reference to use form data
    //function for button push 
    //send data to server
    const onSubmit = async (e) => {
      setRunFlag(true);
      setMod(nameMod + 1);
      //prevents website refresh
      e.preventDefault();
      //creates form data to send 
      const formData = new FormData();
      let naem = fileInput.current.value.split('\\');
      setFileName(naem.pop());
      formData.set("avatar", fileInput.current.files[0]);
      formData.set("userMod", nameMod)
      //http request to backend
      try{
          const response = await fetch(`/profile/${userName}/${nameMod}`,{ //send student name as parameter
              method: "POST",
              body: formData 
          });
          await response.json();
          if (response.status === 200) {
              alert(`a ${response.status}`); //popup after submission
          }else if(response.status===204){
              alert(`a ${response.status}`);
          } 
          else {
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
                  <input type="file" name="avatar" ref={fileInput}/> 
                  <input type="submit" value="Submit"/>
                  
             </form>
     </div>
     );
  
  }
  
  export default FileUpload;