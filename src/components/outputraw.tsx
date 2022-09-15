import { useAppSelector } from "store/hooks";

const OutputRaw = () => {
  const { building_outputs } = useAppSelector((state) => state);

  return (
    <div>
      {building_outputs.annual_carbon_by_year_by_fuel ? (
        building_outputs.annual_carbon_by_year_by_fuel.map((e, i) => {
          return <div key={i}>{`${e.year}: ${e.consumption.elec}`}</div>;
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export { OutputRaw };
