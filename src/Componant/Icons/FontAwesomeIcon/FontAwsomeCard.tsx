import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { IconsCommonProps } from '../../../Types/Icons/IconsTypes';

const FontAwsomeCard: React.FC<IconsCommonProps> = ({ iconType, title, parentCallback }) => {
    const getITag = (tag: string) => {
        parentCallback(tag);
      };
      
      return (
        <Card>
          <CommonCardHeader title={title} />
          <CardBody>
            <Row className="icon-lists">
              {iconType.map((icon, i) => {
                return (
                  <Col sm="6" md="4" xl="3" key={i} onClick={() => getITag(icon)}>
                    <i className={`fa fa-${icon}`}></i> {"fa fa-"}
                    {icon}
                  </Col>
                );
              })}
            </Row>
          </CardBody>
        </Card>
      );
}

export default FontAwsomeCard