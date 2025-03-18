import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { updateFilter } from "../Slices/FilterSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([1, 300]);
  const dispatch = useDispatch();
  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };
  return (
    <div className="flex px-5 py-8 gap-2">
      {dropdownData.map((item, index) => (
        <>
          <div className="w-1/5" key={index}>
            <MultiInput {...item} />
          </div>
          <Divider mr={"xs"} size="sm" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between ">
          <div>Salary</div>
          <div>
            ₹ {value[0]} LPA - ₹{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          color="brightSun.4"
          size={"xs"}
          value={value}
          min={0}
          max={300}
          onChange={setValue}
          onChangeEnd={handleChange}
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
