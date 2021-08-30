import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import Landing from "./pages/landingPage.js";
import ConvertPage from "./pages/convertPage.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

function Routes() {
  const [inputedFile, setInputedFile] = useState(null);

  function handleCallback(file) {
    setInputedFile(file);
  }

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        W
        draggable={false}
        autoclose={4000}
        className="toast"
        position={toast.POSITION.TOP_RIGHT}
      />
      <main className="pages-content">
        <h1 className="sub-title">Media File Converter</h1>
        <Switch>
          <Route path="/" exact>
            <Landing routerCallback={handleCallback} />
          </Route>
          <Route path="/convert">
            <ConvertPage file={inputedFile} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
