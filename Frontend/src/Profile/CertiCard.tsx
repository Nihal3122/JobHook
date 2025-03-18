import { ActionIcon } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { formateDate } from "../Services/Utilities";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";

const CertiCard = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const handleDelete = () => {
    let certi = [...profile.certifications];
    certi.splice(props.index, 1);
    let updatedProfile = { ...profile, certifications: certi };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate Deleted Successfully");
  };
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
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-[16px] text-[#b0b0b0]">
            {formateDate(props.issueDate)}
          </div>
          <div className="text-[16px] text-[#b0b0b0]">
            ID : {props.certificateId}
          </div>
        </div>
        {props.edit && (
          <ActionIcon
            onClick={handleDelete}
            variant="subtle"
            size="lg"
            radius="lg"
            color="red.8"
          >
            <IconTrash className="w-4/5 h-4/5 " stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertiCard;
