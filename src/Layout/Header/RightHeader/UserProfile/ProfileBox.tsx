import { Link } from "react-router-dom";
import { FeatherIcons, LI, UL } from "../../../../AbstractElements";
import { profilesMessage } from "../../../../Data/LayoutData/HeaderData";

const ProfileBox = () => {
  const handleClick = (name:string)=>{
    if(name === "Log Out"){
      localStorage.removeItem("login")
    }
  }
  return (
    <UL className="profile-dropdown onhover-show-div">
      {profilesMessage.map((data,index) => (
        <LI key={index}>
          <Link to={data.link} onClick={()=>handleClick(data.name)}>
            <FeatherIcons iconName={data.icon} />
            <span>{data.name} </span>
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default ProfileBox;
