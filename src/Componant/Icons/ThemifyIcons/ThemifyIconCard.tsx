import React from 'react'
import { IconsCommonProps } from '../../../Types/Icons/IconsTypes';
import { Card, CardBody, Col, Row } from 'reactstrap';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';

const ThemifyIconCard:React.FC<IconsCommonProps> = ({ iconType, title, parentCallback }) => {
    const getITag = (tag: string) => {
      parentCallback(tag);
    };
  
    return (
      <>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={title} />
            <CardBody>
              <Row className="icon-lists">
                {iconType.map((icon, i) => {
                  return (
                    <Col sm="6" lg="4" key={i} onClick={() => getITag(icon)}>
                      <i className={`${icon}`}></i> {icon}
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };

export default ThemifyIconCard