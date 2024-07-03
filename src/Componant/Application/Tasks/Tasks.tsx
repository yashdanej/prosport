import { Container, Row } from 'reactstrap'
import NavClass from './NavClass/NavClass'
import { useAppDispatch } from '../../../ReduxToolkit/Hooks';
import { setActiveTab } from '../../../ReduxToolkit/Reducers/TasksSlice';
import TabClass from './TabClass/TabClass';

const TasksContainer = () => {
  const dispatch = useAppDispatch()
  const activeToggle = (tab: string) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <Container fluid>
      <div className="email-wrap bookmark-wrap tasks-items">
        <Row>
          <NavClass activeToggle={activeToggle} />
          <TabClass />
        </Row>
      </div>
    </Container>
  )
}

export default TasksContainer