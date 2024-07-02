import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import InnerWrapper from "@components/ui/InnerWrapper";
import LoginForm from "@components/auth/LoginForm";

const Login = () => {
  return (
    <section>
      <InnerWrapper>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </InnerWrapper>
    </section>
  );
};

export default Login;
