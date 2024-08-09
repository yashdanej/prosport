import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import { Btn, LI, UL } from '../../../../AbstractElements';
import { FileFilter } from '../../../../utils/Constant';
import { sideButtons } from '../../../../Data/Application/FileSideBar/FileSideBar';
import StoragePlan from '../../FileManager/FileSideBar/StoragePlan';
import PricingPlans from '../../FileManager/FileSideBar/PricingPlans';

const RefferSideBar = () => {
    return (
      <Col xl="4" className="box-col-3">
        <div className="md-sidebar">
          <div className={``}>
            <div className="file-sidebar">
              {/* <Card> */}
                {/* <CardBody> */}
                  <PricingPlans />
                {/* </CardBody> */}
              {/* </Card> */}
            </div>
          </div>
        </div>
      </Col>
    );
}

export default RefferSideBar