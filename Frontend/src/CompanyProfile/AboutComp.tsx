import { companyData } from "../Data/Company";

const AboutComp = () => {
  const company: { [key: string]: any } = companyData;
  console.log(company);
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company).map(
        (keys, index) =>
          keys != "Name" && (
            <div key={index}>
              <div className="text-xl mb-2 font-semibold">{keys}</div>
              {keys != "Website" && (
                <div className="text-[16px] text-justify text-[#b0b0b0]">
                  {keys != "Specialties"
                    ? company[keys]
                    : company[keys].map((item: string, index: number) => (
                        <span key={index}> &bull; {item}</span>
                      ))}
                </div>
              )}
              {keys == "Website" && (
                <a
                  href={company[keys]}
                  target="_blank"
                  className="text-[16px] text-justify text-[#ffbd20]"
                >
                  {company[keys]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default AboutComp;
