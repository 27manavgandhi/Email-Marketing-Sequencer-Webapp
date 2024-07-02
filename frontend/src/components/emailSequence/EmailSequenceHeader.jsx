import CreateEmailModal from "@components/ui/Modal";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const EmailSequenceHeader = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="d-flex">
        <h3>Email Sequences</h3>
        <Button className="ms-auto" onClick={handleShow}>
          Create Sequence
        </Button>
      </div>
      <CreateEmailModal show={show} handleClose={handleClose} />
    </>
  );
};

export default EmailSequenceHeader;
