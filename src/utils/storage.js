function getStorage() {
  const persistData = localStorage.getItem('reactReduxTour');
  return persistData ? JSON.parse(persistData) : {};
}

function setStorage(persistData) {
  localStorage.setItem('reactReduxTour', JSON.stringify(persistData));
}

export function get(name) {
  const persistData = getStorage();
  return persistData[name];
}

export function merge(name, data) {
  const persistData = getStorage();
  persistData[name] = {
    ...persistData[name],
    ...data
  };
  setStorage(persistData);
  return persistData[name];
}
