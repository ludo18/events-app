import { createContext, useReducer } from 'react';

interface TimezoneState {
  timezone: string;
  currentOffset: number;
  realOffset: number;
}

const getRealOffset = () => {
  return -(new Date().getTimezoneOffset() / 60);
};
const realOffset = getRealOffset();
const initialState: TimezoneState = {
  timezone: 'BROWSER_DETECTED_TIMEZONE',
  currentOffset: realOffset,
  realOffset,
};

export const TimezoneContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'TIMEZONE_UPDATE': {
      const { timezone, offset } = action.payload;
      const newState: TimezoneState = {
        ...state,
        timezone,
        currentOffset: offset,
      };
      return newState;
    }
    default:
      return state;
  }
}

//StoreProvider acts as a wrapper to make available Store.Provider to all the children.
export function TimezoneContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <TimezoneContext.Provider value={value}>
      {children}
    </TimezoneContext.Provider>
  );
}
