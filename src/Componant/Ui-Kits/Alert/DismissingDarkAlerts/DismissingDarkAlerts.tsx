import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { DismissingDarkAlert } from '../../../../utils/Constant';
import { Heart } from 'react-feather';
import { Alerts, P } from '../../../../AbstractElements';
import { dismissingDarkData } from '../../../../Data/Ui-Kits/Alert/AlertData';

const DismissingDarkAlerts = () => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeaderCommon title={DismissingDarkAlert} span={dismissingDarkData} />
        <CardBody>
          <Alerts fade color="secondary" isOpen={visible} toggle={onDismiss}>
            <Heart />
            <P>Check your update! You should check in on some of those fields below.</P>
          </Alerts>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DismissingDarkAlerts