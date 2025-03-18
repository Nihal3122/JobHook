import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-[#2d2d2d] font-['poppins'] overflow-auto [&::-webkit-scrollbar]:hidden px-4">
      <Divider size="sm" mx={"xs"} className="px-4" />
      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
        my={"md"}
      >
        Back
      </Button>
     <div className="flex justify-between">
     <Company />
     <SimilarCompanies />
     </div>
    </div>
  );
};

export default CompanyPage;
