import { useState } from "react";
import SelectBox, { IOption } from "../components/inputs/SelectBox";
import Header from "../components/layouts/Header";
import PageWrapper from "../components/layouts/PageWrapper";
import { STATIC_SELECT_OPTIONS } from "../constants";

const HomePage = () => {
  const [selectedChequeOption, setSelectedChequeOption] = useState<
    IOption | IOption[] | null
  >(null);

  const handleChequeOptionChange = (option: IOption | IOption[]) => {
    setSelectedChequeOption(option);
  };

  return (
    <PageWrapper>
      <Header title="Welcome to Multi-Select Project" />

      <section className="card-wrapper">
        <div>input section</div>

        <div style={{ width: "100%", padding: "1rem" }}>
          <SelectBox
            value={selectedChequeOption}
            onChange={handleChequeOptionChange}
            isMulti
            options={STATIC_SELECT_OPTIONS}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
