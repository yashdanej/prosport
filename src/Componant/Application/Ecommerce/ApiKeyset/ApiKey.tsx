import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { Btn, H4 } from '../../../../AbstractElements';
import DataTable from 'react-data-table-component';
import { MoreVertical } from 'react-feather';

const ApiKey = () => {
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

  const apiHistoryData = [
    {
      categories: "/assets/images/avtar/football.png",
      secret_key: "Ladies side bag",
      accesss_key: "Processing",
      token_expires: "M",
      status: "Black",
      icon: <MoreVertical />,
    }
  ];

  const apiHistoryDataColumn = [
    {
      name: "Categories",
      cell: (row: { categories: string | undefined; }) => <img src={row.categories} alt="Category" style={{ width: '50px', height: '50px' }} />,
      center: true,
    },
    {
      name: "Secret Key",
      selector: (row: { secret_key: any; }) => row.secret_key,
      sortable: true,
      center: true,
    },
    {
      name: "Access Key",
      selector: (row: { accesss_key: any; }) => row.accesss_key,
      sortable: true,
      center: true,
    },
    {
      name: "Token Expires",
      selector: (row: { token_expires: any; }) => row.token_expires,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row: { status: any; }) => row.status,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: { icon: any; }) => row.icon,
      center: true,
    },
  ];

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
              <DataTable
                data={apiHistoryData}
                columns={apiHistoryDataColumn}
                className="dataTables_wrapper theme-scrollbar no-footer"
                highlightOnHover
                noHeader
                pagination
                paginationServer
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ApiKey;
