import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { init } from "../redux/module";
import { get } from "../utils/storage";

class Tour extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    once: PropTypes.bool,
    required: PropTypes.bool,
    rememberStep: PropTypes.bool,
    unordered: PropTypes.bool,
    labels: PropTypes.object,
    gutter: PropTypes.number,
    extraScroll: PropTypes.number,
    dialogWidth: PropTypes.number,
    smallScreen: PropTypes.number
  };

  static defaultProps = {
    disabled: false,
    once: true,
    required: false,
    rememberStep: false,
    unordered: false,
    labels: {
      prev: 'Previous',
      next: 'Next',
      skip: 'Later',
      end: 'Close'
    },
    gutter: 10,
    extraScroll: 20,
    dialogWidth: 250,
    smallScreen: 575
  };

  componentDidMount() {
    const { name, steps, rememberStep } = this.props;
    const persistData = get(name);
    if (!persistData || !persistData.hide) {
      const current = persistData && persistData.current && rememberStep && persistData.current < steps ? persistData.current : 1;
      this.props.init(name, {
        ...this.props,
        ...persistData,
        current
      });
    }
  }

  render() {
    return null;
  }
}

export default connect(undefined, { init })(Tour);
