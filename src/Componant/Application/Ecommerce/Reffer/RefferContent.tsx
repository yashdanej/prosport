import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { H4, H5 } from '../../../../AbstractElements';
import { useDispatch, useSelector } from 'react-redux';
import { getRefferer } from '../../../../ReduxToolkit/Reducers/Change/AuthSlice';
import { getCommission } from '../../../../ReduxToolkit/Reducers/Change/Subscribe';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import ContentLoaderReffer from './ContentLoaderReffer';
import RefferSideBar from './RefferSideBar';

const RefferContent = () => {
  const commissionData = useSelector((state: RootState) => state.subscribe.commission);
  const reffererData = useSelector((state: RootState) => state.auth.refferer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRefferer());
    dispatch(getCommission());
  }, [dispatch]);

  return (
    <Card>
      <CommonCardHeader title="Referral Program" />
      <CardBody className="pricing-block">
        <p>Track and find all the details about our referral program, your stats and revenues.</p>
        <Row>
          {commissionData.isLoading ? (
            <Col lg="3" sm="6" className="box-col-3">
              <ContentLoaderReffer />
            </Col>
          ) : (
            <Col lg="3" sm="6" className="box-col-3">
              <div className="pricingtable" style={{height: 'unset'}}>
                <div className="pricingtable-header">
                  <H4 className="title">Earning</H4>
                </div>
                <H5 className="title">₹{commissionData.data?.totalCommission || 0}</H5>
              </div>
            </Col>
          )}
          {reffererData.isLoading ? (
            <Col lg="3" sm="6" className="box-col-3">
              <ContentLoaderReffer />
            </Col>
          ) : (
            <Col lg="3" sm="6" className="box-col-3">
              <div className="pricingtable" style={{height: 'unset'}}>
                <div className="pricingtable-header">
                  <H4 className="title">Reference</H4>
                </div>
                <H5 className="title">{reffererData.data?.length || 0}</H5>
              </div>
            </Col>
          )}
          <RefferSideBar />
        </Row>
      </CardBody>
    </Card>
  );
};

export default RefferContent;
