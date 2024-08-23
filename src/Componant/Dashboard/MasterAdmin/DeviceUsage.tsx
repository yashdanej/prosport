import React from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5 } from '../../../AbstractElements';
import { useSelector } from 'react-redux';
import { RootState } from '../../../ReduxToolkit/Store';
import { dynamicImage } from '../../../Service';

const DeviceUsage = () => {
  const dashData = useSelector((state: RootState) => state.masterDashboard.masterDashboard);
  return (
    <Col
      xxl="6"
      xl="6"
      md="12"
      className="box-col-5 proorder-xl-10 proorder-md-4"
    >
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={"Device Usage"}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
            <CardBody className={`d-flex active-members px-0 pb-0`}>
            {
                dashData?.data?.deviceUsage.length > 0 ? (
                dashData?.data?.deviceUsage?.map((item: any, i: number) => {
                    return (
                        <>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${item?.percentage}vw`, background: item?.device.split(",")[1], height: '200px'}}>
                                {item?.percentage}
                            </div>
                        </>
                    )
                })
                ):"No Operator"
            }
            </CardBody>
      </Card>
    </Col>
  )
}

export default DeviceUsage
