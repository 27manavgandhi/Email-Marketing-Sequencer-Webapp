import React from "react";

import RegisterForm from "@components/auth/RegisterForm";
import InnerWrapper from "@components/ui/InnerWrapper";
import { Col, Container, Row } from "react-bootstrap";

const Register = () => {
  return (
    <section>
      <InnerWrapper>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <RegisterForm />
            </Col>
          </Row>
        </Container>
      </InnerWrapper>
    </section>
  );
};

export default Register;
