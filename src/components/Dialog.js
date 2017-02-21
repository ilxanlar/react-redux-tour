import React from "react";
import Button from "./Button";

export default ({
  onDialogRef,
  onPrev,
  onNext,
  onSkip,
  onEnd,
  currentStep,
  totalSteps,
  required,
  title,
  description,
  labels
}) => (
  <div ref={onDialogRef} id="tour-dialog">
    <div className="dialog-header">
      {title}
    </div>

    {
      description ?
        <div className="dialog-description">
          {description}
        </div> : null
    }

    <div className="dialog-footer">
      <div className="dialog-footer-nav">
        <Button
          disabled={currentStep === 1}
          onClick={onPrev}
          className="tour-prev"
          label={labels.prev}
        />

        <Button
          disabled={currentStep === totalSteps}
          onClick={onNext}
          className="tour-next"
          label={labels.next}
          primary
        />
      </div>

      <div className="dialog-footer-control">
        {
          currentStep !== totalSteps && (
            <Button
              onClick={onSkip}
              className="tour-skip"
              label={labels.skip}
            />
          )
        }

        {
          (!required || currentStep === totalSteps) && (
            <Button
              onClick={onEnd}
              className="tour-end"
              label={labels.end}
              primary={currentStep === totalSteps}
            />
          )
        }
      </div>
    </div>
  </div>
);
