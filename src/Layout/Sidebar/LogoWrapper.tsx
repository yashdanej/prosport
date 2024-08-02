import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../ReduxToolkit/Hooks';
import { Image, SVG } from '../../AbstractElements';
import { handleResponsiveToggle, setToggleSidebar } from '../../ReduxToolkit/Reducers/LayoutSlice';
import { dynamicImage } from '../../Service';

const LogoWrapper = () => {
    const dispatch = useAppDispatch();
    const {toggleSidebar} = useAppSelector((state)=>state.layout)
    const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer)

    return (
      <>
        <div className="logo-wrapper">
          <Link to={`/dashboard/default`}>
            <Image style={{width: "150px"}} className="img-fluid" src={dynamicImage("logo/prosport.png")} alt="logo" />
          </Link>
          <div className="back-btn" onClick={()=>dispatch(handleResponsiveToggle())}>
            <i className="fa fa-angle-left"></i>
            </div>
          <div className="toggle-sidebar">
            <SVG className={`${sidebarIconType}-icon sidebar-toggle status_toggle middle`} iconId={`${sidebarIconType === "fill" ? "fill-" : "" }toggle-icon`} onClick={()=>dispatch(setToggleSidebar(!toggleSidebar))}/>
          </div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <Image style={{width: "150px"}} className="img-fluid" src={dynamicImage("logo/prosport.png")} alt="logo" />
          </Link>
        </div>
      </>
    );
}

export default LogoWrapper