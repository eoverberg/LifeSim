
import {Outlet, Link} from "react-router-dom";


const Layout = () => {
    return (
        <>
        <h1 class ="title"><p>Welcome to LifeSimulation</p></h1>
        <Link to ="Home">Home</Link><h2></h2>
        <Link to ="Instructor">Instructor</Link><h2></h2>
        <Link to ="Review">Top Scores</Link><h2></h2>
        <Link to ="Student">Student</Link><h2></h2>       
        <Outlet/>
        </>
    )

}

export default Layout;