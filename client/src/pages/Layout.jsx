
import {Outlet, Link} from "react-router-dom";


const Layout = () => {
    return (
        <>
        
        <Link to ="Home">Home | </Link>
        <Link to ="Instructor"> Instructor | </Link>
        <Link to ="Review"> Top Scores | </Link>
        <Link to ="Student"> Student | </Link>     
        <Outlet/>
        </>
    )

}
// Replace after render issue is fixed
//<h1 class ="title"><p>Welcome to LifeSimulation</p></h1>

export default Layout;
