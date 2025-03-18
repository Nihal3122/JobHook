import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import ApplyJob from "./ApplyJob";
import CompanyPage from "./CompanyPage";
import FindJobs from "./FindJobs";
import FindTalentPage from "./FindTalentPage";
import JobDetailPage from "./JobDetailPage";
import ProfilePage from "./ProfilePage";
import TalentProfilePage from "./TalentProfilePage";
import PostedJobPage from "./PostedJobPage";
import SignUpPage from "./SignUpPage";
import JobHistoryPage from "./JobiHstoryPage";
import PostJobPage from "./PostJobPage";
import HomePage from "./HomePage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import { useSelector } from "react-redux";
import PageNotFoundPage from "../NotAuthorized/PageNotFoundPage";

export const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/posted-job/:id" element={<PostedJobPage />} />
          <Route path="/job-dashboard" element={<JobHistoryPage />} />
          <Route path="/post-job/:id" element={<PostJobPage />} />

          {/* Redirect to Home if User is Logged In */}
          <Route
            path="/sign-up"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />

          {/* Handle Unknown Routes */}
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
