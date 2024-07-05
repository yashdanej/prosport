import { FiGrid } from "react-icons/fi";
import { Btn, H5, H6, Image, LI, P, UL } from '../../../../AbstractElements'
import { FREE, PricingPlan, Selected, TrialVersion } from '../../../../utils/Constant'
import { dynamicImage } from '../../../../Service'
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Card } from "reactstrap";

const PricingPlans = () => {
  return (
    <Card>
      <CommonCardHeader title="How To Use" />
      <div className="pricing-plan">
        <H6>You cannot generate codes.</H6>
        <H5>CODE: <b>zjUfb1</b></H5>
        <P>Contact us to generate more referrals link.</P>
        <Btn size="xs" color="primary" outline>Copy</Btn>
        <Image className="bg-img" src={dynamicImage('dashboard/folder.png')} alt="dashboard"/>
      </div>
    </Card>
  )
}

export default PricingPlans