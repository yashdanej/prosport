import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../ReduxToolkit/Hooks';
import { handleEnvelope, handleInterview } from '../../../../../ReduxToolkit/Reducers/LetterBoxSlice';
import { Input, Label } from 'reactstrap';
import { Badges, P, SVG } from '../../../../../AbstractElements';
import { CommonDataType } from '../../../../../Types/Application/LetterBox/LetterBox';

const PrivateEmailContent:React.FC<CommonDataType>  = ({data,i}) => {
    const {faIcon } = useAppSelector((state) => state.letterBox);
    const [fill,setFill] = useState(false)
    const dispatch = useAppDispatch()
    const handleValue= ()=> dispatch(handleInterview(true))
    return (
      <>
        <div className="inbox-user">
          <div className="form-check form-check-inline m-0">
            <Input className={`checkbox-${data.color}`} name="emailCheckbox" id={`emailCheckbox${i}`} type="checkbox" />
            <Label check for={`emailCheckbox${i}`} />
          </div>
          <SVG className={`important-mail ${fill ? "active" : ""}`} iconId="fill-star" onClick={() => setFill(!fill)} />
          <div className="rounded-border">
            <div className={data.color === "success" ? "circle-success" : ""}>
              <P className={`txt-${data.color}`}>{data.shortName}</P>
            </div>
          </div>
          <P>{data.name}</P>
        </div>
        <div className="inbox-message">
          <div className="email-data">
            <span>
              {data.message}
              <span>{data.subMessage}</span>
            </span>
            {data.badge &&
              data.badge.map((item, i) => (
                <Badges color="" className={`badge-light-${item.color}`} key={i} onClick={handleValue}> {item.title} </Badges>
              ))}
          </div>
          <div className="email-timing">
            <span>{data.time}</span>
          </div>
          <div className="email-options">
            <i className={`fa fa-envelope-o envelope-1 ${!faIcon ? "show" : "hide"}`} onClick={() => dispatch(handleEnvelope(true))}/>
            <i className={`fa fa-envelope-open-o envelope-2 ${ faIcon ? "show" : "hide"}`} onClick={() => dispatch(handleEnvelope(false))} />
            <i className="fa fa-trash-o trash-3" />
            <i className="fa fa-print" />
          </div>
        </div>
      </>
    );
}

export default PrivateEmailContent