import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEdges, useNodes, useReactFlow } from "reactflow";
import { updateEmailSequence } from "../../services/emailSequenceService";

const Actions = () => {
  const edges = useEdges();
  const nodes = useNodes();
  const { emailSequenceId } = useParams();
  const { setNodes, setEdges } = useReactFlow();

  const handleSave = () => {
    const nodesData = nodes.map((node) => ({
      id: node.id,
      type: node.data.type,
      parameters: node.data.parameters,
      position: node.position,
    }));

    const edgesData = edges
      .filter((edge) => edge.source && edge.target)
      .map((edge) => ({
        id: edge._id,
        source: edge.source,
        target: edge.target,
      }));

    toast.promise(
      updateEmailSequence(
        { nodes: nodesData, edges: edgesData },
        emailSequenceId
      ),
      {
        loading: "saving...",
        success: (res) => {
          const initialNodes = res?.nodes?.map((node) => ({
            id: node._id,
            type: "customNode",
            data: {
              type: node.type,
              parameters: node.parameters,
            },
            position: node.position,
          }));

          setNodes(initialNodes);
          setEdges(res.edges);
          return "saved";
        },

        error: (e) => e,
      }
    );
  };
  return (
    <div className="position-absolute" style={{ top: "15%", left: "50px" }}>
      <Button variant="success" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Actions;
