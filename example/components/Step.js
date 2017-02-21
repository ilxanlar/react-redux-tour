import React from 'react';
import { Step } from "../../src";

export default ({ children, ...props }) => (
  <Step {...props} name="doc" steps={10}>
    {children}
  </Step>
);
