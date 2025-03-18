import { Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 30]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleChange = (name: any, event: any) => {
    if (name == "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      setName(event.target.value);
      dispatch(updateFilter({ name: event.target.value }));
    }
  };
  return (
    <div className="flex px-5 py-8 gap-2">
      <div className="flex items-center">
        <div className=" text-[#ffbd20] bg-[#3d3d3d] rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input
          className="[&_input]:!placeholder-[#d1d1d1]"
          variant="unstyled"
          placeholder="Talent Name"
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
        />
        <Divider mr={"xs"} size="sm" orientation="vertical" />
      </div>
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider mr={"xs"} size="sm" orientation="vertical" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between ">
          <div>Experience(Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          color="brightSun.4"
          size={"xs"}
          value={value}
          min={0}
          max={50}
          minRange={1}
          onChangeEnd={(e) => handleChange("exp", e)}
          onChange={setValue}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
