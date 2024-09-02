import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
import DataTable, { TableColumn } from "react-data-table-component";
import ProductListFilterHeader from '../../../Componant/Application/Ecommerce/ProductList/ProductListFilterHeader';
import CollapseFilterData from '../../../Componant/Application/Ecommerce/ProductList/CollapseFilterData';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Btn, H4, LI, P, UL } from '../../../AbstractElements';
import { AppDispatch, RootState } from '../../../ReduxToolkit/Store';
import AllUserProductListFilterHeader from './MasterAdminPlansProductListFilterHeader';
import AllUsersCollapseFilterData from './MasterAdminPlansCollapseFilterData';
import UsersInvoiceProductListFilterHeader from './MasterAdminPlansProductListFilterHeader';
import UsersInvoiceCollapseFilterData from './MasterAdminPlansCollapseFilterData';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Link, useNavigate } from 'react-router-dom';
import { deleteMasterAdminPlanData, editMasterAdminPlanData } from '../../../ReduxToolkit/Reducers/Change/ApiLogsSlice';
import BottomRightToast from '../../../Componant/BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast';

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
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleDeletePlan = async (id: number) => {
    try {
      const res: any = await dispatch(deleteMasterAdminPlanData(id)).unwrap();
      console.log("res on dis", res);
      setTxt(`${res.data.message}`);
      setShowToast(true);
    } catch (error) {
      console.log("res on dis err", error);
      setTxt(`${error}`);
      setShowToast(true);
    }
  }
  const handleEditPlan = async (id: number) => {
    try {
      const res: any = await dispatch(editMasterAdminPlanData(id)).unwrap();
      console.log("res on dis", res);
      setTxt(`${res.data.message}`);
      setShowToast(true);
      navigate('/masteradmin/plan/edit')
    } catch (error) {
      console.log("res on dis err", error);
      setTxt(`${error}`);
      setShowToast(true);
    }
  }
  return (
    <Container className='my-5' fluid>
      <div className='mb-2' style={{display: 'flex', justifyContent: 'end'}}>
        {/* <Btn className='mx-2' tag="a" size="lg" color="primary">Edit Plan</Btn> */}
        <Link to={`${process.env.PUBLIC_URL}/masteradmin/plan/add`}><Btn tag="a" size="lg" color="primary">Add Plan</Btn></Link>
      </div>
      <Row>
        <Col sm="12">
            <Card>
              <CommonCardHeader title="Our Packages" />
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
                            <Btn onClick={() => handleEditPlan(item.id)} className='mx-3' tag="a" color="primary">Edit</Btn>
                            <Btn tag="a" onClick={() => handleDeletePlan(item.id)} color="danger">Delete</Btn>
                          </div>
                        </div>
                      </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
        </Col>
      </Row>
      {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
    </Container>
  );
}

export default MasterAdminPlansTable;
