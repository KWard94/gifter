import "./App.css";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Footer from "./Components/Footer.jsx";
import { Switch, Route } from "react-router-dom";
import List from "./Components/List.jsx";
import GiftInfo from "./Components/GiftInfo";
import SuggestedList from "./Components/SuggestedList.jsx";
import Suggested from "./Components/Suggested.jsx";
import SugestedDetails from "./Components/SuggestedDetails.jsx";
import SuggestedDetails from "./Components/SuggestedDetails.jsx";

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gifts" component={List} />
        <Route exact path="/suggested" component={SuggestedList} />
        <Route exact path="/suggestion" component={Suggested} />
        <Route
          exact
          path="/gifts/:id"
          render={(routerProps) => <GiftInfo match={routerProps.match} />}
        />
        <Route
          exact
          path="/suggestion/:id"
          render={(routerProps) => (
            <SuggestedDetails match={routerProps.match} />
          )}
        />
        <Home />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
