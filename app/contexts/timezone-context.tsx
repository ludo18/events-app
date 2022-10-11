import { createContext, useReducer } from 'react';
import timezones from '@/lib/data/timezones.json';
import Cookies from 'js-cookie';

interface TimezoneState {
  timezone: {
    timezone: string;
    currentOffset: number;
    realOffset: number;
  };
}

const getRealOffset = () => {
  return -(new Date().getTimezoneOffset() / 60);
};
const realOffset = getRealOffset();

const initialState: TimezoneState = {
  timezone: Cookies.get('timezone')
    ? JSON.parse(Cookies.get('timezone'))
    : {
        timezone: null,
        currentOffset: realOffset,
        realOffset,
      },
};

export const TimezoneContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'TIMEZONE_UPDATE': {
      const { timezone } = action.payload;
      const offset = timezones[timezone]?.offset ?? state.timezone?.realOffset;
      const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set(
        'timezone',
        JSON.stringify({
          ...state.timezone,
          timezone,
          currentOffset: offset,
        }),
        { expires: inFifteenMinutes }
      );
      const newState: TimezoneState = {
        ...state,
        timezone: { ...state.timezone, timezone, currentOffset: offset },
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
