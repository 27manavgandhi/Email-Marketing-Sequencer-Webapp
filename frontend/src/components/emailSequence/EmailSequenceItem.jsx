import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { deleteEmailSequence } from "../../services/emailSequenceService";
import toast from "react-hot-toast";

const EmailSequenceItem = ({ _id, name }) => {
  const handleDeleteSequence = (event) => {
    event.stopPropagation();
    toast.promise(deleteEmailSequence(_id), {
      loading: "Deleting...",
      success: "Deleted Successfully",
      error: (e) => e,
    });
  };
  return (
    <Card>
      <Link to={`/emailsequences/${_id}`} className="nav-link ">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Link>
      <Card.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleDeleteSequence}
          className="m-1"
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EmailSequenceItem;
