import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Table, Badge, Button, ListGroup } from 'react-bootstrap';
import { MapPin, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const LiveScoringPage = () => {
  const [matchData, setMatchData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>('summary');
  const [showPlaying11, setShowPlaying11] = useState<any>(false);
  const [showVenueDetails, setShowVenueDetails] = useState<any>(false);

  useEffect(() => {
    // Simulated API call
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMatchData = () => {
    // Replace this with your actual API call
    setMatchData({
      tournament: "New Zealand Women tour of Australia, 2024",
      match: "3rd T20I",
      teams: {
        team1: { name: "NZ-W", score: "146/6 (20.0)" },
        team2: { name: "AUS-W", score: "148/5 (19.1)" }
      },
      result: "AUS-W Won By 5 wickets",
      playerOfTheMatch: "Georgia Wareham",
      topBatter: { name: "Georgia Plimmer", runs: 53, balls: 48, fours: 5, sixes: 1 },
      topBowler: { name: "Georgia Wareham", wickets: 2, runs: 21, overs: 4 },
      venue: "Allan Border Field, Brisbane",
      tossResult: "New Zealand Women won the toss and elected to bat",
      date: "24th Sep 2024, 9:10 AM",
      umpires: {
        umpire1: "John Doe",
        umpire2: "Jane Smith",
        thirdUmpire: "Bob Johnson",
        matchReferee: "Alice Brown"
      },
      playing11: {
        team1: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"],
        team2: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Player 10", "Player 11"]
      },
      commentary: [
        { over: 19.1, description: "Wareham to Perry, FOUR! Australia wins!" },
        { over: 19.0, description: "Sutherland to Gardner, 1 run" },
        // ... more commentary
      ],
      // ... add more match data as needed
    });
  };

  if (!matchData) return <div>Loading...</div>;

  return (
    <div className='page-body'>
    <Container fluid className="mt-4">
      <Card className="mb-4">
        <Card.Body>
          <h2>{matchData.tournament}</h2>
          <h3>{matchData.match} • {matchData.venue}</h3>
          <Row>
            <Col md={4}>
              <h4>{matchData.teams.team1.name}: {matchData.teams.team1.score}</h4>
            </Col>
            <Col md={4}>
              <h4>{matchData.teams.team2.name}: {matchData.teams.team2.score}</h4>
            </Col>
            <Col md={4}>
              <Badge bg="success">{matchData.result}</Badge>
            </Col>
          </Row>
          <p>Player of the Match: {matchData.playerOfTheMatch}</p>
        </Card.Body>
      </Card>

      <Row>
        <Col md={9}>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="summary">Summary</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="commentary">Commentary</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="scorecard">Scorecard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="squad">Squad</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="highlights">Highlights</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="news">News</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="matchInfo">Match Info</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="summary">
                    <h4>Match Summary</h4>
                    <Row>
                      <Col md={6}>
                        <Card>
                          <Card.Header>Top Batter</Card.Header>
                          <Card.Body>
                            <h5>{matchData.topBatter.name}</h5>
                            <p>{matchData.topBatter.runs} ({matchData.topBatter.balls})</p>
                            <p>4s: {matchData.topBatter.fours} • 6s: {matchData.topBatter.sixes}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card>
                          <Card.Header>Top Bowler</Card.Header>
                          <Card.Body>
                            <h5>{matchData.topBowler.name}</h5>
                            <p>{matchData.topBowler.wickets}/{matchData.topBowler.runs} ({matchData.topBowler.overs})</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="commentary">
                    <h4>Commentary</h4>
                    <ListGroup>
                      {matchData.commentary.map((item: any, index: any) => (
                        <ListGroup.Item key={index}>
                          <strong>Over {item.over}:</strong> {item.description}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="scorecard">
                    <h4>Scorecard</h4>
                    {/* Add detailed scorecard here */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="squad">
                    <h4>Squad</h4>
                    {/* Add squad information here */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="highlights">
                    <h4>Highlights</h4>
                    {/* Add match highlights here */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="news">
                    <h4>News</h4>
                    {/* Add match-related news here */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="matchInfo">
                    <h4>Match Info</h4>
                    <p><strong>Date & Time:</strong> {matchData.date}</p>
                    <p><strong>Venue:</strong> {matchData.venue}</p>
                    <p><strong>Toss:</strong> {matchData.tossResult}</p>
                    <h5>Umpires</h5>
                    <p>Umpire 1: {matchData.umpires.umpire1}</p>
                    <p>Umpire 2: {matchData.umpires.umpire2}</p>
                    <p>Third Umpire: {matchData.umpires.thirdUmpire}</p>
                    <p>Match Referee: {matchData.umpires.matchReferee}</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Header>
              <Button 
                variant="link" 
                onClick={() => setShowPlaying11(!showPlaying11)}
                className="d-flex justify-content-between align-items-center w-100"
              >
                Check Playing 11
                {showPlaying11 ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </Card.Header>
            {showPlaying11 && (
              <Card.Body>
                <h5>{matchData.teams.team1.name}</h5>
                <ul>
                  {matchData.playing11.team1.map((player: any, index: any) => (
                    <li key={index}>{player}</li>
                  ))}
                </ul>
                <h5>{matchData.teams.team2.name}</h5>
                <ul>
                  {matchData.playing11.team2.map((player: any, index: any) => (
                    <li key={index}>{player}</li>
                  ))}
                </ul>
              </Card.Body>
            )}
          </Card>
          <Card>
            <Card.Header>
              <Button 
                variant="link" 
                onClick={() => setShowVenueDetails(!showVenueDetails)}
                className="d-flex justify-content-between align-items-center w-100"
              >
                Venue Details
                {showVenueDetails ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </Card.Header>
            {showVenueDetails && (
              <Card.Body>
                <p><MapPin size={18} className="me-2" />{matchData.venue}</p>
                <p><strong>Pitch:</strong> Neutral</p>
                <p><strong>Capacity:</strong> 25,000</p>
                {/* Add more venue details as needed */}
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default LiveScoringPage;