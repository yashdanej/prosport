import { useState } from 'react';
import { Col, InputGroup, Row } from 'reactstrap';
import DatePicker, { DateObject } from 'react-multi-date-picker';

interface MyDatePickerProps {
  onDateChange: (from: string, to: string) => void;
}

const MyDatePicker = ({ onDateChange }: MyDatePickerProps) => {
  const [value, setValue] = useState<DateObject[]>([new DateObject(), new DateObject()]);

  const handleDateChange = (dates: DateObject[]) => {
    console.log("Received dates:", dates);
    if (dates.length === 2) {
      setValue(dates);
      const from = dates[0]?.format('YYYY-MM-DD');
      const to = dates[1]?.format('YYYY-MM-DD');
      onDateChange(from, to);
    } else {
      console.error("Invalid dates array", dates);
    }
  }

  return (
    <Row>
      <Col xxl="9" className="box-col-12">
        <InputGroup className="flatpicker-calender">
          <DatePicker 
            inputClass="form-control" 
            range 
            value={value} 
            onChange={handleDateChange} 
          />
        </InputGroup>
      </Col>
    </Row>
  );
}

export default MyDatePicker;
