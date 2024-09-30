import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  Download,
  Star,
} from 'lucide-react';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../ReduxToolkit/Store';
import { getCricketData } from '../../ReduxToolkit/Reducers/Change/SportSlice';

interface Match {
  id: number;
  match: string;
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string;
  score?: string;
}

const ChangeCricket: React.FC = () => {
  const [activeTab, setActiveTab] = useState<any>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state
  const [sortColumn, setSortColumn] = useState<string>(''); 
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<any>([null, null]); // Date range state
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch<AppDispatch>();
  const cricketData = useSelector((state: RootState) => state.sport.cricket);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchCricketData(currentPage);
    const interval = setInterval(() => fetchCricketData(currentPage), 60000);
    return () => clearInterval(interval);
  }, [activeTab, currentPage]);

  const fetchCricketData = (page: number) => {
    setLoading(true);
    dispatch(getCricketData({ page, limit: itemsPerPage, status: activeTab }))
      .then((response: any) => {
        if (response.payload) {
          if (typeof response.payload === 'string') {
            console.log('Subscription error:', response.payload);
          } else {
            setTotalRows(response.payload.pagination.totalItems);
            setTotalPages(response.payload.pagination.totalPages);
          }
        }
      })
      .catch((err) => console.error('Error fetching cricket data', err))
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const openMatchDetails = (match: Match) => {
    setSelectedMatch(match);
    toggleModal();
  };

  const handleSort = (column: string) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
  };

  const renderMatches = () => {
    let filteredMatches = (cricketData?.data ? [...cricketData.data] : []).sort((a: any, b: any) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
      }
      return 0; 
    });

    // Apply search filter
    if (searchTerm) {
      filteredMatches = filteredMatches.filter((match: any) =>
        match.short_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.venue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log("dateRange[0] && dateRange[1]", dateRange[0], dateRange[1]);
    
    // Apply date range filter
    if (dateRange[0] && dateRange[1]) {
      filteredMatches = filteredMatches.filter((match: any) => {
        const matchDate = new Date(match.date_start_ist);  // Convert match date to Date object
        console.log("matchDate", matchDate);
        
        // Check if matchDate falls within the selected date range
        return matchDate >= dateRange[0] && matchDate <= dateRange[1];
      });
    }
    console.log("filteredMatches", filteredMatches);
    
    
    return filteredMatches;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${strMinutes} ${ampm}`;
  };

  const selectMatch = (match: string) => {
    if(match === 'Completed'){
      return 2;
    }else if(match === 'Scheduled'){
      return 1;
    }else{
      return 3;
    }
  }

  return (
    <div className='page-body'>
      <Container fluid className="p-4">
        <Nav tabs className="mb-4">
          {['Completed', 'Scheduled', 'Live'].map((tab) => (
            <NavItem key={tab}>
              <NavLink className={activeTab === selectMatch(tab) ? 'active' : ''} onClick={() => setActiveTab(selectMatch(tab))}>
                {tab}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <Row className="mb-3">
          <Col md={4}>
            <Input
              type="text"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Select date range"
              className="form-control"
            />
          </Col>
          <Col md={4}>
            <CSVLink data={renderMatches()} filename={'cricket_matches.csv'} className="btn btn-primary">
              <Download size={18} className="me-2" />
              Export to CSV
            </CSVLink>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <TabContent activeTab={activeTab}>
            <TabPane tabId={activeTab}>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Favorite</th>
                    {['Match', 'Venue', 'Location', 'Start Date(IST)', 'End Date(IST)', 'Start Time(IST)', 'End Time(IST)'].map((header) => (
                      <th key={header} onClick={() => handleSort(header.toLowerCase().replace(/\s/g, ''))}>
                        {header} {sortColumn === header.toLowerCase().replace(/\s/g, '') && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderMatches().map((match: any) => (
                    <tr key={match.id}>
                      <td>
                        <Star
                          size={18}
                          fill={favorites.includes(match.id) ? 'gold' : 'none'}
                          stroke={favorites.includes(match.id) ? 'gold' : 'currentColor'}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td>{match?.short_title}</td>
                      <td>{match?.venue.name}</td>
                      <td>{match?.venue.location}</td>
                      <td>{match?.date_start_ist.split("T")[0]}</td>
                      <td>{match?.date_end_ist.split("T")[0]}</td>
                      <td>{formatTime(match?.date_start_ist)}</td>
                      <td>{formatTime(match?.date_end_ist)}</td>
                      <td>
                        <Button color="primary" onClick={() => openMatchDetails(match)}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink first onClick={() => paginate(1)} />
                </PaginationItem>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem active={i + 1 === currentPage} key={i}>
                    <PaginationLink onClick={() => paginate(i + 1)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                </PaginationItem>
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink last onClick={() => paginate(totalPages)} />
                </PaginationItem>
              </Pagination>
            </TabPane>
          </TabContent>
        )}

        {/* Modal for match details */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Match Details</ModalHeader>
          <ModalBody>
            {selectedMatch ? (
              <div>
                <h5>{selectedMatch?.short_title}</h5>
                <p>Venue: {selectedMatch?.venue.name}</p>
                <p>Location: {selectedMatch?.venue.location}</p>
                <p>Start Date: {selectedMatch?.date_start_ist.split("T")[0]}</p>
                <p>End Date: {selectedMatch?.date_end_ist.split("T")[0]}</p>
                <p>Start Time: {formatTime(selectedMatch?.date_start_ist)}</p>
                <p>End Time: {formatTime(selectedMatch?.date_end_ist)}</p>
                <p>Status: {selectedMatch?.status_str}</p>
              </div>
            ) : (
              'No match details available.'
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ChangeCricket;
