import { studentMenu } from './studentMenu';
//different student urls to run different sims at same time
const Navbar = () => {
  return (
    <nav className="desktop-nav">
      <p>Select student before uploading file</p>
      <ul className="menus">
        {studentMenu.map((menu, index) => {
          return (
            <li className="menu-items" key={index}>
              <a href={menu.name}>{menu.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;