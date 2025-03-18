import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
  return (
    <div>
      <div className="flex justify-between items-center bg-[#3d3d3d] rounded-lg p-2">
        <div className="flex gap-3 items-center">
          <div className="p-3 bg-[#454545] rounded-lg">
            <img
              className="h-9"
              src={`/Icons/${props.name}.png`}
              alt="Company Logo"
            />
          </div>
          <div>
            <div className="font-semibold text-lg text-white">{props.name}</div>
            <div className="text-sm text-[#b0b0b0]">
              {props.employees} Employees
            </div>
          </div>
        </div>
        <ActionIcon
          color="brightSun.4"
          variant="subtle"
        >
          <IconExternalLink />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CompanyCard;
