import "./App.css";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Footer from "./Components/Footer.jsx";
import { Switch, Route } from "react-router-dom";
import List from "./Components/List.jsx";

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Home />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
