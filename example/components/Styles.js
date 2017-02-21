import React from 'react';
import Step from './Step';

const codeImport = `node_modules/react-redux-tour/src/style/style.css`;

const codeCSS = `html {
  height: 100%;
}

body {
  min-height: 100%;
}`;

export default () => (
  <article>
    <h3>Styles</h3>

    <p>
      To use <code className="inline">react-redux-tour</code>,
      you must import the styles from the following path:
    </p>

    <Step index={2} title="Import the styles">
      <pre>
        {codeImport}
      </pre>
    </Step>

    <p>
      For better interface, you also need to add the following styles in you app:
    </p>

    <Step
      index={3}
      title="Copy and paste this to your styles"
      description="Add these styles to your project, at the top of all styles if possible."
    >
      <pre>
        {codeCSS}
      </pre>
    </Step>
  </article>
);
