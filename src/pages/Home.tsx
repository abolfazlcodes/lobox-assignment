import { useState } from "react";
import SelectBox, { IOption } from "../components/inputs/SelectBox";
import Header from "../components/layouts/Header";
import PageWrapper from "../components/layouts/PageWrapper";

const HomePage = () => {
  const [selectedChequeOption, setSelectedChequeOption] =
    useState<IOption | null>(null);

  const handleChequeOptionChange = (option: IOption) => {
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
            options={[
              {
                id: 1,
                name: "education",
              },
              {
                id: 2,
                name: "art",
              },
              {
                id: 3,
                name: "sport",
              },
            ]}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
