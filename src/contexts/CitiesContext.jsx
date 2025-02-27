import { createContext, useReducer, useEffect, useContext } from "react";

const CitiesContext = createContext();

const Base_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload]
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload)
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type.`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Failed to fetch cities" });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Failed to fetch city" });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${Base_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCity)
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Failed to create city" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "DELETE"
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Failed to delete city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        getCity,
        cities,
        isLoading,
        currentCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
