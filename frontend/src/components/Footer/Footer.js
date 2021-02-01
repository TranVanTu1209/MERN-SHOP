import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className='bg-dark text-white p-3'>
      <Container>
        <Row>
          <Col className='text-center'>
            Copyright &copy; 2020.All right is reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
