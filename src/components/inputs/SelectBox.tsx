import { useEffect, useRef, useState } from "react";
import "./selectbox.scss";
import useClickOutside from "../../hooks/useClickOutside";
import ConditionalRendering from "../layouts/ConditionalRendering";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";
import Input from "./input-field/InputFiled";

export type IOption = {
  id: number;
  name: string;
  value?: string;
  description?: string;
};

export interface ISelectBoxProps {
  value: IOption | IOption[] | null;
  onChange: (option: IOption | IOption[]) => void;
  options: IOption[];
  variants?: "contained" | "outlined" | undefined;
  disabled?: boolean;
  position?: "top" | "bottom";
  className?: {
    dropdown?: string;
    label?: string;
    container?: string;
    item?: string;
  };
  searchable?: boolean;
  hasDescription?: boolean;
  isMulti?: boolean;
}

const SelectBox: React.FC<ISelectBoxProps> = ({
  value,
  onChange,
  options,
  disabled,
  position,
  className,
  searchable = true,
  isMulti = false,
}) => {
  const containerRef = useRef(null);
  const scrollContainer = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IOption | IOption[] | null>(null);
  const [optionsSt, setOptionsSt] = useState<IOption[]>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (option: IOption) => {
    if (isMulti) {
      const selectedArray = Array.isArray(selected) ? [...selected] : [];
      const exists = selectedArray.some((o) => o.id === option.id);

      const newSelection = exists
        ? selectedArray.filter((o) => o.id !== option.id)
        : [...selectedArray, option];

      setSelected(newSelection);
      onChange(newSelection);
      setQuery("");
    } else {
      setSelected(option);
      setQuery(option.name);
      onChange(option);
      handleClose();
    }

    if (!isMulti) handleClose();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useClickOutside(containerRef, handleClose);

  useEffect(() => {
    setSelected(value);
    if (isMulti && Array.isArray(value)) {
      setQuery("");
    } else {
      setQuery((value as IOption)?.name || "");
    }
  }, [value]);

  useEffect(() => {
    setOptionsSt(
      options?.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, selected, options]);

  useEffect(() => {
    if (!open) {
      if (isMulti) {
        setQuery("");
      } else {
        setQuery((selected as IOption)?.name || "");
      }
      return;
    }

    if (!isMulti) {
      const targetEl = document.getElementById(
        `select_option_${(selected as IOption)?.id}`
      );
      scrollContainer.current?.scrollTo({
        top: targetEl?.offsetTop ?? 0,
        behavior: "instant",
      });
    }
  }, [open, selected]);

  const isSelected = (option: IOption) => {
    if (isMulti && Array.isArray(selected)) {
      return selected.some((s) => s.id === option.id);
    }
    return (selected as IOption)?.id === option.id;
  };

  const displayValue = () => {
    if (isMulti && Array.isArray(selected)) {
      return selected.map((s) => s.name).join(", ") || "Please select ...";
    }
    return query || "Please select ...";
  };

  return (
    <div
      ref={containerRef}
      className={`selectbox-container ${className?.container ?? ""}`}
    >
      <ConditionalRendering render={searchable ? !open : true}>
        <button
          disabled={disabled}
          onClick={handleOpen}
          onFocus={handleOpen}
          type="button"
          className={`selectbox-button ${!query ? "placeholder" : ""} ${
            className?.label ?? ""
          }`}
        >
          <p className="selectbox-value-display">{displayValue()}</p>
        </button>
      </ConditionalRendering>

      <ConditionalRendering render={searchable ? open : false}>
        <Input
          type="text"
          value={query}
          onFocus={handleOpen}
          onChange={handleQueryChange}
          autoComplete="off"
          aria-autocomplete="none"
          autoFocus
          name={`input_${Math.random().toString(36).substr(2, 9)}`}
          className={`selectbox-input ${className?.label ?? ""}`}
          disabled={disabled}
          placeholder="Please select ..."
        />
      </ConditionalRendering>

      <div className={`selectbox-icon ${open ? "open" : ""}`}>
        <IoChevronDownOutline size={15} />
      </div>

      {open && (
        <div
          className={`selectbox-dropdown ${position === "top" ? "top" : ""} ${
            className?.dropdown ?? ""
          }`}
        >
          <ul ref={scrollContainer} className="selectbox-options">
            {optionsSt && optionsSt.length ? (
              optionsSt.map((option) => (
                <li key={option.id} id={`select_option_${option.id}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`selectbox-item ${
                      isSelected(option) ? "selected" : ""
                    } ${className?.item ?? ""}`}
                  >
                    {option.name}
                    <ConditionalRendering render={!!option.description}>
                      <span className="description">
                        ({option.description})
                      </span>
                    </ConditionalRendering>

                    <ConditionalRendering render={isSelected(option)}>
                      <IoCheckmarkOutline />
                    </ConditionalRendering>
                  </button>
                </li>
              ))
            ) : (
              <li className="selectbox-empty">Nothing was found!</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectBox;
