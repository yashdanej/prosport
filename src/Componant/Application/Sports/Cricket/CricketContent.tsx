import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane, Tooltip } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store';
import { getCricketData } from '../../../../ReduxToolkit/Reducers/Change/SportSlice';
import BottomRightToast from '../../../BonusUi/Toast/LiveToast/BottomRightToast/BottomRightToast';
import CricketMatchTable from './CricketMatchTable';

const CricketContent = () => {
  const cricketData = useSelector((state: RootState) => state.sport.cricket);
  const [showToast, setShowToast] = useState(false);
  const [txt, setTxt] = useState("");
  const [err, setErr] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const CricketDetailsData = ['Completed', 'Scheduled', 'Live'];

  const fetchCricketData = (page: number = 1) => {
    dispatch(getCricketData({ page, limit: limit, status: activeTab }))
      .then((response: any) => {
        if (response.payload) {
          console.log("response.payload", response.payload);
          setTotalRows(response.payload.pagination.totalItems);
          setErr('');
        }else{
          console.log("response", response);
          console.log("not in payload");
          setTxt(`Please Subscribe`);
          setShowToast(true);
          setErr('Please Subscribe');
        }
      }).catch((err) => {
        console.log("errrrr", err);
      });
  }

  useEffect(() => {
    fetchCricketData(currentPage);
  }, [activeTab, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCricketData(page);
  }

  return (
    <>
      <Card>
        <Col sm="12">
          <Nav tabs className="border-tab mb-0 nav-primary">
            {CricketDetailsData.map((data, index) => (
              <NavItem key={index}>
                <NavLink className={activeTab === index + 1 ? "active" : ""} onClick={() => { setActiveTab(index + 1); setCurrentPage(1); }}>
                  {data}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <CardBody>
            <TabContent activeTab={activeTab}>
              {
                err && err
              }
              <CricketMatchTable 
                cricketData={cricketData} 
                currentPage={currentPage} 
                totalRows={totalRows} 
                handlePageChange={handlePageChange} 
              />
            </TabContent>
          </CardBody>
        </Col>
        {showToast && <BottomRightToast txt={txt} open={showToast} setOpenToast={setShowToast} />}
      </Card>
    </>
  );
}

export default CricketContent;
