import SweetAlert from "sweetalert2";
import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { LoginSuccessfully, SuccessMessages } from "../../../../utils/Constant";
import { successMassageData } from "../../../../Data/BonusUi/SweetAlert/SweetAlert";
import { Btn } from "../../../../AbstractElements";

const SuccessMessage = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      icon: "success",
      title: "Good job!",
      text: "You clicked the button!",
      confirmButtonColor: "var(--theme-deafult)",
    });
  };

  return (
    <Col xxl="3" lg="4" sm="6" xs="12">
      <Card className="height-equal">
        <CardHeaderCommon title={SuccessMessages} span={successMassageData} />
        <CardBody className="btn-showcase">
          <Btn
            color="success"
            className="sweet-8"
            type="button"
            onClick={displayAlert}
          >
            {LoginSuccessfully}
          </Btn>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SuccessMessage;
