import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { Send, Bot, User } from 'lucide-react';
import './AskProSportsAI.css';

// Type definition for messages
interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AskProSportsAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sampleQuestions: string[] = [
    "Which team has conceded 200 or more runs in an innings most often in men's T20s?",
    "Which IPL teams have won most matches?",
    "Abdullah Shafique scores playing against South Africa?",
    "Which team has hit the most centuries in ODIs in 2023?",
    "Most wickets in the powerplay by a team in a single IPL edition?",
    "What is the highest score by a No. 4 batter in men's ODIs?",
    "What is Ricky Ponting's batting average versus Shane Bond in ODIs?",
    "Who has scored the most runs in a single edition of the men's ODI World Cup?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulated AI response - replace with actual API call
      const response = await new Promise<string>((resolve) =>
        setTimeout(
          () =>
            resolve(
              "I'm sorry, I don't have that specific information in my database. However, I can provide general statistics and records for various cricket formats. Could you please ask a more general question or specify a particular tournament or year?"
            ),
          1500
        )
      );

      const aiMessage: Message = { text: response, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='page-body'>
    <Container fluid className="mt-4">
      <h1 className="mb-4">ASK Pro Sports AI (Beta)</h1>
      <Row>
        <Col md={8}>
          <Card className="chat-container">
            <Card.Body>
              <ListGroup variant="flush" className="chat-messages">
                {messages.map((message, index) => (
                  <ListGroup.Item
                    key={index}
                    className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div className={`message ${message.sender}`}>
                      {message.sender === 'user' ? (
                        <User size={16} className="me-2" />
                      ) : (
                        <Bot size={16} className="me-2" />
                      )}
                      {message.text}
                    </div>
                  </ListGroup.Item>
                ))}
                <div ref={messagesEndRef} />
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="d-flex">
                  <Form.Control
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about sports statistics..."
                    disabled={isLoading}
                  />
                  <Button type="submit" variant="primary" className="ms-2" disabled={isLoading}>
                    <Send size={18} />
                  </Button>
                </Form.Group>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Sample Questions</Card.Header>
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
    </Container>
    </div>
  );
};

export default AskProSportsAI;
