import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { useTour } from '@reactour/tour'
import UserProfileFirstStyle from "./UserProfileFirstStyle/UserProfileFirstStyle";
import UserProfileSecondStyle from "./UserProfileSecondStyle/UserProfileSecondStyle";
import UserProfileThirdStyle from "./UserProfileThirdStyle/UserProfileThirdStyle";
import UserProfileFourthStyle from "./UserProfileFourthStyle/UserProfileFourthStyle";
import UserProfileFifthStyle from "./UserProfileFifthStyle/UserProfileFifthStyle";

const TourMain = () => {
  const { setIsOpen } = useTour();
  useEffect(() => {
    var timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <Container fluid>
        <div className="user-profile">
          <Row>
            <UserProfileFirstStyle />
            <UserProfileSecondStyle />
            <UserProfileThirdStyle />
            <UserProfileFourthStyle />
            <UserProfileFifthStyle />
          </Row>
        </div>
      </Container>
    </>
  );
};

export default TourMain;
