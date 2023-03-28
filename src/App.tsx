import "./App.css";
import Layout from "./Layout/Layout";
import AppRoutes from "./setup/routes-manager/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
