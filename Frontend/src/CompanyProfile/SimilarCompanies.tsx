import { similar } from "../Data/Company";
import CompanyCard from "./CompanyCard";

const SimilarCompanies = () => {
  return (
    <div className="w-1/4 p-5">
      <div className="text-xl font-semibold mb-5">Similar Companies</div>
      <div className="flex flex-col flex-wrap gap-5">
        {similar.map((company: any, index: any) => (
          <CompanyCard key={index} {...company} />
        ))}
      </div>
    </div>
  );
};

export default SimilarCompanies;
