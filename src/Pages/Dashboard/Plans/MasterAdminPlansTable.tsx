import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Btn, H4, LI, P, UL } from '../../../AbstractElements';
import { RootState } from '../../../ReduxToolkit/Store';
import AllUserProductListFilterHeader from './MasterAdminPlansProductListFilterHeader';
import AllUsersCollapseFilterData from './MasterAdminPlansCollapseFilterData';
import UsersInvoiceProductListFilterHeader from './MasterAdminPlansProductListFilterHeader';
import UsersInvoiceCollapseFilterData from './MasterAdminPlansCollapseFilterData';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';

export interface ProductListTableDataColumnType {
    id: string;
    name: string;
    company: boolean;
    date: string;
    status: string;
    amount: string;
}

const MasterAdminPlansTable = () => {
  const maApiLogsData = useSelector((state: RootState) => state.ApiLogs.masterAdmin.plans);

  return (
    <Container className='my-5' fluid>
      <div className='mb-2' style={{display: 'flex', justifyContent: 'end'}}>
        <Btn className='mx-2' tag="a" size="lg" color="primary">Edit Plan</Btn>
        <Btn tag="a" size="lg" color="primary">Add/Delete</Btn>
      </div>
      <Row>
        <Col sm="12">
            <Card>
              <CommonCardHeader title="Our Packagees" />
              <CardBody className="pricing-block">
                <Row>
                  {/* { plansData?.isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                      <Col lg="4" sm="6" className="box-col-3" key={index}>
                        <ContentLoaderBecomeMember />
                      </Col>
                    ))
                  ): */}
                  {
                    maApiLogsData && maApiLogsData?.data?.map((item:any, index: number) => (
                      <Col lg="4" sm="6" className="box-col-3 mb-4" key={index}>
                        <div className="pricingtable">
                          <div className="pricingtable-header">
                            <H4 className="title">{item.name}</H4>
                          </div>
                          <div className="price-value">
                            <span className="amount" style={{fontSize: "1.8rem"}}>₹{item.amount}/{item.validity.split(" ")[0]}</span>
                            <p className="duration">per days</p>
                          </div>
                          <UL className="pricing-content simple-list">
                              <LI>API calls : {item.api_call}</LI>
                              <LI>Deliver : API pull</LI>
                              <LI>Maintenance</LI>
                          </UL>
                          <div className="pricingtable-signup">
                            {/* <Btn className='mx-2' onClick={HandleSubscribe} tag="a" size="lg" color="primary">Subscribe</Btn> */}
                            <Btn tag="a" size="lg" color="primary">Active</Btn>
                          </div>
                        </div>
                      </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MasterAdminPlansTable;
