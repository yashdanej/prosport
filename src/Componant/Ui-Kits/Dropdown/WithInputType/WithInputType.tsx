import { useState } from 'react'
import { ButtonGroup, Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { Inputs, WithInputTypes } from '../../../../utils/Constant';
import { withInputData } from '../../../../Data/Ui-Kits/Dropdown/Dropdown';
import { LI } from '../../../../AbstractElements';

const WithInputType = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={WithInputTypes} span={withInputData} />
        <CardBody className="rtl-dropdown">
          <div className="common-flex">
            <ButtonGroup>
              <Dropdown isOpen={open} toggle={toggle}>
                <DropdownToggle caret color="warning" className="text-white">{Inputs}</DropdownToggle>
                <DropdownMenu className="dropdown-block dropdown-wrapper dark-input-type">
                  <LI>
                    <InputGroup className="rounded-0 border-0 shadow-none">
                      <InputGroupText>
                        <Input className="mt-0" type="checkbox" value="" />
                      </InputGroupText>
                      <span>Default checkbox</span>
                    </InputGroup>
                    <InputGroup className="rounded-0 border-0 shadow-none">
                      <InputGroupText>
                        <Input className="mt-0" type="radio" value="" />
                      </InputGroupText>
                      <span>Default radio</span>
                    </InputGroup>
                  </LI>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithInputType