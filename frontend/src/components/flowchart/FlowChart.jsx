import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

import NodeMenu from "./NodeMenu";
import CustomNode from "./CustomNode";
import Actions from "./Actions";
import useFetch from "@hooks/useFetch";
import { getSingleEmailSequence } from "../../services/emailSequenceService";
import { useParams } from "react-router-dom";
import EmailLoader from "@components/emailSequence/EmailLoader";

const nodeTypes = {
  customNode: CustomNode,
};

const FlowChart = () => {
  const { emailSequenceId } = useParams();
  const { data, isLoading, error } = useFetch(
    getSingleEmailSequence,
    emailSequenceId
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const initialNodes = data?.nodes?.map((node) => ({
    id: node._id,
    type: "customNode",
    data: {
      type: node.type,
      parameters: node.parameters,
    },
    position: node.position,
  }));

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(data.edges);
  }, [data]);
  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length++}`,
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  if (isLoading) {
    return <EmailLoader />;
  }

  if (data && !isLoading && !error)
    return (
      <div
        style={{
          height: "calc(100vh - 60px)",
          position: "relative",
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
          >
            <Background />
            <Controls />
          </ReactFlow>
          <div style={{ position: "absolute", left: "50px", top: "10%" }}>
            <NodeMenu />
          </div>
          <Actions />
        </ReactFlowProvider>
      </div>
    );
};

export default FlowChart;
