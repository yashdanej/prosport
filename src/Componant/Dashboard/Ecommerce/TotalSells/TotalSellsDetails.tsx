import { useSelector } from "react-redux";
import { H2, P } from "../../../../AbstractElements";
import { RootState } from "../../../../ReduxToolkit/Store";
import Skeleton from "react-loading-skeleton";

const TotalSellsDetails = ({data}:any) => {
  const plansData = useSelector((state: RootState) => state.subscribe.plans);

  return (
    <>
      {
        data?.data?.length>0 ?
      <div className="">
        <H2 className="pb-2">{data?.data[0]?.api_hits || 0}/{plansData?.data?.find((plan: any) => plan?.id === data?.data[0]?.planId)?.api_calls || <Skeleton/>}</H2>
        <P className="text-truncate"><b>Cricket</b></P>
      </div>:<H2 className="pb-2">Not subscribed</H2>
      }
    </>
  );
};

export default TotalSellsDetails;
