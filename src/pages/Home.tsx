import { useState } from "react";
import SelectBox from "../components/inputs/SelectBox";
import Header from "../components/layouts/Header";
import PageWrapper from "../components/layouts/PageWrapper";
import { STATIC_SELECT_OPTIONS } from "../constants";
import Input from "../components/inputs/input-field/InputFiled";
import { generateUniqueID } from "../utils";
import CardBox from "../components/layouts/CardBox";

const HomePage = () => {
  const [selectOptions, setSelectOptions] = useState<IOption[]>(
    STATIC_SELECT_OPTIONS
  );
  const [selectedOption, setSelectedOption] = useState<
    IOption | IOption[] | null
  >(null);

  const [newSelectQuery, setNewSelectQuery] = useState<string>("");

  const handleOptionChange = (option: IOption | IOption[]) => {
    setSelectedOption(option);
  };

  const changeQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    setNewSelectQuery(value);
  };

  const addNewSelectOptionHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      if (newSelectQuery) {
        const newOption: IOption = {
          id: +generateUniqueID(),
          name: newSelectQuery,
          description: "",
        };

        setSelectOptions((prevState) => [...prevState, newOption]);
      }

      // do clean up
      setNewSelectQuery("");
    }
  };

  return (
    <PageWrapper>
      <Header title="Welcome to Multi-Select Project" />

      <section className="card-wrapper">
        <CardBox>
          <Input
            value={newSelectQuery}
            onChange={changeQueryHandler}
            placeholder="start typing ..."
            onKeyDown={addNewSelectOptionHandler}
          />
        </CardBox>
        <CardBox>
          <SelectBox
            value={selectedOption}
            onChange={handleOptionChange}
            isMulti
            options={selectOptions}
          />
        </CardBox>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
