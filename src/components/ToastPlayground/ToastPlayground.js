import React, {
  useState,
  useId,
  useContext,
  useMemo,
  useCallback,
} from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const toastContext = useContext(ToastContext);
  // console.log(toastContext);

  const [selected, setSelected] = useState(VARIANT_OPTIONS[0]);
  const [content, setContent] = useState("");

  // console.log("Toast Play-Ground Rerendered");

  const onAddToast = useMemo(() => {
    console.log("onAddToast from ToastPlayGround");

    return toastContext.onAddToast;
  }, [toastContext]);

  const id = useId();

  const onSubmitForm = (event) => {
    event.preventDefault();

    const newToast = {
      variant: selected,
      content,
    };

    onAddToast(newToast);
    setSelected(VARIANT_OPTIONS[0]);
    setContent("");
  };

  // console.log("Toast Playground");

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={onSubmitForm}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`${id}-${variant}`} key={`${id}-${variant}`}>
                <input
                  id={`${id}-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={selected === variant}
                  onChange={(event) => setSelected(event.target.value)}
                />
                {variant}
              </label>
            ))}

            {/* TODO Other Variant radio buttons here */}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
