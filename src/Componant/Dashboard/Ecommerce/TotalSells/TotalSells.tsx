import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import TotalSellsDetails from "./TotalSellsDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiLogs } from "../../../../ReduxToolkit/Reducers/Change/Dashboard";
import { AppDispatch, RootState } from "../../../../ReduxToolkit/Store";
import { dynamicImage } from "../../../../Service";
import { Image } from "../../../../AbstractElements";
import { getApiKeys } from "../../../../ReduxToolkit/Reducers/Change/Subscribe";

const TotalSells = () => {
  // const apiLogsData = useSelector((state: RootState) => state.dashboard.api_logs);
  const apiKeyData = useSelector((state: RootState) => state.subscribe.api_keys);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // dispatch(getApiLogs());
    dispatch(getApiKeys());
  }, [dispatch]);
  console.log("apiKeyData", apiKeyData);

  return (
    <>
    {
      apiKeyData && apiKeyData.data &&
        <Col xl="3" sm="6">
          <Card>
            <CommonCardHeader
              headClass="card-no-border pb-0"
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
              subClass="daily-revenue-card"
              title="Total Hits" // Assuming `endpoint` is a property in each `log` item
            />
            <CardBody className={`pb-5 success`}>
                <TotalSellsDetails data={apiKeyData}/>
            </CardBody>
          </Card>
        </Col>
    }
    </>
  );
};

export default TotalSells;
