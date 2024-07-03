import { H4, Image, P } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'
import { MoreVertical } from 'react-feather'
import { TimelineDataType } from '../../../../../Types/Application/SocialApp/SocialApp'

const NewUsersSocial = ({data} : TimelineDataType) => {
  return (
    <div className="new-users-social">
      <div className='d-flex'>
        <Image className="rounded-circle image-radius m-r-15" src={dynamicImage("user/1.jpg")} alt="user121"/>
        <div className='flex-grow-1'>
          <H4 className="mb-0 f-w-700">{data.name}</H4>
          <P>{data.date}</P>
        </div>
        <span className="pull-right mt-0">
          <MoreVertical />
        </span>
      </div>
    </div>
  )
}

export default NewUsersSocial