import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import { Btn, LI, UL } from '../../../../AbstractElements';
import { FileFilter } from '../../../../utils/Constant';
import { sideButtons } from '../../../../Data/Application/FileSideBar/FileSideBar';
import StoragePlan from '../../FileManager/FileSideBar/StoragePlan';
import PricingPlans from '../../FileManager/FileSideBar/PricingPlans';

const RefferSideBar = () => {
    const [IsOpen, setIsOpen] = useState(false);
    const OnHandelClick = () => {
      setIsOpen(!IsOpen);
    };
    return (
      <Col xl="3" className="box-col-3">
        <div className="md-sidebar">
          <Btn color="primary" className="md-sidebar-toggle" onClick={OnHandelClick}>
            {FileFilter}
          </Btn>
          <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${IsOpen ? "open" : ""}`}>
            <div className="file-sidebar">
              <Card>
                <CardBody>
                  <PricingPlans />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </Col>
    );
}

export default RefferSideBar