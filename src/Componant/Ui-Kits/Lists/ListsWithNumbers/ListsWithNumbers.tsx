import { Card, CardBody, Col} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { ListsWithNumber } from "../../../../utils/Constant";
import { listNumberData, listNumberDataList } from "../../../../Data/Ui-Kits/Lists/Lists";
import { LI, OL } from "../../../../AbstractElements";

const ListsWithNumbers = () => {
  return (
    <Col xxl="4" sm="12">
      <Card>
        <CardHeaderCommon title={ListsWithNumber} span={listNumberData} />
        <CardBody>
          <OL className="list-group list-group-numbered list-content list-content">
            <LI className="txt-primary fw-bold">
              Known for delivery of useful and usable solutions
            </LI>
            {listNumberDataList.map(({ color, text }, index) => (
              <LI className={`txt-${color} fw-bold`} key={index}>
                {text}
              </LI>
            ))}
          </OL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ListsWithNumbers;
