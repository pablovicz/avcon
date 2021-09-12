import "../styles/components/header.css";
import mainLogo from "../assets/main-logo.svg";

import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <Link to="/" className="main-logo">
          <img src={mainLogo} alt="AVCON" />
        </Link>

        <div className="main-title">
          <h1 className="av">AV</h1>
          <h1>CON</h1>
        </div>
        <a 
          href="https://baixatube.netlify.app/" 
          className="more" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <MoreVertIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default Header;
