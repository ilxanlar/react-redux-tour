import React from 'react';
import Step from './Step';

const codeConfigReducer = `import { createStore, combineReducers } from "redux";
import { reducer as reactReduxTour } from "react-redux-tour";

const reducers = combineReducers({
  // Other reducers,
  reactReduxTour
});

const store = createStore(reducers);

// Pass store to your Provider...`;

export default () => (
  <article>
    <h3>Configuration</h3>

    <p>
      This package uses Redux for managing its state, so you need to add the reducer to your application. If you're
      using Redux, you're familiar with <code>combineReducers</code> function. All you need to do is to import
      <code>react-redux-tour</code>'s reducer and add it to your <code>combineReducers</code> in your app.
    </p>

    <Step index={4} title="Add the reducer">
      <pre>
        {codeConfigReducer}
      </pre>
    </Step>
  </article>
);
