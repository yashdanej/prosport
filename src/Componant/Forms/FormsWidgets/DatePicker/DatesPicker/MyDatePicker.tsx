import { useState } from 'react';
import { Col, InputGroup, Label, Row } from 'reactstrap';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { RangeDatePicker } from '../../../../../utils/Constant';

const MyDatePicker = () => {
  const [value, setValue] = useState<DateObject[]>([new DateObject(), new DateObject()]);

  return (
    <Row>
      <Col xxl="3">
        <Label className="box-col-12 text-start" check>{RangeDatePicker}</Label>
      </Col>
      <Col xxl="9" className="box-col-12">
        <InputGroup className="flatpicker-calender">
          <DatePicker 
            inputClass="form-control" 
            range 
            value={value} 
            onChange={setValue} 
          />
        </InputGroup>
      </Col>
    </Row>
  );
}

export default MyDatePicker;
