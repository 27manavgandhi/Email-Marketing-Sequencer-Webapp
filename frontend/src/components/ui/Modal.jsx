import React, { useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { createEmailSequence } from "../../services/emailSequenceService";
import { useNavigate } from "react-router-dom";

const CreateEmailModal = ({ show, handleClose }) => {
  const [sequenceName, setSequenceName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateEmailSequence = (e) => {
    e.preventDefault();
    if (!sequenceName) {
      return setError("Required");
    }
    setError("");
    const emailSequenceData = {
      name: sequenceName,
      nodes: [],
    };
    toast.promise(createEmailSequence(emailSequenceData), {
      loading: "Creating, please wait...",
      success: (res) => {
        setSequenceName("");
        handleClose();
        navigate(`/emailsequences/${res._id}`);
        return "Created Successfully";
      },
      error: (e) => e,
    });
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as={"p"}>Create Email Sequence</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateEmailSequence} noValidate>
          <Form.Group className="mb-3" controlId="sequenceName">
            <Form.Label>Sequence Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sequence name"
              onChange={(e) => setSequenceName(e.target.value)}
              value={sequenceName}
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEmailModal;
