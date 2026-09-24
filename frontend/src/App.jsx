import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import Opportunities from "./pages/Opportunities";
import Saved from "./pages/Saved";
import OpportunityDetails from "./pages/OpportunityDetails";
import Applications from "./pages/Applications";
import Reminders from "./pages/Reminders";
import Channels from "./pages/Channels";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderOpportunities from "./pages/ProviderOpportunities";
import CreateOpportunity from "./pages/CreateOpportunity";
import ProviderChannels from "./pages/ProviderChannels";
import ProviderApplications from "./pages/ProviderApplications";
import ProviderProfile from "./pages/ProviderProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProviders from "./pages/AdminProviders";
import AdminOpportunities from "./pages/AdminOpportunities";
import AdminChannels from "./pages/AdminChannels";
import AdminReports from "./pages/AdminReports";

function Home() {
  return (
    <div>
      <nav>
        <div>
          <h2>UniReach</h2>
        </div>

        <div>
          <a href="#opportunities">Explore</a>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>Discover Opportunities That Matter to You</h1>

          <p>
            Find jobs, internships, scholarships, events and other
            opportunities in one organized platform.
          </p>

          <div className="hero-buttons">
            <a href="#opportunities" className="hero-secondary-button">
              Find Opportunities
            </a>

            <Link to="/signup" className="hero-primary-button">
              Get Started
            </Link>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How UniReach Works</h2>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Discover</h3>
              <p>
                Find opportunities that match your interests and career goals.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Subscribe</h3>
              <p>
                Follow channels that interest you and receive relevant updates.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Apply</h3>
              <p>
                Save opportunities, set reminders and apply before deadlines.
              </p>
            </div>
          </div>
        </section>

        <section className="categories" id="opportunities">
          <h2>Explore Opportunities</h2>

          <p className="categories-intro">
            Find opportunities across different fields and career paths.
          </p>

          <div className="category-grid">
            <div className="category-card">
              <h3>Jobs</h3>
              <p>
                Discover job opportunities from companies and organizations.
              </p>
            </div>

            <div className="category-card">
              <h3>Internships</h3>
              <p>
                Find internships that help you gain practical experience.
              </p>
            </div>

            <div className="category-card">
              <h3>Scholarships</h3>
              <p>
                Explore scholarships and educational opportunities.
              </p>
            </div>

            <div className="category-card">
              <h3>Tech Opportunities</h3>
              <p>
                Discover opportunities from tech companies and communities.
              </p>
            </div>

            <div className="category-card">
              <h3>Training</h3>
              <p>
                Find courses, bootcamps and professional development programs.
              </p>
            </div>

            <div className="category-card">
              <h3>Events</h3>
              <p>
                Stay updated on conferences, workshops and networking events.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<StudentDashboard />} />

      <Route path="/opportunities" element={<Opportunities />} />

      <Route path="/saved" element={<Saved />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/channels" element={<Channels />} />

      <Route path="/reminders" element={<Reminders />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/provider" element={<ProviderDashboard />} />
      <Route
  path="/admin/reports"
  element={<AdminReports />}
/>
      <Route
  path="/admin/channels"
  element={<AdminChannels />}
/>

      <Route
  path="/admin/opportunities"
  element={<AdminOpportunities />}
/>

      <Route
  path="/admin/providers"
  element={<AdminProviders />}
/>

      <Route
  path="/admin/users"
  element={<AdminUsers />}
/>

      <Route
  path="/admin"
  element={<AdminDashboard />}
/>

      <Route
  path="/provider/profile"
  element={<ProviderProfile />}
/>

      <Route
  path="/provider/applications"
  element={<ProviderApplications />}
/>

      <Route
  path="/provider/channels"
  element={<ProviderChannels />}
/>

      <Route
  path="/provider/create-opportunity"
  element={<CreateOpportunity />}
/>




      <Route
  path="/provider/opportunities"
  element={<ProviderOpportunities />}
/>

      <Route
        path="/opportunities/:id"
        element={<OpportunityDetails />}
      />
    </Routes>
  );
}

export default App;