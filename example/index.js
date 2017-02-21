import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer } from "../src";
import Page from "./components/Page";

class Example extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Page/>
        </div>
      </Provider>
    );
  }
}

const reducers = combineReducers({
  reactReduxTour: reducer
});

const store = createStore(reducers);

ReactDOM.render(
  <Example />,
  document.getElementById('example')
);
