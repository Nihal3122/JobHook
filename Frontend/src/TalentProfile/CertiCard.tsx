import { formateDate } from "../Services/Utilities";

const CertiCard = (props: any) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="p-3 bg-[#454545] rounded-lg">
          <img
            className="h-9"
            src={`/Icons/${props.issuer}.png`}
            alt="Company Logo"
          />
        </div>
        <div>
          <div className="font-semibold text-lg text-white">{props.name}</div>
          <div className="text-[16px] text-[#b0b0b0]">{props.issuer}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[16px] text-[#b0b0b0]">
          {formateDate(props.issueDate)}
        </div>
        <div className="text-[16px] text-[#b0b0b0]">
          ID : {props.certificateId}
        </div>
      </div>
    </div>
  );
};

export default CertiCard;
