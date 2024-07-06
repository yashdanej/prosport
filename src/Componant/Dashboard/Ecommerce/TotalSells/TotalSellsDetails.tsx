import { H2, P } from "../../../../AbstractElements";

const TotalSellsDetails = ({data}:any) => {
  return (
    <div className="">
      <H2>{data?.data[0]?.api_hits}</H2>
      <P className="text-truncate"><b>Expiry Date:</b> {data.data[0]?.expire_date.split("T")[0]}</P>
    </div>
  );
};

export default TotalSellsDetails;
