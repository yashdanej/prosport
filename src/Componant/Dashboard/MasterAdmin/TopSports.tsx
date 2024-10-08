import React from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5, P, Progressbar } from '../../../AbstractElements';
import { useSelector } from 'react-redux';
import { RootState } from '../../../ReduxToolkit/Store';
import { dynamicImage } from '../../../Service';

const TopSports = () => {
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
          title={"Top Sports"}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
          {
            dashData?.data?.apiHitsBySport.length > 0 ? (
              dashData?.data?.apiHitsBySport?.map((item: any, i: number) => {
                return (
                  <CardBody className={`py-2 active-members px-0 pb-0 ${i+1===5&&'pb-3'}`}>
                    <div className="px-4" style={{display: "flex", alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px dashed #DEE2E6'}}>
                        <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                          <div>
                            <img style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} src={`${item?.image ? item?.image : dynamicImage('avtar/football.png')}`} alt="" />
                          </div>
                          <div style={{width: '100%'}} className='project-status'>
                            <div className='d-flex mb-0'>
                              <P>{item.name}</P>
                              <div className='text-end flex-grow-1'>
                                <span>{item.percentage}%</span>
                              </div>
                            </div>
                            <Progressbar animated={true} color={'success'} value={item.percentage} style={{ height: '5px' }} />
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
  )
}

export default TopSports
