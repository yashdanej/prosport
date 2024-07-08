import { Container, Row } from "reactstrap";
import TotalSells from "./TotalSells/TotalSells";
import SalesOverview from "./SalesOverview/SalesOverview";
import RecentCustomers from "./RecentCustomers/RecentCustomers";
import RevenueByCategory from "./RevenueByCategory/RevenueByCategory";
import UserByContinent from "./UserByContinent/UserByContinent";
import ProductSlider from "./ProductSlider/ProductSlider";
import TopSeller from "./TopSeller/TopSeller";
import RecentOrders from "./RecentOrders/RecentOrders";
import CryptoAnnotations from "../../Widgets/Charts/LiveProducts/CryptoAnnotations";
import { useEffect } from "react";
import { AppDispatch } from "../../../ReduxToolkit/Store";
import { useDispatch } from "react-redux";
import { getApiLogs, getApiLogsUser } from "../../../ReduxToolkit/Reducers/Change/Dashboard";
import { getApiKeys } from "../../../ReduxToolkit/Reducers/Change/Subscribe";

const ContainerEcommerce = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiLogs());
    dispatch(getApiKeys());
    dispatch(getApiLogsUser());
  }, [dispatch]);

  return (
    <Container fluid className="dashboard-3">
      <Row>
        <TotalSells />
        <RecentOrders />
        <CryptoAnnotations />
        {/* <SalesOverview /> */}
        {/* <RecentCustomers /> */}
        {/* <RevenueByCategory /> */}
        {/* <UserByContinent /> */}
        {/* <ProductSlider /> */}
        {/* <TopSeller /> */}
      </Row>
    </Container>
  );
};

export default ContainerEcommerce;
