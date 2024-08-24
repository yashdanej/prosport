import React from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5, P, Progressbar } from '../../../AbstractElements';
import { useSelector } from 'react-redux';
import { RootState } from '../../../ReduxToolkit/Store';
import { dynamicImage } from '../../../Service';

const TopApis = () => {
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
          title={"Top API’s"}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
          {
            dashData?.data?.mostApiEndpointHits.length > 0 ? (
              dashData?.data?.mostApiEndpointHits?.slice(0, 4).map((item: any, i: number) => {
                return (
                  <CardBody className={`py-2 active-members px-0 pb-0 my-2 ${i+1===5&&'pb-3'}`}>
                    <div className="px-4" style={{display: "flex", alignItems: 'center'}}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px dashed #DEE2E6'}}>
                        <div style={{width: '70%', display: 'flex', alignItems: 'center'}}>
                            <div>
                                <img style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} src={`${item?.image ? item?.image : dynamicImage('avtar/football.png')}`} alt="" />
                            </div>
                            <P>{item.name}</P>
                        </div>
                        <div style={{width: '30%'}} className="px-3">
                          <div style={{width: '100%'}} className='project-status'>
                            <div className='d-flex mb-0'>
                              {/* <P>{item.name}</P> */}
                              <div className='text-end flex-grow-1'>
                                <span>{item.count} <span style={{color: 'gray', fontSize: '12px'}}>({item.percentage}%)</span></span>
                              </div>
                            </div>
                            <Progressbar animated={true} color={'success'} value={item.percentage} style={{ height: '5px' }} />
                          </div>
                          {/* <h1 style={{fontSize: '3rem', color: '#CED4DA'}}>{i+1}</h1> */}
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

export default TopApis
