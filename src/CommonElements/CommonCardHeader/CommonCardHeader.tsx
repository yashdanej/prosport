import {CardHeader} from "reactstrap";
import H4 from "../Headings/H4Element";
import CardHeaderDropDown from "./CardHeaderDropDown";
import { PropsTypes } from "../../Types/CommonElements/CommonElementsTypes";
const CommonCardHeader = ({
  headClass,
  title,
  titleClass,
  mainTitle,
  firstItem,
  secondItem,
  thirdItem,
  subClass
}: PropsTypes) => {
  return (
    <CardHeader className={headClass}>
      <div className={`header-top ${subClass}`}>
        <H4 className={titleClass}>{title}</H4>
        {mainTitle && (<CardHeaderDropDown firstItem={firstItem} secondItem={secondItem} thirdItem={thirdItem} mainTitle={mainTitle} ></CardHeaderDropDown>)}
      </div>
    </CardHeader>
  );
};

export default CommonCardHeader;
