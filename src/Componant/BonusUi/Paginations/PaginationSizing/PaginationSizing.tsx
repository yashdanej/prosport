import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { PaginationSizings } from "../../../../utils/Constant";
import { sizingPaginationData } from "../../../../Data/BonusUi/Pagination/Pagination";
import StaticPaginationSizing from "./StaticPaginationSizing/StaticPaginationSizing";
import DynamicPaginationSizing from "./DynamicPaginationSizing/DynamicPaginationSizing";

const PaginationSizing = () => {
  return (
    <Col md="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={PaginationSizings}
          span={sizingPaginationData}
        />
        <CardBody className="pb-4">
          <StaticPaginationSizing />
          <DynamicPaginationSizing />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaginationSizing;
