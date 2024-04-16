
import {Outlet, Link} from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';


const Layout = () => {
    return (
        <>
        <ButtonGroup variant="text" aria-label="Small button group">
        <Button component={Link} to="/Home" >
        Home
        </Button>
        <Button component={Link} to="/Instructor">
        Instructor
        </Button>
        <Button  component={Link} to="/Review">
        Score Review
        </Button>
        <Button component={Link} to="/Student">
        Student
        </Button>  
        </ButtonGroup>
        <Outlet/>
        </>
    )

}
// Replace after render issue is fixed
//<h1 class ="title"><p>Welcome to LifeSimulation</p></h1>

export default Layout;
