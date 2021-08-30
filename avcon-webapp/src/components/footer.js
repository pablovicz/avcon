import "../styles/components/footer.css";

import GitHubIcon from "@material-ui/icons/GitHub";
import CopyrightIcon from "@material-ui/icons/Copyright";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <CopyrightIcon fontSize="medium" />
        <a className="github-icon" href="https://github.com/pablovicz/avcon" target="_blank" rel="noopener noreferrer" >
            <GitHubIcon fontSize="medium"/>
        </a>
      </div>
    </div>
  );
}

export default Footer;
