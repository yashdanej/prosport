import { Card, CardBody, Col, Row } from "reactstrap";
import { Btn, H1, H2, H4, H5, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { totalStudentData } from "../../../Data/Dashboard/EducationData";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxToolkit/Store";
import { useEffect, useState } from "react";

const MasterAdminPlansTopBar = () => {
  const maAllUsersData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.plans);
  console.log("maAllUsersData", maAllUsersData);
  const topCards = ["Cricket Plan", "Football Plan", "Basketball Plan", "Widgets Plan"];
  return (
    <>
      <Col xl="12" md="12" className="proorder-md-1">
        <Row>
          {topCards.map((data: any, i: number) => (
            <Col lg="3" sm="6" className="box-col-3">
                <div className="pricingtable" style={{height: 'unset'}}>
                  <div className="pricingtable-header">
                    <H4 className="title">{data}</H4>
                  </div>
                </div>
                {/* <div style={{height: '10rem'}} className="text-center">
                  <i style={{fontSize: '2rem'}} className="icofont icofont-bowReferral Program"></i>
                  <div className="text-center my-5">
                    <H1>{data}</H1>
                  </div>
                </div> */}
              </Col>
            ))}
        </Row>
      </Col>
    </>
  );
};

export default MasterAdminPlansTopBar;
