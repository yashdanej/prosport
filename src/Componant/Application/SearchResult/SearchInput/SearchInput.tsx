import { CardHeader, Form, Input, InputGroup, InputGroupText } from 'reactstrap'
import { Pixelstrap, Search } from '../../../../utils/Constant'

const SearchInput = () => {
  return (
    <CardHeader>
      <Form className="theme-form">
        <InputGroup className=" m-0 flex-nowrap">
          <Input className="form-control-plaintext" type="search" placeholder={"Type here..."} />
          <InputGroupText className="btn btn-primary">{Search}</InputGroupText>
        </InputGroup>
      </Form>
    </CardHeader>
  )
}

export default SearchInput