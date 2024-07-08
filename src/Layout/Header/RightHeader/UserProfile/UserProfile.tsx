import { Image, LI, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import ProfileBox from "./ProfileBox";

const UserProfile = () => {
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  return (
    <LI className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <Image className="img-30" src={dynamicImage("dashboard/profile.png")} alt="user" />
        <div className="flex-grow-1">
          <span>{parsedUserData?.user?.name}</span>
          <P className="mb-0 font-outfit">Operator
            <i className="fa fa-angle-down" />
          </P>
        </div>
      </div>
      <ProfileBox />
    </LI>
  );
};

export default UserProfile;
