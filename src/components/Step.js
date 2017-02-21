import React, { PropTypes, Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { init, goto, skip, end } from "../redux/module";
import { offset as getOffset, dimensions as getDimensions } from "../utils/dom";
import { ease } from "../utils/animation";
import { merge as mergeStorageData } from "../utils/storage";
import Overlay from "./Overlay";
import Dialog from "./Dialog";

class Step extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.node.isRequired,
    description: PropTypes.node,
    autoSkip: PropTypes.bool
  };

  static defaultProps = {
    autoSkip: false
  };

  paneRef = null;
  dialogRef = null;
  name = '';
  index = 0;
  data = {};

  componentDidMount() {
    this.paneRef = ReactDOM.findDOMNode(this);
    this.name = this.props.name;
    this.index = this.props.index;
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const nextData = nextProps.data[this.name];
    if (nextData && !nextData.disabled) {
      if (this.data && nextData && nextData.current === this.props.index && this.props.autoSkip) {
        if (nextData.current === 1) {
          this.handleGoTo(nextData.current + 1);
        } else if (nextData.current === this.data.steps) {
          this.handleEnd();
        } else if (nextData.current === this.data.current - 1) {
          this.handleGoTo(nextData.current - 1);
        } else {
          this.handleGoTo(nextData.current + 1);
        }
      } else {
        this.data = nextData;
        this.renderPane();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    if (this.data && !this.data.disabled && this.data.current === this.props.index) {
      this.renderPane();
    }
  }

  getWrapperElement() {
    let wrapper = document.getElementById('tour-wrap');
    if (!wrapper) {
      const id = document.createAttribute('id');
      id.value = 'tour-wrap';
      wrapper = document.createElement('div');
      wrapper.setAttributeNode(id);
      document.body.appendChild(wrapper);
    }
    return wrapper;
  }

  removeWrapperElement() {
    const wrapper = document.getElementById('tour-wrap');
    if (wrapper) {
      wrapper.parentNode.removeChild(wrapper);
    }
  }

  isSmallScreen() {
    return window.innerWidth <= this.data.smallScreen;
  }

  calcDialogBestPosition(contentOffset, contentSize, dialogSize) {
    const { gutter } = this.data;

    const margins = {
      top: contentOffset.top - window.scrollY,
      bottom: window.innerHeight - (contentOffset.top - window.scrollY) - contentSize.height,
      left: contentOffset.left,
      right: window.innerWidth - contentOffset.left - contentSize.width
    };

    if (dialogSize.height < margins.top - gutter) {
      // ABOVE
      return {
        left: contentOffset.left,
        top: contentOffset.top - dialogSize.height - gutter
      };
    } else if (
      dialogSize.height < margins.bottom - gutter
      && contentSize.height < window.innerHeight - dialogSize.height - gutter
    ) {
      // BELOW
      return {
        left: contentOffset.left,
        top: contentOffset.top + contentSize.height + gutter
      };
    } else if (dialogSize.width < margins.left - gutter) {
      // LEFT
      return {
        left: contentOffset.left - dialogSize.width - gutter,
        top: contentOffset.top
      };
    } else if (dialogSize.width < margins.right - gutter) {
      // RIGHT
      return {
        left: contentOffset.left + contentSize.width + gutter,
        top: contentOffset.top
      };
    } else {
      // DEFAULT (TOP-LEFT inside)
      return {
        left: contentOffset.left - gutter,
        top: contentOffset.top - gutter
      };
    }
  }

  handleGoTo(step) {
    this.props.goto(this.name, step);
    if (this.data.rememberStep) {
      mergeStorageData(this.name, {
        current: step
      });
    }
  }

  handleDialogRef(dialog) {
    this.dialogRef = dialog;
  }

  handleSkip() {
    this.props.skip(this.name);
  }

  handleEnd() {
    this.props.end(this.name);
    if (this.data.once) {
      mergeStorageData(this.name, {
        hide: true
      });
    }
  }

  handleSave(data) {
    this.props.save(this.name, data);
  }

  handleScroll(to) {
    const windowY = window.scrollY;
    window.reactReduxTourScrolling = true;

    ease(
      windowY,
      to,
      value => window.scrollTo(window.scrollX, value),
      200,
      () => window.reactReduxTourScrolling = false
    );
  }

  renderPane() {
    if (this.data) {
      if (this.data.current === this.props.index) {
        const { title, description } = this.props;
        const { labels, gutter } = this.data;
        const paneOffset = getOffset(this.paneRef);
        const paneDimensions = getDimensions(this.paneRef);
        const wrapper = this.getWrapperElement();

        ReactDOM.render(
          (
            <div>
              <Overlay
                offset={paneOffset}
                dimensions={paneDimensions}
              />

              <Dialog
                onDialogRef={this.handleDialogRef.bind(this)}
                onPrev={this.handleGoTo.bind(this, this.data.current - 1)}
                onNext={this.handleGoTo.bind(this, this.data.current + 1)}
                onSkip={this.handleSkip.bind(this)}
                onEnd={this.handleEnd.bind(this)}
                currentStep={this.data.current}
                totalSteps={this.data.steps}
                required={this.data.required}
                title={title}
                description={description}
                labels={labels}
              />
            </div>
          ),
          wrapper,
          () => {
            if (this.dialogRef && this.paneRef) {
              const { extraScroll, dialogWidth } = this.data;
              const dialogDimensions = getDimensions(this.dialogRef);

              if (this.isSmallScreen()) {
                this.handleScroll(paneOffset.top - extraScroll);
                this.dialogRef.style.bottom = `${gutter}px`;
                this.dialogRef.style.left = `${gutter}px`;
                this.dialogRef.style.position = 'fixed';
                this.dialogRef.style.right = `${gutter}px`;
                this.dialogRef.style.top = 'auto';
                this.dialogRef.style.width = 'auto';
              } else {
                this.handleScroll(paneOffset.top - dialogDimensions.height - extraScroll);
                const dialogOffset = this.calcDialogBestPosition(paneOffset, paneDimensions, dialogDimensions);
                this.dialogRef.style.bottom = 'auto';
                this.dialogRef.style.left = `${dialogOffset.left}px`;
                this.dialogRef.style.position = 'absolute';
                this.dialogRef.style.right = 'auto';
                this.dialogRef.style.top = `${dialogOffset.top}px`;
                this.dialogRef.style.width = `${dialogWidth}px`;
              }
            }
          }
        );
      } else if (this.data.current < 1 || this.data.current > this.data.steps) {
        this.removeWrapperElement();
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  state => ({
    data: state.reactReduxTour
  }),
  { init, goto, skip, end }
)(Step);
