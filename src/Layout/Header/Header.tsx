import { Col, Row } from "reactstrap";
import HeaderLogo from "./HeaderLogo";
import CommonBreadcrumb from "../../CommonElements/CommonBreadcrumb/CommonBreadcrumb";
import SearchInput from "./SearchInput/SearchInput";
import HeaderLogoWrapper from "./HeaderLogoWrapper/HeaderLogoWrapper";
import RightHeader from "./RightHeader/RightHeader";
import { useAppSelector } from "../../ReduxToolkit/Hooks";

const Header = () => {
  const { toggleSidebar,scroll } = useAppSelector((state) => state.layout);
  return (
    <Row className={`page-header ${toggleSidebar ? "close_icon" : ""}`} id="pageheaders" style={{display: scroll ? "none" : ""}}>
      <HeaderLogo />
      <CommonBreadcrumb />
      <Col className="header-wrapper m-0">
        <Row>
          <SearchInput />
          <HeaderLogoWrapper />
          <RightHeader />
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
