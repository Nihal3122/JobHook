import { formateDate } from "../Services/Utilities";

const ExpCard = (props: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-3 bg-[#454545] rounded-lg">
            <img
              className="h-9"
              src={`/Icons/${props.company}.png`}
              alt="Company Logo"
            />
          </div>
          <div>
            <div className="font-semibold text-lg text-white">
              {props.title}
            </div>
            <div className="text-[16px] text-[#b0b0b0]">
              {props.company} • {props.location}
            </div>
          </div>
        </div>
        <div className="text-[16px] text-[#b0b0b0]">
          {formateDate(props.startDate)} - {formateDate(props.endDate)}
        </div>
      </div>
      <div className="text-[15px] text-[#b0b0b0] text-justify">
        {props.description}
      </div>
    </div>
  );
};

export default ExpCard;
