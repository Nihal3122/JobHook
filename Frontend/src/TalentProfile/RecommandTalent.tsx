import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/TalentCard";

const RecommandTalent = (props: any) => {
  const { id } = useParams();
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommanded Talent</div>
      <div className="flex flex-col flex-wrap gap-5">
        {props.talents?.length > 0 &&
          props.talents.map(
            (talent: any, index: any) =>
              index < 4 &&
              talent.id != id && <TalentCard key={talent.id} {...talent} />
          )}
      </div>
    </div>
  );
};

export default RecommandTalent;
