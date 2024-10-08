import { Card, CardBody, Col, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ActiveMember } from "../../../../utils/Constant";
import ActiveMembersTableBody from "./ActiveMembersTableBody";
import { dynamicImage } from "../../../../Service";
import { H4, H5, H6, P } from "../../../../AbstractElements";
import { RootState } from "../../../../ReduxToolkit/Store";
import { useSelector } from "react-redux";

const ActiveMembers = () => {
  const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);
  return (
    <Col
      xxl="3"
      xl="3"
      md="7"
      className="box-col-5 proorder-xl-10 proorder-md-4"
    >
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={"Top Operator"}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
          {
            dashData?.data?.usersWithApiHits.length > 0 ? (
              dashData?.data?.usersWithApiHits.slice(0, 3)?.map((item: any, i: number) => {
                return (
                  <CardBody className={`active-members px-0 pb-0 ${i+1 === 3 && 'mb-5'}`}>
                    <div className="px-4" style={{display: "flex", alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', border: '1px dashed #DEE2E6'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <img style={{width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover'}} src={`${item?.image ? item?.image : dynamicImage('avtar/football.png')}`} alt="" />
                          <div className="mx-1">
                            <H5>{item?.name} {item?.lastname && item?.lastname}</H5>
                            <p style={{lineHeight: '15px'}}>{item?.apiHits}</p>
                          </div>
                        </div>
                        <div className="px-3">
                          <h1 style={{fontSize: '3rem', color: '#CED4DA'}}>{i+1}</h1>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                )
              })
            ):"No Operator"
          }
      </Card>
    </Col>
  );
};

export default ActiveMembers;