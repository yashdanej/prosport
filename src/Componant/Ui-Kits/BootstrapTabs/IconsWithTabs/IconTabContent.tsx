import React from 'react'
import { Input, Label, TabContent, TabPane } from 'reactstrap'
import { Image, LI, P, UL } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { EmailAddress } from '../../../../utils/Constant'
import { TabContentProp } from '../../../../Types/Ui-Kits/UiKitsTypes'

const IconTabContent:React.FC<TabContentProp> = ({basicTab}) => {
  return (
    <TabContent activeTab={basicTab}>
      <TabPane tabId="1">
        <P className="pt-3"> Not limited to any states, boundaries. All over India providing cutting-edge design and website development services for over 12 years. We provide end to end digital solutions, right from designing your website/application development: Domain, Web Hosting, Email Hosting Registration, Search Engine Optimization and other Internet Marketing, Renewal of Services timely and effectively.</P>
      </TabPane>
      <TabPane tabId="2">
        <div className="pt-3 mb-0">
          <div className="flex-space flex-wrap align-items-center">
            <Image className="tab-img" src={dynamicImage(`avtar/7.jpg`)} alt="profile"/>
            <UL className="d-flex flex-column gap-1 simple-list">
              <LI><strong>Visit Us:  </strong> 278 Green Avenue Oakland, CA 94612</LI>
              <LI><strong>Mail Us:</strong> MichaelMMcGowan@teleworm.us</LI>
              <LI><strong>Contact Number: </strong> 510-767-0025</LI>
            </UL>
          </div>
        </div>
      </TabPane>
      <TabPane tabId="3">
        <div>
          <P className="pt-3">Us Technology offers web &amp; mobile development solutions for all industry verticals.Include a short form using fields that'll help your business understand who's contacting them. </P>
          <Label check for="exampleFormControlone">{EmailAddress}</Label>
          <Input id="exampleFormControlone" type="email" placeholder="youremail@gmail.com" />
        </div>
      </TabPane>
    </TabContent>
  )
}

export default IconTabContent