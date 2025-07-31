
import React, { createContext, useContext, useState } from "react";
import { ViViAgent } from "./ViViAgent";

const ViViContext = createContext(null);

export const ViViProvider = ({ children }) => {
  const [vivi] = useState(new ViViAgent("medspa", "Austin, TX"));
  return (
    <ViViContext.Provider value={vivi}>
      {children}
    </ViViContext.Provider>
  );
};

export const useViVi = () => useContext(ViViContext);
