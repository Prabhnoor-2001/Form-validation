import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import { Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/">
          <Form />
        </Route>
      </header>
    </div>
  );
}

export default App;
