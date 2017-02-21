export const INIT = '@reactReduxTour/MODULE/INIT';
export const GOTO = '@reactReduxTour/MODULE/GOTO';
export const SKIP = '@reactReduxTour/MODULE/SKIP';
export const END = '@reactReduxTour/MODULE/END';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  console.log(action.type, action);
  switch (action.type) {
    case INIT:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          current: 1,
          ...action.data
        }
      };

    case GOTO:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          current: action.step
        }
      };

    case SKIP:
    case END:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          current: 0,
          hide: true
        }
      };

    default:
      return state;
  }
}

export function init(name, data = {}) {
  return {
    type: INIT,
    name,
    data
  };
}

export function goto(name, step) {
  return {
    type: GOTO,
    name,
    step
  };
}

export function skip(name) {
  return {
    type: SKIP,
    name
  };
}

export function end(name) {
  return {
    type: END,
    name
  };
}
