import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Handle, Position, useReactFlow } from "reactflow";

import "@styles/node/_custom-node.scss";

const nodeData = {
  SendMail: {
    title: "Send Mail",
    className: "send-mail-node",
    icon: "fa-regular fa-envelope fa-lg",
    placeholder: "Template",
    nodeType: [{ position: Position.Bottom, type: "source" }],
  },
  Wait: {
    title: "Wait",
    icon: "fa-regular fa-clock fa-lg",
    className: "wait-node",
    placeholder: "Duration",
    nodeType: [
      { position: Position.Top, type: "target" },
      { position: Position.Bottom, type: "source" },
    ],
  },
  Decision: {
    title: "Decision",
    icon: "fa-solid fa-hourglass-end fa-lg",
    className: "decision-node",
    nodeType: [{ position: Position.Top, type: "target" }],
  },
};

const CustomNode = ({ data: { type, parameters: param }, id }) => {
  const { setNodes } = useReactFlow();
  const [parameters, setParameters] = useState(param);

  // updating parameters of node
  const handleChange = (e) => {
    const value = e.target.value;
    setParameters(value);

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, parameters: value } }
          : node
      )
    );
  };
  return (
    <div className={`custom-node shadow ${nodeData[type].className}`}>
      {nodeData[type].nodeType.map((nodeData, i) => (
        <Handle key={i} type={nodeData.type} position={nodeData.position} />
      ))}
      <div className="d-flex gap-4">
        <div className="icon">
          <div className="icon-wrapper">
            <i className={nodeData[type].icon}></i>
          </div>
        </div>
        <div className="text">
          <Form>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>{nodeData[type].title}</Form.Label>
              <Form.Control
                type="text"
                placeholder={nodeData[type].placeholder}
                value={parameters}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
