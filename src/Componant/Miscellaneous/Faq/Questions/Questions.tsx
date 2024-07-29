import { Card, CardBody, CardHeader, Col, Row, Collapse } from 'reactstrap';
import { Btn, H5 } from '../../../../AbstractElements';
import { QuickQuestions } from '../../../../utils/Constant';
import { Fragment, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'react-feather';
import FaqRightSidebar from './FaqRightSidebar';

const Questions = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const data = [
    {
      id: 1,
      title: "Integrating WordPress with Your Website?",
      paragraph: "How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.",
    },
    {
      id: 2,
      title: "WordPress Site Maintenance ?",
      paragraph: "We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.",
    },
    {
      id: 3,
      title: "Meta Tags in WordPress ?",
      paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
    },
    {
      id: 4,
      title: "WordPress in Your Language ?",
      paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
    },
    {
      id: 5,
      title: "Meta Tags in WordPress ?",
      paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
    },
    {
      id: 6,
      title: "WordPress in Your Language ?",
      paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
    },
    {
      id: 7,
      title: "WordPress in Your Language ?",
      paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
    },
    {
      id: 8,
      title: "Meta Tags in WordPress ?",
      paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
    },
    {
      id: 9,
      title: "WordPress in Your Language ?",
      paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
    },
  ];

  return (
    <Col lg="12">
      <div className="header-faq">
        <H5 className="mb-0">{QuickQuestions}</H5>
      </div>
      <Row className="default-according style-1 faq-accordion">
          {data.map((item) => (
            <Col xl="4" lg="6" md="7" className="xl-60 my-2">
                <Card key={item.id} className="shadow-none">
                  <CardHeader>
                    <H5 className="mb-0">
                      <Btn tag="a" color="transparent" className="btn-link collapsed ps-0 justify-content-between" onClick={() => toggleQuestion(item.id)}>
                        <span className="d-flex align-items-center gap-2">
                          <HelpCircle />
                          {item.title}
                        </span>
                        {activeQuestion === item.id ? <ChevronDown className="position-relative inset-0 m-0" /> : <ChevronUp className="position-relative inset-0 m-0" />}
                      </Btn>
                    </H5>
                  </CardHeader>
                  <Collapse isOpen={activeQuestion === item.id}>
                    <CardBody>{item.paragraph}</CardBody>
                  </Collapse>
                </Card>
            </Col>
          ))}
        {/* <FaqRightSidebar /> */}
      </Row>
    </Col>
  );
};

export default Questions;
