import { useState } from "react";
import { Combobox, useCombobox } from "@mantine/core";
import { IconAdjustmentsAlt } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateSort } from "../Slices/SortSlice";

const opt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

const Sort = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className="text-xl" value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={180}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div
            onClick={() => combobox.toggleDropdown()}
            className="border border-[#ffbd20] flex items-center p-2 rounded-xl cursor-pointer gap-2"
          >
            {selectedItem}{" "}
            <IconAdjustmentsAlt className="text-[#ffbd20] h-5 w-5" />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export default Sort;
