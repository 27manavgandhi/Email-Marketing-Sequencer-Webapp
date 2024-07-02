import React from "react";
import { useReactFlow } from "reactflow";

const NodeMenu = ({ parameters, setParameters }) => {
  const data = ["SendMail", "Wait", "Decision"];

  const { addNodes, getNodes } = useReactFlow();

  const handleChange = (e) => {
    const location = Math.random() * 100;
    const nodeData = e.target.value;
    const newNode = {
      id: String(getNodes().length + 1),
      data: {
        type: nodeData,
        parameters: parameters,
      },
      position: { x: location, y: location },
      type: "customNode",
      height: 40,
      width: 150,
      setParameters,
    };

    addNodes(newNode);
  };
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleChange}
    >
      <option defaultValue={""}>Create Node</option>
      {data.map((optionData, index) => (
        <option value={optionData} key={index}>
          {optionData}
        </option>
      ))}
    </select>
  );
};

export default NodeMenu;
