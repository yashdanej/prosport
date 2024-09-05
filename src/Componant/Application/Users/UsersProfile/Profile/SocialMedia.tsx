import { Link } from 'react-router-dom'
import { LI, P, UL } from '../../../../../AbstractElements'
import { tourProfileData } from '../../../../../Data/Application/Users/UsersProfile/UsersProfile'

const SocialMedia = ({active, setActive}: any) => {
  const tabs = ['overview', 'security', 'billing-statements', 'referrals', 'documents', 'api_keys', 'logs'];
  return (
    <div className="social-media" >
      <UL className="list-inline simple-list flex-row flex-wrap">
        {tabs.map((item, index) => (
          <LI onClick={() => setActive(item)} className="list-inline-item flex-wrap" key={index}>
              <p style={{color: active===item?'red':''}} className='mx-3 pointer'>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
          </LI>
        ))}
      </UL>
    </div>
  )
}

export default SocialMedia