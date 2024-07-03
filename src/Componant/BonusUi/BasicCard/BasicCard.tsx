import { Container, Row } from 'reactstrap'
import BasicCards from './BasicCards/BasicCards'
import FlatCard from './FlatCard/FlatCard'
import WithoutShadowCard from './WithoutshadowCard/WithoutshadowCard'
import IconInHeading from './IconInHeading/IconInHeading'
import DarkColorCard from './DarkColorCard/DarkColorCard'
import InfoColorHeader from './InfoColorHeader/InfoColorHeader'
import InfoColorBody from './InfoColorBody/InfoColorBody'
import InfoColorFooters from './InfoColorFooters/InfoColorFooters'

const BasicCardContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicCards />
        <FlatCard />
        <WithoutShadowCard />
        <IconInHeading />
        <DarkColorCard />
        <InfoColorHeader />
        <InfoColorBody />
        <InfoColorFooters />
      </Row>
    </Container>
  )
}

export default BasicCardContainer