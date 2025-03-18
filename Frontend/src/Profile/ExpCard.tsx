import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formateDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpCard = (props: any) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    let updatedProfile = { ...profile, experiences: exp };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Experience Deleted Successfully");
  };
  return !edit ? (
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
          {formateDate(props.startDate)} -{" "}
          {props.working ? "Present" : formateDate(props.endDate)}
        </div>
      </div>
      <div className="text-[15px] text-[#b0b0b0] text-justify">
        {props.description}
      </div>
      {props?.edit && (
        <div className="flex gap-5">
          <Button
            onClick={() => setEdit(true)}
            color="brightSun.4"
            variant="outline"
          >
            Edit
          </Button>
          <Button onClick={handleDelete} color="red.8" variant="light">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput {...props} setEdit={setEdit} />
  );
};

export default ExpCard;
