import EmailSequenceHeader from "@components/emailSequence/EmailSequenceHeader";
import EmailSequenceListing from "@components/emailSequence/EmailSequenceListing";
import InnerWrapper from "@components/ui/InnerWrapper";
import React from "react";
import { Container } from "react-bootstrap";

const EmailSequence = () => {
  return (
    <section>
      <InnerWrapper>
        <Container>
          <EmailSequenceHeader />
          <EmailSequenceListing />
        </Container>
      </InnerWrapper>
    </section>
  );
};

export default EmailSequence;
