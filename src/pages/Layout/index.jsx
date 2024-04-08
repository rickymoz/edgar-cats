import { Outlet, Link } from "react-router-dom";
import "./style.css";
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
