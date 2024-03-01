
import {Outlet, Link} from "react-router-dom";


const Layout = () => {
    return (
        <>
        <Link to ="Instructor">Instructor</Link><p></p>
        <Link to ="Review">TopScores</Link><p></p>
        <Link to ="Student">Student</Link>        
        <Outlet/>
        </>
    )

}

export default Layout;