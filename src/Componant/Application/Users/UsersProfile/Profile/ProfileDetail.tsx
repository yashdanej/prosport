import { Row } from 'reactstrap'
import ProfileMail from './ProfileMail'
import ProfileName from './ProfileName'
import ProfileContact from './ProfileContact'
import SocialMedia from './SocialMedia'
import ProfileFollower from './ProfileFollower'
import { useState } from 'react'
import { P } from '../../../../../AbstractElements'

const ProfileDetail = ({active, setActive}: any) => {
  
  return (
    <div className="info">
      <Row className="g-3 step3">
        <ProfileMail />
        <ProfileName />
        <ProfileContact />
      </Row>
      <hr />
      <SocialMedia active={active} setActive={setActive} />
      {/* <ProfileFollower /> */}
    </div>
  )
}

export default ProfileDetail