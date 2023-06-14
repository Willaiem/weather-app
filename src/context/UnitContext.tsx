import React, { createContext, useState } from "react";

interface UnitContextType {
  isMetric: boolean;
  toggleUnit: () => void;
}

export const UnitContext = createContext<UnitContextType>({
  isMetric: true,
  toggleUnit: () => {},
});

interface UnitProviderProps {
  children: React.ReactNode;
}

export const UnitProvider: React.FC<UnitProviderProps> = ({ children }) => {
  const [isMetric, setIsMetric] = useState(true);

  const toggleUnit = () => {
    setIsMetric((prevIsMetric) => !prevIsMetric);
  };

  return (
    <UnitContext.Provider value={{ isMetric, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};
