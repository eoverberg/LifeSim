import React, {createRef} from "react";

function FileUpload({name, nameMod, setName, setRunFlag, setFileName, setMod}){
    const fileInput = createRef();
    const onSubmit = async(e) => {
        e.preventDefault();
        
        setRunFlag(true);
        setMod(nameMod+1);

        const file_name = `${name}${nameMod}`;
        setFileName(file_name);

        const formData = new FormData();
        formData.set("avatar", fileInput.current.files[0]);

        try{
            const response = await fetch(`/service/intialStore/${name}/${nameMod}`,{
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


return(
    <div>
        <h2>Upload Initial File</h2>
        <form onSubmit={onSubmit}>
            <input type="file" name="avatar" ref={fileInput}/>
            <input type="submit" value="Submit"/>
        </form>
    </div>
);
};

export default FileUpload;