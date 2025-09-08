"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

type TravelState = {
  hotels: any[];
  flights: any[];
  activities: any[];
};

type TravelAction =
  | { type: "ADD_HOTEL"; payload: any }
  | { type: "ADD_FLIGHT"; payload: any }
  | { type: "ADD_ACTIVITY"; payload: any };

const initialState: TravelState = {
  hotels: [],
  flights: [],
  activities: [],
};

function reducer(state: TravelState, action: TravelAction): TravelState {
  switch (action.type) {
    case "ADD_HOTEL":
      return { ...state, hotels: [...state.hotels, action.payload] };
    case "ADD_FLIGHT":
      return { ...state, flights: [...state.flights, action.payload] };
    case "ADD_ACTIVITY":
      return { ...state, activities: [...state.activities, action.payload] };
    default:
      return state;
  }
}

const TravelContext = createContext<{
  state: TravelState;
  dispatch: React.Dispatch<TravelAction>;
}>({ state: initialState, dispatch: () => {} });

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TravelContext.Provider value={{ state, dispatch }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
