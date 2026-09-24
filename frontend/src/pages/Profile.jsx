import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <Link to="/dashboard" className="back-home">
          ← Dashboard
        </Link>

        <h1>My Profile</h1>

        <p>
          Manage your personal information and opportunity preferences.
        </p>
      </header>

      <section className="profile-card">
        <div className="profile-top">
          <div className="large-profile-avatar">
            JN
          </div>

          <div>
            <h2>Joshua Nyamekye</h2>
            <p>Student</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>

          <div className="profile-grid">
            <div className="profile-field">
              <label>Full Name</label>
              <input
                type="text"
                value="Joshua Nyamekye"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                value="joshua@example.com"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label>Location</label>
              <input
                type="text"
                value="Accra, Ghana"
                readOnly
              />
            </div>

            <div className="profile-field">
              <label>Education</label>
              <input
                type="text"
                value="Electrical & Electronics Engineering"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Opportunity Interests</h3>

          <div className="interest-tags">
            <span>Engineering</span>
            <span>Technology</span>
            <span>Energy</span>
            <span>Internships</span>
            <span>Jobs</span>
            <span>Training</span>
          </div>
        </div>

        <div className="profile-actions">
          <button type="button">
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;