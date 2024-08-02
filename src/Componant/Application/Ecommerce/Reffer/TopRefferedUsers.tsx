import React, { useEffect } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { H5 } from '../../../../AbstractElements'
import { AppDispatch, RootState } from '../../../../ReduxToolkit/Store'
import { useDispatch, useSelector } from 'react-redux'
import { getRefferer } from '../../../../ReduxToolkit/Reducers/Change/AuthSlice'
import DataTable, { TableColumn } from 'react-data-table-component'
import { convertToIST } from '../../../../Utils'
import { getCommission } from '../../../../ReduxToolkit/Reducers/Change/Subscribe'
import ContentLoaderTopReffer from './ContentLoaderTopReffer'


type ReffererdData = {
  id: number;
  referrer_id: number;
  referred_id: number;
  created_at: number;
  updated_at: string;
};

const TopRefferedUsers = () => {
  const reffererData = useSelector((state: RootState) => state.auth.refferer);
  const usersData = useSelector((state: RootState) => state.auth.users);
  const commissionData = useSelector((state: RootState) => state.subscribe.commission?.data);

  const dispatch = useDispatch<AppDispatch>();

  const fetchRefferer = () => {
    dispatch(getRefferer());
  }

  const fetchCommission = () => {
    dispatch(getCommission());
  }

  const apiHistoryDataColumn: TableColumn<ReffererdData>[] = [
    {
      name: "ID",
      selector: (row, index: any) => `PSA00${index+1}`,
      sortable: true,
      center: true,
    },
    {
      name: "Referred",
      selector: (row) => usersData?.data?.find((user: any) => user.id === row.referred_id)?.email,
      sortable: true,
      center: true,
    },
    {
      name: "Commission Earned (₹)",
      selector: (row) => commissionData?.data?.find((user: any) => user.referred_id === row.referred_id)?.commission || 0,
      sortable: true,
      center: true,
    },
    {
      name: "Commission (%)",
      selector: (row) => commissionData?.data?.find((user: any) => user.referred_id === row.referred_id)? "5" : 0,
      sortable: true,
      center: true,
    },
    {
      name: "Register At",
      selector: (row) => convertToIST((row.created_at)).split(",")[0],
      sortable: true,
      center: true,
    }
  ];

  useEffect(() => {
    fetchRefferer();
    fetchCommission();
  }, [dispatch]);
  return (
    // <Card>
    //     <CommonCardHeader title="Top Referred Users" />
    //     <CardBody className="pricing-block">
    //     <p>You haven't referred anyone yet.</p>
    //       {/* <Row>
    //         {refferData.map((item, index) => (
    //           <Col lg="4" sm="6" className="box-col-3" key={index}>
    //             <div className="pricingtable">
    //               <div className="pricingtable-header">
    //                 <H5 className="title p-2">{item.title}</H5>
    //               </div>
                  
    //               <H5 className="title">{item.btn}</H5>
    //             </div>
    //           </Col>
    //         ))}
    //       </Row> */}
    //     </CardBody>
    //   </Card>
    <Col sm="12">
        <Card>
          <CommonCardHeader title="Top Referred Users" />
          <CardBody>
            <div className="order-history table-responsive">
              {
                reffererData?.isLoading ?
                Array(3).fill(0).map((_, index) => (
                  <ContentLoaderTopReffer key={index} />
                )):
                reffererData && reffererData.data && reffererData.data.length > 0 &&
                <DataTable
                  data={reffererData.data}
                  columns={apiHistoryDataColumn}
                  className="dataTables_wrapper theme-scrollbar no-footer"
                  highlightOnHover
                  noHeader
                  pagination
                  paginationServer
                />
              }
            </div>
          </CardBody>
        </Card>
      </Col>
  )
}

export default TopRefferedUsers
