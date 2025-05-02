import { useEffect, useRef, useState } from "react";
import "./selectbox.scss";
import useClickOutside from "../../hooks/useClickOutside";
import ConditionalRendering from "../layouts/ConditionalRendering";
import { IoChevronDownOutline } from "react-icons/io5";
import Input from "./input-field/InputFiled";

export type IOption = {
  id: number;
  name: string;
  value?: string;
  description?: string;
};

export interface ISelectBoxProps {
  value: IOption | null;
  onChange: (option: IOption) => void;
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
}

const SelectBox: React.FC<ISelectBoxProps> = ({
  value,
  onChange,
  options,
  disabled,
  position,
  className,
  searchable = true,
}) => {
  const containerRef = useRef(null);
  const scrollContainer = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<IOption | null>();
  const [optionsSt, setOptionsSt] = useState<IOption[]>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (option: IOption) => {
    setSelected(option);
    setQuery(option.name);
    onChange(option);
    handleClose();
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useClickOutside(containerRef, handleClose);

  useEffect(() => {
    setSelected(value);
    setQuery(value?.name || "");
  }, [value]);

  useEffect(() => {
    if (selected?.name !== query) {
      setOptionsSt(options?.filter(({ name }) => name.includes(query)));
    } else {
      setOptionsSt(options);
    }
  }, [query, selected, options]);

  useEffect(() => {
    if (!open) {
      setQuery(selected?.name || "");
      return;
    }

    const targetEl = document.getElementById(`select_option_${selected?.id}`);
    scrollContainer.current?.scrollTo({
      top: targetEl?.offsetTop ?? 0,
      behavior: "instant",
    });
  }, [open, selected]);

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
          <p className="line-clamp-1">{query || "Please select ..."}</p>
        </button>
      </ConditionalRendering>

      {/* Uncomment and integrate this if you want searchable input */}
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
        <IoChevronDownOutline />
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
                      selected?.id === option.id ? "selected" : ""
                    } ${className?.item ?? ""}`}
                  >
                    {option.name}
                    <ConditionalRendering render={!!option.description}>
                      <span className="description">
                        ({option.description})
                      </span>
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
