import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { TopBorder } from "../../../../utils/Constant";
import { P } from "../../../../AbstractElements";
import { borderTopData } from "../../../../Data/BonusUi/CreativeCard/CreativeCard";

const BorderTop = () => {
  const BorderTopText1 =
    "Tabs have long been used to show alternative views of the same group of information tabs in software. Known as";
  const BorderTopTextEm = "“module tabs”";
  const BorderTopText2 =
    " , these are still used today in web sites. For instance, airline companies such as Ryanair, easyJet and AirMalta use module tabs to enable the user to switch between bookings for flights, hotels and car hire.";

  return (
    <Col sm="12" md="6">
      <Card className="b-t-0">
        <CardHeaderCommon headClass="border-t-danger" title={TopBorder} span={borderTopData}/>
        <CardBody>
          <P className="mb-0">
            {BorderTopText1}
            <em className="txt-danger">{BorderTopTextEm}</em>
            {BorderTopText2}
          </P>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderTop;
