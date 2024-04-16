// allows student to upload a file to server
import React, {createRef} from "react";

function FileUpload({name, nameMod, setFileName, setMod, setBufferFlag}){
    const fileInput = createRef();
    const onSubmit = async(e) => {
        e.preventDefault();
        
        setMod(nameMod+1);

        const file_name = `${name}${nameMod}`;
       

        const formData = new FormData();
        formData.set("avatar", fileInput.current.files[0]);

        try{
            const response = await fetch(`/service/initialStore/${name}`,{
                method: "POST",
                body: formData
            });
            await response.json();
            if (response.status === 200) {
                setFileName(file_name);
                setBufferFlag(true);
                alert(`File Upload Successful`); //popup after submission
            }else {
                console.error("some error occured");
            }
        }catch (e) {
        console.error(e.message)
        }
    }


return(
    <div>
        <h4>Upload Initial File</h4>
        <form onSubmit={onSubmit}>
            <input type="file" name="avatar" ref={fileInput}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
);
};

export default FileUpload;