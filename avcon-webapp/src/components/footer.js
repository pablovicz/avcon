import "../styles/components/footer.css";

import GitHubIcon from "@material-ui/icons/GitHub";
import CopyrightIcon from "@material-ui/icons/Copyright";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import { Link, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";



function Footer() {

  const location = useLocation();

  function handleBack() {
    toast.warning('Cancelled operation!');
  }

  return (
    <div className="footer-container">
      <div className="footer-content">
        {location.pathname === '/convert' ? (
          <Link to="/" className="btn-back" onClick={() => handleBack()}>
            <ArrowBackIosOutlinedIcon fontSize="small"/>
          </Link>
        ) : (
          
          <CopyrightIcon fontSize="medium" />
          
        )}
        <a 
          className="github-icon" 
          href="https://github.com/pablovicz/avcon" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <GitHubIcon fontSize="medium"/>
        </a>
      </div>
    </div>
  );
}

export default Footer;
