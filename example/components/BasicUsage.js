import React from "react";
import Step from "./Step";

const codeImports = `import Tour, { Step } from "react-redux-tour";`;

const codeTour = `<Tour name="example" rememberStep={true} dialogWidth={300}/>`;

const codeStep = `<Step name="example" index={1} title="Title" description="Description">
  <button>...</button>
</Step>`;

const codeBasicExample = `import React from "react";
import Tour, { Step } from "react-redux-tour";

export default () => (
  <div>
    <Tour name="example" rememberStep {...otherOptions}/>

    <Step name="example" index={1} title="Title 1" description="Description 1">
      <button>...</button>
    </Step>

    <Step name="example" index={2} title="Title 2" description="Description 2">
      <div>...</div>
    </Step>

    <Step name="example" index={3} title="Title 3" description="Description 3">
      <p>...</p>
    </Step>
  </div>
);`;

export default () => (
  <article>
    <h3>Basic Usage</h3>

    <p>
      First, import the required components for your tour:
    </p>

    <Step
      index={5}
      title="Import Tour and Step"
    >
      <pre>
        {codeImports}
      </pre>
    </Step>

    <p>
      Before creating your steps, you need to define your tour along with some options you might want. You can do this
      as follows:
    </p>

    <Step
      index={6}
      title="Define your tour with a name"
      description="You can pass some options to Tour component"
    >
      <pre>
        {codeTour}
      </pre>
    </Step>

    <p>
      To add the steps to your app, you don't need to touch your components, Just wrap your target component like this:
    </p>

    <Step
      index={7}
      title="Create your steps"
      description="Just wrap your target component with Step"
    >
      <pre>
        {codeStep}
      </pre>
    </Step>

    <p>
      Here is a basic example of what you should do:
    </p>

    <Step
      index={8}
      title="Basic example"
    >
      <pre>
        {codeBasicExample}
      </pre>
    </Step>
  </article>
);
