import { useState } from "react";

import { SearchContext } from "./searchContext.js";

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
