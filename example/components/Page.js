import React from "react";
import Tour from "../../src";
import Installation from "./Installation";
import Configuration from "./Configuration";
import Styles from "./Styles";
import BasicUsage from "./BasicUsage";

export default () => {
  return (
    <div>
      <Tour name="doc"/>
      <Installation/>
      <Styles/>
      <Configuration/>
      <BasicUsage/>
    </div>
  );
};
