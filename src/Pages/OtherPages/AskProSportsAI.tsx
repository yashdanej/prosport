import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { Send, Bot, User, Trash2, Database } from 'lucide-react';
import axios from 'axios';
import './AskProSportsAI.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface CricketData {
  // Define the structure of your cricket data here
  player: string;
  stat: string;
  value: number;
}

const AskProSportsAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sampleQuestions: string[] = [
    "Which team has conceded 200 or more runs in an innings most often in men's T20s?",
    "Which IPL teams have won most matches?",
    "What are Abdullah Shafique's scores playing against South Africa?",
    "Which team has hit the most centuries in ODIs in 2023?",
    "Most wickets in the powerplay by a team in a single IPL edition?",
    "What is the highest score by a No. 4 batter in men's ODIs?",
    "What is Ricky Ponting's batting average versus Shane Bond in ODIs?",
    "Who has scored the most runs in a single edition of the men's ODI World Cup?",
  ];

  useEffect(() => {
    // Load conversation history from local storage
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save conversation history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      // First, try to fetch data from the cricket database
      const cricketData = await fetchCricketData(input);
      
      if (cricketData) {
        // If cricket data is found, use it to formulate a response
        const aiResponse = formatCricketDataResponse(cricketData);
        const aiMessage: Message = { id: Date.now().toString(), text: aiResponse, sender: 'ai', timestamp: new Date() };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // If no cricket data is found, use ChatGPT API
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a knowledgeable cricket statistics AI assistant. Provide accurate and concise information about cricket statistics only. If the question is not about cricket, politely inform the user that you can only answer cricket-related questions." },
              { role: "user", content: input }
            ],
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const aiResponse = response.data.choices[0].message.content;
        const aiMessage: Message = { id: Date.now().toString(), text: aiResponse, sender: 'ai', timestamp: new Date() };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Sorry, I couldn't process your request. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const fetchCricketData = async (query: string): Promise<CricketData | null> => {
    // Implement your database query logic here
    // This is a placeholder function
    console.log("Fetching cricket data for query:", query);
    return null;
  };

  const formatCricketDataResponse = (data: CricketData): string => {
    // Format the cricket data into a readable response
    // This is a placeholder function
    return `Here's the cricket data you requested: ${JSON.stringify(data)}`;
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className='page-body'>
      <Container fluid className="mt-4">
        <h1 className="mb-4">ASK Pro Sports AI (Cricket Edition)</h1>
        <Row>
          <Col md={8}>
            <Card className="chat-container">
              <Card.Body>
                <ListGroup variant="flush" className="chat-messages">
                  {messages.map((message) => (
                    <ListGroup.Item
                      key={message.id}
                      className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div className={`message ${message.sender}`}>
                        {message.sender === 'user' ? (
                          <User size={16} className="me-2" />
                        ) : (
                          <Bot size={16} className="me-2" />
                        )}
                        {message.text}
                        <small className="text-muted d-block mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                  {isTyping && (
                    <ListGroup.Item className="d-flex justify-content-start">
                      <div className="message ai">
                        <Bot size={16} className="me-2" />
                        Typing...
                      </div>
                    </ListGroup.Item>
                  )}
                  <div ref={messagesEndRef} />
                </ListGroup>
            {error && <div className='err-notification'><Alert variant="danger" className="mt-3">{error}</Alert></div>}
              </Card.Body>
              <Card.Footer className='myfooter'>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="d-flex">
                    <Form.Control
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about cricket statistics..."
                      disabled={isLoading}
                    />
                    <Button type="submit" variant="primary" className="ms-2" disabled={isLoading}>
                      <Send size={18} />
                    </Button>
                    <Button variant="danger" className="ms-2" onClick={clearChat}>
                      <Trash2 size={18} />
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="chat-sample-container">
              <Card.Header style={{color: 'black'}}>Sample Cricket Questions</Card.Header>
              <ListGroup className='question' variant="flush">
                {sampleQuestions.map((question, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => setInput(question)}
                    className="sample-question"
                  >
                    {question}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="disclaimer">
              <h5>Disclaimer</h5>
              <p>
                The ASK Pro Sports AI (Cricket Edition) is an AI-powered tool designed to provide cricket-related information and statistics. While we strive for accuracy, please note that:
              </p>
              <ul>
                <li>The AI may occasionally provide inaccurate or outdated information.</li>
                <li>This tool should not be used as the sole basis for decision-making in professional, financial, or legal matters.</li>
                <li>The AI's knowledge is based on its training data and may not include the most recent cricket events or statistics.</li>
                <li>Users are encouraged to verify important information from official cricket sources.</li>
              </ul>
              <p>
                By using this service, you acknowledge and accept these limitations. For the most up-to-date and official cricket information, please refer to recognized cricket authorities and official websites.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AskProSportsAI;