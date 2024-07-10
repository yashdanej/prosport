import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Btn, H4 } from '../../../../AbstractElements';
import DataTable, { TableColumn } from 'react-data-table-component';
import { MoreVertical } from 'react-feather';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getApiKeys, getSubscribe } from '../../../../ReduxToolkit/Reducers/Change/Subscribe';
import { convertToIST } from '../../../../Utils';

type ApiKeyData = {
  id: number;
  sport_id: number | null;
  user_id: number;
  planId: number;
  start_date: string;
  expire_date: string;
  token: string;
  api_hits: number | null;
  status: number;
  created_at: string;
  updated_at: string | null;
};

const ApiKey = () => {
  const apiKeysData = useSelector((state: RootState) => state.subscribe.api_keys);
  const userData = localStorage.getItem("login-user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const plansData = useSelector((state: RootState) => state.subscribe.plans);

  console.log("apiKeysData", apiKeysData?.data); // Ensure apiKeysData is not null

  const apiData = [
    {
      title: "How to set API",
      desc: "Use images to enhance your post, improve its flow, add humor and explain complex topics",
      btn: "Get Started"
    },
    {
      title: "Developer Tools",
      desc: "Plan your blog post by choosing a topic, creating an outline conduct research, and checking facts",
      btn: "Create Rule"
    }
  ];

  const apiHistoryDataColumn: TableColumn<ApiKeyData>[] = [
    {
      name: "Category",
      selector: (row) => row.sport_id || 'Cricket',
      sortable: true,
      center: true,
    },
    {
      name: "Plan",
      selector: (row) => `${plansData?.data?.find((plan: any) => plan.id === row.planId)?.name}`,
      sortable: true,
      center: true,
    },
    {
      name: "Token Expiry",
      selector: (row) => convertToIST(row.expire_date).split(",")[0],
      sortable: true,
      center: true,
    },
    {
      name: "Secret Key",
      selector: (row) => parsedUserData?.user?.secretKey,
      sortable: true,
      center: true,
    },
    {
      name: "Access Keys",
      selector: (row) => row.token,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Btn className={`background-light-${row.status === 1 ? 'success' : 'danger'} font-${row.status === 1 ? 'success' : 'danger'} f-w-500`} color="">
          {row.status === 1 ? 'Active' : 'Inactive'}
        </Btn>
      ),
      sortable: true,
      center: true,
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
        <CommonCardHeader title="Api Overview" />
        <CardBody className="pricing-block">
          <Row>
            {apiData.map((item, index) => (
              <Col lg="6" sm="6" className="box-col-3" key={index}>
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
      <Col sm="12">
        <Card>
          <CommonCardHeader title="API Keyset" />
          <CardBody>
            <div className="order-history table-responsive">
              {
                apiKeysData && apiKeysData.data && apiKeysData.data.length > 0 &&
                <DataTable
                  data={apiKeysData.data}
                  columns={apiHistoryDataColumn}
                  className="dataTables_wrapper theme-scrollbar no-footer"
                  highlightOnHover
                  noHeader
                  pagination
                  paginationServer
                />
              }
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ApiKey;
