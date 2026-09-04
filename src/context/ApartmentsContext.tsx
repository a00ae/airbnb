import React, { createContext, useContext } from "react";
import { useApartments } from '../hook/useApartments'
// استخراج نوع البيانات المرجعة من الهوك
type ApartmentsContextType = ReturnType<typeof useApartments>;

const ApartmentsContext = createContext<ApartmentsContextType | null>(null);

export const ApartmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const apartmentsData = useApartments();
  return (
    <ApartmentsContext.Provider value={apartmentsData}>
      {children}
    </ApartmentsContext.Provider>
  );
};

export const useApartmentsContext = () => {
  const context = useContext(ApartmentsContext);
  if (!context) {
    throw new Error("useApartmentsContext must be used within ApartmentsProvider");
  }
  return context;
};