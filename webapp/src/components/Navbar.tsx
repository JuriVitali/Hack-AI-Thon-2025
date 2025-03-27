import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/page2">page2</Link>
      </li>
      <li>
        <Link to="/page3">page3</Link>
      </li>
      <li>
        <Link to="/page4">page4</Link>
      </li>
    </ul>
  );
}

export default Navbar;
