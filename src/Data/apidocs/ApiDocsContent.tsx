import React from 'react'
import { Card, Col, Row, Container, CardBody } from 'reactstrap'
import SearchInput from '../../Componant/Application/SearchResult/SearchInput/SearchInput'
import CommonCardHeader from '../../CommonElements/CommonCardHeader/CommonCardHeader'
import { Btn, H1, H3, H4, P } from '../../AbstractElements'
import './apidocscontent.css'

const ApiDocsContent = () => {
  return (
    <Container fluid className="search-page">
    <Row>
        <Col sm="12">
        <Card>
            <CommonCardHeader title="API Doc" />
            <CardBody>
                <div style={{textAlign: "center"}}>
                    <H4>Welcome to the API Library</H4>
                    <P className='my-3'>The API Library has documentation, links, and a smart search experience.</P>
                </div>
                <SearchInput />
                <Row className='my-5'>
                    {
                        Array.from({ length: 9 }).map((_, index) => (
                            <Col lg="4" sm="6" className="box-col-3 my-3" key={index}>
                              <div className="pricingtable p-5" style={{ width: "87%" }}>
                                <div className="price-value mb-3" style={{ background: "#f4f4fc", borderRadius: "0", width: '75px', height: '75px' }}>
                                  <span className="amount" style={{ fontSize: "1.8rem" }}></span>
                                </div>
                                <H4>JavaScript</H4>
                                <P>Everything you need to develop advanced JavaScript applications is here.</P>
                              </div>
                            </Col>
                        ))
                    }
                </Row>
            </CardBody>
        </Card>
        </Col>
    </Row>
    </Container>
  )
}

export default ApiDocsContent
