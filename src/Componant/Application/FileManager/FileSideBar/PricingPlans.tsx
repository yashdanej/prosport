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

const PricingPlans = () => {
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const handleCopyCode = () => {
    const referralCode = parsedUserData?.user?.reffer_code;
    if (referralCode) {
      navigator.clipboard.writeText(referralCode).then(() => {
        setTxt("Referral Code Copied Successfully!");
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
        <Btn onClick={handleCopyCode} size="xs" color="primary" outline>Copy</Btn>
        <Image className="bg-img" src={dynamicImage('dashboard/folder.png')} alt="dashboard"/>
      </div>
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Card>
  )
}

export default PricingPlans