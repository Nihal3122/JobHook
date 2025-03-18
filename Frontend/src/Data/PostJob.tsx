const fields = [
  {
    label: "Job Title",
    placeholder: "Enter Job Title",
    options: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Java Developer",
      "Python Developer",
      "React Developer",
      "Software Engineer",
      "Machine Learning Engineer",
      "AI Engineer",
      "Cloud Engineer",
      "UI/UX Designer",
    ],
  },
  {
    label: "Company",
    placeholder: "Enter Company Name",
    options: [
      "Google",
      "Microsoft",
      "Meta",
      "Netflix",
      "Adobe",
      "Facebook",
      "Amazon",
      "Apple",
      "Spotify",
      "Wipro",
      "Infosys",
    ],
  },
  {
    label: "Experience",
    placeholder: "Enter Experience Level",
    options: ["Entry Level", "Intermediate", "Expert"],
  },
  {
    label: "Job Type",
    placeholder: "Enter Job Type",
    options: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
  },
  {
    label: "Location",
    placeholder: "Enter Job Location",
    options: [
      "Ahmedabad",
      "Vadodara",
      "Gandhinagar",
      "Delhi",
      "Bengaluru",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "San Francisco",
      "New York",
    ],
  },
  {
    label: "Salary",
    placeholder: "Enter Salary",
    options: [
      "10 LPA",
      "15 LPA",
      "20 LPA",
      "25 LPA",
      "30 LPA",
      "35 LPA",
      "40 LPA",
      "45 LPA",
    ],
  },
];

const content = `
  <h4>&bull; About The Job</h4>
  <p>Write a compelling job description here, including an overview of the role, company, and expectations.</p>

  <h4>&bull; Responsibilities</h4>
  <ul>
    <li>List key responsibilities of the role.</li>
    <li>Include daily tasks and long-term goals.</li>
    <li>Specify any leadership or collaboration requirements.</li>
  </ul>

  <h4>&bull; Qualifications and Skill Sets</h4>
  <ul>
    <li>Specify the required educational qualifications.</li>
    <li>List the necessary technical and soft skills.</li>
    <li>Include any preferred certifications or experiences.</li>
  </ul>
`;

export { fields, content };
