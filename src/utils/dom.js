export function offset(element) {
  let top = 0;
  let left = 0;

  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left
  };
}

export function dimensions(element) {
  const data = element.getBoundingClientRect();
  if (data && data.height && data.width) {
    return {
      height: data.height,
      width: data.width
    };
  } else {
    return {};
  }
}
