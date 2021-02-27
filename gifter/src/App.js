import "./App.css";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Footer from "./Components/Footer.jsx";
import { Switch, Route } from "react-router-dom";
import List from "./Components/List.jsx";
import GiftInfo from "./Components/GiftInfo";

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gifts" component={List} />
        <Route
          exact
          path="/gifts/:id"
          render={(routerProps) => <GiftInfo match={routerProps.match} />}
        />
        <Home />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
