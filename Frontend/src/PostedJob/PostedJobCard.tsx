import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = (props: any) => {
  const { id } = useParams();

  return (
    <Link
      to={`/posted-job/${props.id}`}
      className={`bg-[#3d3d3d] rounded-xl p-2 border-l-2 border-l-[#ffbd20] ${
        props.id == id
          ? "bg-[#ffbd20] text-black"
          : "bg-[#3d3d3d] text-[#b0b0b0]"
      }`}
    >
      <div className="text-[16px] font-semibold">{props.jobTitle}</div>
      <div className="text-sm  font-medium">
        {props.location ? props.location : ""}
      </div>
      <div className="text-sm ">
        {props.jobStatus == "DRAFT"
          ? "Drafted"
          : props.jobStatus == "CLOSE"
          ? "Close"
          : "Posted"}{" "}
        {timeAgo(props.postTime)}
      </div>
    </Link>
  );
};

export default PostedJobCard;
