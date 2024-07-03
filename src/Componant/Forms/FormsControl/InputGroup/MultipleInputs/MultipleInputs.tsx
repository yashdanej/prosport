import { Card, CardBody, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { FirstAndLastName, MultipleInput } from "../../../../../utils/Constant";
import { multipleInputData } from "../../../../../Data/Forms/FormsControl/InputGroup/InputGroup";

const MultipleInputs = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={MultipleInput} span={multipleInputData} />
        <CardBody className="common-flex main-custom-form card-wrapper">
          <InputGroup>
            <InputGroupText>{FirstAndLastName}</InputGroupText>
            <Input type="text" />
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <InputGroupText>{"$"}</InputGroupText>
            <InputGroupText>{"0.00"}</InputGroupText>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <Input type="text" />
            <InputGroupText>{"$"}</InputGroupText>
            <InputGroupText>{"0.00"}</InputGroupText>
          </InputGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MultipleInputs;
