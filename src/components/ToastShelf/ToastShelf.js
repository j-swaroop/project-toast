import React, { useContext, useEffect } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const toastContext = useContext(ToastContext);
  const { toastsArr, removeAllToasts } = toastContext;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Tab") {
        removeAllToasts();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // console.log("Toast Shelf");

  // const { toastsArr, onClickRemoveToast } = props;
  return (
    <ol className={styles.wrapper}>
      {toastsArr.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            id={toast.id}
            variant={toast.variant}
            // onClickRemoveToast={onClickRemoveToast}
          >
            {toast.content}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
