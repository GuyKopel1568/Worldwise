import { createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

const Base_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        throw new Error("Failed to fetch cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider vlaue={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
