import React from 'react';
import Step from './Step';

export default () => (
  <article>
    <h3>Installation</h3>

    <p>
      You can install the package with the commands:
    </p>

    <Step
      index={1}
      title="First, Install the package"
    >
      <pre>
        npm install react-redux-tour --save
      </pre>
    </Step>
  </article>
);
