import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);

  const isApplicant = user?.accountType === "APPLICANT";
  const isEmployer = user?.accountType === "EMPLOYER";

  // Define links based on account type
  const links = [
    ...(isApplicant
      ? [
          { path: "/find-jobs", label: "Find Jobs" },
          { path: "/job-dashboard", label: "Job Dashboard" },
          { path: "/about-us", label: "About Us" },
          { path: "/contact-us", label: "Contact Us" },
        ]
      : []),
    ...(isEmployer
      ? [
          { path: "/find-talent", label: "Find Talent" },
          { path: "/post-job/0", label: "Post Job" },
          { path: "/posted-job/0", label: "Posted Job" },
          { path: "/about-us", label: "About Us" },
          { path: "/contact-us", label: "Contact Us" },
        ]
      : []),
    ...(user?.accountType === undefined
      ? [
          { path: "/about-us", label: "About Us" },
          { path: "/contact-us", label: "Contact Us" },
        ]
      : []), // Default for non-logged-in users
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap md:flex-row flex-col gap-4 font-normal text-[17px] items-center">
      {links.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`${
            location.pathname === path ? "text-[#ffbd20]" : ""
          } transition hover:text-[#ffbd20]`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
