import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const EmployeesComp = () => {
  return (
    <div className=" mt-10  flex flex-wrap gap-y-10 gap-12">
      {talents.map((talent, index) => index < 6 && <TalentCard {...talent} />)}
    </div>
  );
};

export default EmployeesComp;
