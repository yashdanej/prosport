import { Container, Row } from 'reactstrap'
import SimpleTabs from './SimpleTabs/SimpleTabs'
import IconsWithTabs from './IconsWithTabs/IconsWithTabs'
import VerticalTabs from './VerticalTabs/VerticalTabs'
import PillsTabs from './PillsTabs/PillsTabs'
import JustifyTabs from './JustifyTabs/JustifyTabs'
import MaterialStyleLeftTabs from './MaterialStyleLeftTabs/MaterialStyleLeftTabs'
import MaterialStyleTabs from './MaterialStyleTabs/MaterialStyleTabs'
import BorderTabs from './BorderTabs/BorderTabs'

const BootstrapTabsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <SimpleTabs />
        <IconsWithTabs />
        <VerticalTabs />
        <PillsTabs />
        <JustifyTabs />
        <MaterialStyleLeftTabs />
        <MaterialStyleTabs />
        <BorderTabs />
      </Row>
    </Container>
  )
}

export default BootstrapTabsContainer