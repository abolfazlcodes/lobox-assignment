import React from "react";
import "./input-field.scss";

const variantsLookupTable = {
  contained: "input-contained",
  outlined: "input-outlined",
};

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variants?: "contained" | "outlined";
}

const Input: React.FC<IInputProps> = React.forwardRef(
  (
    {
      className = "",
      type = "text",
      inputMode,
      variants = "outlined",
      ...props
    },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          inputMode={inputMode || (type === "number" ? "numeric" : "text")}
          dir={["number", "email", "text"].includes(type || "") ? "ltr" : "rtl"}
          className={`input remove-arrow ${variantsLookupTable[variants]} ${className}`}
          onWheel={(e) => {
            if (type === "number") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          {...props}
        />
        {/* the place for error handling */}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
