// for every student in the roster file
// if not in use, save it to local storage 
// if no directory exists set directorytry{

async function UpdateRoster({setRoster}){

    const response = await fetch(`/profile/updateRoster}`,{ //send student name as parameter
        method: "POST"
    });
    response.json();
    if (response.ok) {
        setRoster(response.text());
        console.log("File uploaded"); //popup after submission

    } else {
        console.error("some error occured");//maybe put something to output to header
    }

return(
    <h1>Roster Updated</h1>
);
}

export default UpdateRoster;