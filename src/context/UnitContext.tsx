import React, { createContext, useMemo, useState } from "react";

interface UnitContextType {
  temperatureType: 'celsius' | 'fahrenheit'
  setTemperatureType: (type: 'celsius' | 'fahrenheit') => () => void
}

const UnitContext = createContext<UnitContextType | null>(null);

interface UnitProviderProps {
  children: React.ReactNode
}

export const useUnitContext = () => {
  const context = React.useContext(UnitContext);
  if (!context) {
    throw new Error('useUnitContext must be used within a UnitProvider');
  }
  return context;
}

export const UnitProvider: React.FC<UnitProviderProps> = ({ children }) => {
  const [temperatureType, setTemperatureType] = useState<UnitContextType['temperatureType']>('celsius');

  const value = useMemo(() => ({
    temperatureType,
    setTemperatureType: (type: typeof temperatureType) => () => setTemperatureType(type)
  }), [temperatureType])

  return (
    <UnitContext.Provider value={value}>
      {children}
    </UnitContext.Provider>
  );
};
