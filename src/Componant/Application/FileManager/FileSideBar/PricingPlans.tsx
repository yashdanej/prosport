import { FiGrid } from "react-icons/fi";
import { Btn, H5, H6, Image, LI, P, UL } from '../../../../AbstractElements'
import { FREE, PricingPlan, Selected, TrialVersion } from '../../../../utils/Constant'
import { dynamicImage } from '../../../../Service'
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Card } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../ReduxToolkit/Store";
import { useState } from "react";
import BottomRightToast from "../../../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast";
import { BACKEND_URL, FRONTEND_URL } from "../../../../Utils";

const PricingPlans = () => {
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const handleCopyCode = (from: string) => {
    const referralCode = from=== "code" ? parsedUserData?.user?.reffer_code: `${FRONTEND_URL}/authentication/register_simple/${parsedUserData?.user?.reffer_code}`;
    if (referralCode) {
      navigator.clipboard.writeText(referralCode).then(() => {
        setTxt(from=== "code" ? "Referral Code Copied Successfully!" : "Referral Link Copied Successfully!");
        setShowToast(true);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  }
  return (
    <Card>
      <CommonCardHeader title="How To Use" />
      <div className="pricing-plan">
        <H6>You cannot generate codes.</H6>
        <H5>CODE: <b>{parsedUserData?.user?.reffer_code}</b></H5>
        <P>Contact us to generate more referrals link.</P>
        <P>Or signup using link</P>
        <Btn onClick={() => handleCopyCode('code')} size="xs" color="primary" outline>Copy Code</Btn>
        <Btn onClick={() => handleCopyCode("link")} className="mx-2" size="xs" color="primary" outline>Copy Link</Btn>
        <Image className="bg-img" src={dynamicImage('dashboard/folder.png')} alt="dashboard"/>
      </div>
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Card>
  )
}

export default PricingPlans