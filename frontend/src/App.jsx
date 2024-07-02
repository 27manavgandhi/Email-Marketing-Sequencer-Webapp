import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global/_global.scss";

import Layout from "./Layout/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Layout />
      <Toaster />
    </>
  );
}

export default App;
