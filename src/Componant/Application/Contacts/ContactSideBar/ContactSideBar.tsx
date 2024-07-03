import { Btn, H4, Image, P } from '../../../../AbstractElements'
import { Card, CardBody } from 'reactstrap'
import { dynamicImage } from '../../../../Service'
import { useAppDispatch, useAppSelector } from '../../../../ReduxToolkit/Hooks';
import { setContactFilter } from '../../../../ReduxToolkit/Reducers/ContactSlice';
import { ContactSidebarCallbackProp } from '../../../../Types/Application/Contacts';
import { ContactFilter } from '../../../../utils/Constant';
import NavComponent from './NavComponent';

const ContactSideBar = ({ callback }: ContactSidebarCallbackProp) => {
  const { contactFilter } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();
  return (
    <div className="md-sidebar">
      <Btn
        color="primary"
        className="md-sidebar-toggle"
        onClick={() => dispatch(setContactFilter())}
      >
        {ContactFilter}
      </Btn>
      <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${contactFilter ? "open" : ""}`} >
        <div className="email-left-aside">
          <Card>
            <CardBody>
              <div className="email-app-sidebar left-bookmark">
                <div className="d-flex">
                  <div className="media-size-email">
                    <Image className="me-3 rounded-circle" src={dynamicImage("user/user.png")} alt="users"/>
                  </div>
                  <div className="flex-grow-1">
                    <H4>{'MARK JENCO'}</H4>
                    <P>{'Markjecno@gmail.com'}</P>
                  </div>
                </div>
                <NavComponent callbackActive={callback} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactSideBar