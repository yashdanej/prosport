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
  const [activeTab, setActiveTab] = useState<string>('Completed');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchMatchData = async () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const data: Match[] = [
        {
          id: 1,
          match: 'NOT vs GLO',
          venue: 'Trent Bridge',
          location: 'Nottingham',
          startDate: '2024-08-09',
          endDate: '2024-08-10',
          startTime: '7:00 PM',
          endTime: '1:00 PM',
          status: 'Completed',
          score: 'NOT 245/6, GLO 230/8',
        },
        {
          id: 2,
          match: 'DUR vs HAM',
          venue: 'Roseworth Terrace',
          location: 'Gosforth',
          startDate: '2024-08-09',
          endDate: '2024-08-10',
          startTime: '7:00 PM',
          endTime: '1:00 PM',
          status: 'Scheduled',
        },
        // ... more match data
      ];
      setMatchData(data);
      setLoading(false);
    }, 1000);
  };

  const filteredMatches = matchData.filter(
    (match) =>
      match.status === activeTab &&
      (match.match.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!dateRange[0] || new Date(match.startDate) >= dateRange[0]) &&
      (!dateRange[1] || new Date(match.endDate) <= dateRange[1])
  );

  const sortedMatches = [...filteredMatches].sort((a: any, b: any) => {
    if (sortColumn) {
      if (a[sortColumn as keyof Match] < b[sortColumn as keyof Match])
        return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn as keyof Match] > b[sortColumn as keyof Match])
        return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMatches.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleFavorite = (matchId: number) => {
    setFavorites((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
    );
  };

  const openMatchDetails = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <div className='page-body'>
    <Container fluid className="p-4">
      {/* <h1 className="mb-4">Cricket</h1> */}
      <Nav tabs className="mb-4">
        {['Completed', 'Scheduled', 'Live'].map((tab) => (
          <NavItem key={tab}>
            <NavLink
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
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
          <CSVLink
            data={sortedMatches}
            filename={'cricket_matches.csv'}
            className="btn btn-primary"
          >
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
                  {['Match', 'Venue', 'Location', 'Start Date(IST)', 'End Date(IST)', 'Start Time(IST)', 'End Time(IST)'].map(
                    (header) => (
                      <th
                        key={header}
                        onClick={() =>
                          handleSort(header.toLowerCase().replace(/\s/g, ''))
                        }
                      >
                        {header}{' '}
                        {sortColumn ===
                          header.toLowerCase().replace(/\s/g, '') &&
                          (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                    )
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((match) => (
                  <tr key={match.id}>
                    <td>
                      <Star
                        size={18}
                        onClick={() => toggleFavorite(match.id)}
                        fill={favorites.includes(match.id) ? 'gold' : 'none'}
                        stroke={
                          favorites.includes(match.id) ? 'gold' : 'currentColor'
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>{match.match}</td>
                    <td>{match.venue}</td>
                    <td>{match.location}</td>
                    <td>{match.startDate}</td>
                    <td>{match.endDate}</td>
                    <td>{match.startTime}</td>
                    <td>{match.endTime}</td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => openMatchDetails(match)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
        </TabContent>
      )}

      <Pagination className="d-flex justify-content-end">
        <PaginationItem>
          <PaginationLink first onClick={() => paginate(1)} disabled={currentPage === 1}>
            <ChevronsLeft size={18} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </PaginationLink>
        </PaginationItem>
        {[...Array(Math.ceil(filteredMatches.length / itemsPerPage))].map(
          (_, i) => (
            <PaginationItem key={i + 1} active={currentPage === i + 1}>
              <PaginationLink onClick={() => paginate(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredMatches.length / itemsPerPage)}
          >
            <ChevronRight size={18} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => paginate(Math.ceil(filteredMatches.length / itemsPerPage))}
            disabled={currentPage === Math.ceil(filteredMatches.length / itemsPerPage)}
          >
            <ChevronsRight size={18} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Match Details
        </ModalHeader>
        <ModalBody>
          {selectedMatch && (
            <>
              <p>
                <strong>Match:</strong> {selectedMatch.match}
              </p>
              <p>
                <strong>Venue:</strong> {selectedMatch.venue}
              </p>
              <p>
                <strong>Location:</strong> {selectedMatch.location}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedMatch.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {selectedMatch.endDate}
              </p>
              <p>
                <strong>Start Time:</strong> {selectedMatch.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {selectedMatch.endTime}
              </p>
              {selectedMatch.score && (
                <p>
                  <strong>Score:</strong> {selectedMatch.score}
                </p>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
    </div>
  );
};

export default ChangeCricket;
