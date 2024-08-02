import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Btn, H4 } from '../../../AbstractElements';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../ReduxToolkit/Store';
import { getApiKeys, getSubscribe } from '../../../ReduxToolkit/Reducers/Change/Subscribe';

const ShopContent = () => {
  const apiKeysData = useSelector((state: RootState) => state.subscribe.api_keys);
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const plansData = useSelector((state: RootState) => state.subscribe.plans);

  console.log("apiKeysData", apiKeysData?.data); // Ensure apiKeysData is not null

  const apiData = [
    {
      title: "Shop",
      desc: "This is the description for the shop. It includes all the details about what the shop offers, the types of products available, and any other relevant information.",
      btn: "Comming Soon"
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  const fetchApiKeys = () => {
    dispatch(getApiKeys());
  }

  useEffect(() => {
    fetchApiKeys();
  }, [dispatch]);
  const fetchPlans = () => {
    dispatch(getSubscribe());
  }

  useEffect(() => {
    fetchPlans();
  }, [dispatch]);
  return (
    <>
      <Card>
        <CommonCardHeader title="Shop Widget" />
        <CardBody className="pricing-block">
          <Row>
            {apiData.map((item, index) => (
              <Col lg="12" sm="12" className="box-col-3" key={index}>
                <div className="pricingtable">
                  <div className="pricingtable-header">
                    <H4 className="title">{item.title}</H4>
                  </div>
                  <p className="duration">{item.desc}</p>
                  <div className="pricingtable-signup">
                    <Btn tag="a" size="lg" color="primary" href="#">{item.btn}</Btn>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default ShopContent;
