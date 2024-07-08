import { Link } from 'react-router-dom'
import { addProjectsAndUploadData } from '../../../../../Data/Application/Users/UsersProfile/UsersProfile'
import { Delete, Edit, Href, Update } from '../../../../../utils/Constant'
import { Btn } from '../../../../../AbstractElements'
import { Input, Label } from 'reactstrap'

const AddProjectsAndUploadTableBody = () => {
  return (
    <tbody>
      {addProjectsAndUploadData.map((data, index) => (
        <tr key={index}>
          <td>
            <Link className="text-inherit" to={Href}>
              <p className='lh-1 mb-0'>{data.title}</p>
              <span className='fw-light' style={{fontSize: "13px"}}>{data.subTitle}</span>
            </Link>
          </td>
          <td>
            <div className="form-check form-switch">
              <Input style={{fontSize: "20px"}} id="flexSwitchCheckChecked" type="switch" defaultChecked />
              <Label for='flexSwitchCheckChecked' check>
              </Label>
            </div>
          </td>
          {/* <td>{data.price}</td>
          <td className="text-end">
            <Btn size='sm' color='primary' href={Href}>
              <i className="fa fa-pencil" /> {Edit}
            </Btn>
            <Btn size='sm' color='transparent' href={Href}>
              <i className="fa fa-link" /> {Update}
            </Btn>
            <Btn size='sm' color='danger' href={Href}>
              <i className="fa fa-trash" /> {Delete}
            </Btn>
          </td> */}
        </tr>
      ))}
    </tbody>
  )
}

export default AddProjectsAndUploadTableBody