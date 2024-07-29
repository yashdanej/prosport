import { Card, Container, Input, Row } from 'reactstrap'
import Article from './Article/Article'
import Questions from './Questions/Questions'
import FAQFeaturesTutorial from './FAQFeaturesTutorial/FAQFeaturesTutorial'
import ArticleVideo from './ArticleVideo/ArticleVideo'
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H4, P } from '../../../AbstractElements'
import { Search } from 'react-feather'
import SearchInput from '../../Application/SearchResult/SearchInput/SearchInput'

const FaqContainer = () => {
  return (
    <Container fluid>
      <div className="search-page faq-wrap">
        <Row>
          {/* <Article /> */}
          <Card>
            <CommonCardHeader title="Support" />
            <div className='mx-4 my-4'>
              <H4>How can we help?</H4>
              <P>You can search for anything you need help with.</P>
            </div>
            <SearchInput />
          </Card>
          <Questions />
          {/* <FAQFeaturesTutorial /> */}
          {/* <ArticleVideo /> */}
        </Row>
      </div>
    </Container>
  )
}

export default FaqContainer