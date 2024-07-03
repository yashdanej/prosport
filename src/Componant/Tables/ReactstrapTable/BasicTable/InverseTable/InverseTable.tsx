import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { InverseTables } from '../../../../../utils/Constant'
import { inverseTableBody, inverseTableData, inverseTableHead } from '../../../../../Data/Tables/ReactstrapTable/BasicTable/BasicTable'
import CommonTable from '../Common/CommonTable'

const InverseTable = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={InverseTables} span={inverseTableData} />
        <CommonTable tableClass="table-inverse" headData={inverseTableHead} headRowClass="border-bottom-light">
          {inverseTableBody.map((data) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.office}</td>
              <td>{data.position}</td>
              <td>{data.salary}</td>
              <td>{data.joinDate}</td>
              <td>{data.age}</td>
            </tr>
          ))}
        </CommonTable>
      </Card>
    </Col>
  )
}

export default InverseTable