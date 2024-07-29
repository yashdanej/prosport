import { Col, Container, Row } from 'reactstrap'
import NewOrders from './NewOrders'
import ShippedOrders from './ShippedOrders'
import CancelledOrders from './CancelledOrders'
import DataTableOrderHistory from './DataTableOrderHistory'
import BillingCard from './BillingCard'
import ProjectsTable from '../../../Dashboard/Default/ProjectsTable/ProjectsTable'

const OrderHistoryContainer = () => {
  return (
    <Container fluid className='default-dashboard'>
      <Row>
        <Col sm="12">
          <BillingCard />
          <ProjectsTable />
          {/* <NewOrders />
          <ShippedOrders />
          <CancelledOrders /> */}
          {/* <DataTableOrderHistory /> */}
        </Col>
      </Row>
    </Container>
  )
}

export default OrderHistoryContainer