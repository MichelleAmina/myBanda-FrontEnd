import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  const addPendingDelivery = (order) => {
    setPendingDeliveries((prevDeliveries) => [...prevDeliveries, order]);
  };

  return (
    <OrderContext.Provider value={{ pendingDeliveries, addPendingDelivery }}>
      {children}
    </OrderContext.Provider>
  );
};