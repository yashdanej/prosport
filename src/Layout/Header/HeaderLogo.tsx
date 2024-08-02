import { Link } from "react-router-dom";
import Image from "../../CommonElements/Media";
import { dynamicImage } from "../../Service";

const HeaderLogo = () => {
  return (
    <div className="header-logo-wrapper col-auto">
        <div className="logo-wrapper">
            <Link to={"/"}>
                <Image style={{width: "150px"}} className="img-fluid for-light" src={dynamicImage("logo/prosport.png")} alt="logo"/>
                <Image style={{width: "150px"}} className="img-fluid for-dark" src={dynamicImage("logo/prosport.png")} alt="logo"/>
            </Link>
        </div>
    </div>
  );
};

export default HeaderLogo;
