import React, { createContext, useState } from "react";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastsArr, setToastsArr] = useState([]);
  // console.log(children);
  // console.log("Hello");

  const onAddToast = (payload) => {
    // console.log(payload);
    const newToast = {
      ...payload,
      id: crypto.randomUUID(),
    };
    setToastsArr([...toastsArr, newToast]);
  };

  const onRemoveToast = (id) => {
    setToastsArr(toastsArr.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToastsArr([]);
  };

  return (
    <ToastContext.Provider
      value={{ toastsArr, onAddToast, onRemoveToast, removeAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
