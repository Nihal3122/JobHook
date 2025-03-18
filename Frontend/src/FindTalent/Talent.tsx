import { useEffect, useState } from "react";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talent = () => {
  const [talents, setTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const filter = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtereTalent = talents;
    if (filter.name) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter["Job Title"].some((title: any) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Location && filter.Location.length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter.Location.some((location: any) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Skills && filter.Skills.length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter.Skills.some((skills: any) =>
          talent.skills?.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skills.toLowerCase())
          )
        )
      );
    }
    if (filter.exp && filter.exp.length > 0) {
      filtereTalent = filtereTalent.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );
    }

    setFilteredTalents(filtereTalent);
  }, [filter, talents]);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Talents</div>
      </div>
      <div className=" mt-10  flex flex-wrap gap-5 ">
        {filteredTalents.length ? (
          filteredTalents.map((talent: any, index: any) => (
            <TalentCard {...talent} key={index} />
          ))
        ) : (
          <div className="text-2xl font-semiboldF">No Talents Found</div>
        )}
      </div>
    </div>
  );
};

export default Talent;
