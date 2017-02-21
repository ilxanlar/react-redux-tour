export function ease(start, end, cb, duration, complete = null) {
  const startTime = Date.now();
  const diff = end - start;

  function step() {
    const elapsed = Date.now() - startTime;
    const t = elapsed / duration;
    let value = t * diff + start;

    if ((diff > 0 && value >= end) || (diff <= 0 && value <= end)) {
      value = end;
    } else {
      requestAnimationFrame(step);
    }

    cb(value);

    if (value === end && complete) {
      complete();
    }
  }

  requestAnimationFrame(step);
}
