import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, ...restProps }) => (
  <button className="custom-button" {...restProps}>
    <span>{children}</span>
  </button>
);

export default CustomButton;
