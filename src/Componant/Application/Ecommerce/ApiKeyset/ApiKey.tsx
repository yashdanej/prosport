import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Btn, H4 } from '../../../../AbstractElements';
import DataTable, { TableColumn } from 'react-data-table-component';
import { MoreVertical } from 'react-feather';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getApiKeys } from '../../../../ReduxToolkit/Reducers/Change/Subscribe';

type ApiKeyData = {
  id: number;
  sport_id: number | null;
  user_id: number;
  plan_id: number;
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
      name: "Sport ID",
      selector: (row) => row.sport_id || 'N/A',
      sortable: true,
      center: true,
    },
    {
      name: "User ID",
      selector: (row) => row.user_id,
      sortable: true,
      center: true,
    },
    {
      name: "Plan ID",
      selector: (row) => row.plan_id,
      sortable: true,
      center: true,
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.start_date).toLocaleDateString(),
      sortable: true,
      center: true,
    },
    {
      name: "Expire Date",
      selector: (row) => new Date(row.expire_date).toLocaleDateString(),
      sortable: true,
      center: true,
    },
    {
      name: "Token",
      selector: (row) => row.token,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status.toString(),
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: () => <MoreVertical />,
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
