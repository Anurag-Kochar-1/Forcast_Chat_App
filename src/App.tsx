import "./App.css";
import Layout from "./Layouts/Layout";
import AppRoutes from "./setup/routes-manager/index";
import { BrowserRouter } from "react-router-dom";
import { inject } from '@vercel/analytics';

function App() {
  inject()
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
