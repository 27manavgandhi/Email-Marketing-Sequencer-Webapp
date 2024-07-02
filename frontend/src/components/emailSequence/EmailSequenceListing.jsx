import React from "react";

import useFetch from "@hooks/useFetch";
import { getAllEmailSequence } from "../../services/emailSequenceService";
import EmailLoader from "./EmailLoader";
import InnerWrapper from "@components/ui/InnerWrapper";
import EmailSequenceItem from "./EmailSequenceItem";
import { Col, Row } from "react-bootstrap";

const EmailSequenceListing = () => {
  const { data, isLoading } = useFetch(getAllEmailSequence);

  if (isLoading) {
    return <EmailLoader />;
  }

  if (data.length === 0 && !isLoading) {
    return (
      <InnerWrapper>
        <p className="text-center">No Email Sequence found , create new one</p>
      </InnerWrapper>
    );
  }

  return (
    <InnerWrapper>
      <Row className="row-gap-2">
        {data.map((emailSequence) => (
          <Col xs={12} md={4} lg={3}>
            <EmailSequenceItem {...emailSequence} />
          </Col>
        ))}
      </Row>
    </InnerWrapper>
  );
};

export default EmailSequenceListing;
