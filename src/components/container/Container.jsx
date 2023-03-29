import React from "react";
import styles from "./container.module.css";
import Model from "../model/model.tsx";
function Container() {
  return (
    <div>
      <div className={styles["cardWrapper"]}>
        <div className={styles["cardGrid"]}>
          <div className={styles["card"]}>
            <Model />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
