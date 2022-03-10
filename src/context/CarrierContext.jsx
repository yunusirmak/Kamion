import { createContext, useState, useContext } from "react";

const CarrierContext = createContext();

export const CarrierProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [carriers, setCarriers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [changed, setChanged] = useState(false);

  const values = {
    carriers,
    setCarriers,
    search,
    setSearch,
    filtered,
    setFiltered,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
    changed,
    setChanged,
  };
  return (
    <CarrierContext.Provider value={values}>{children}</CarrierContext.Provider>
  );
};

export const useCarrier = () => useContext(CarrierContext);
