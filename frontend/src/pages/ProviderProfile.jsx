import { Link } from "react-router-dom";

function ProviderProfile() {
  return (
    <div className="provider-profile-page">
      <header className="provider-page-header">
        <Link to="/provider" className="back-home">
          ← Provider Dashboard
        </Link>

        <div>
          <h1>Organization Profile</h1>
          <p>
            Manage your organization information displayed on UniReach.
          </p>
        </div>
      </header>

      <section className="provider-profile-card">
        <div className="provider-profile-top">
          <div className="organization-avatar">
            TC
          </div>

          <div>
            <h2>Tech Company Ghana</h2>
            <p>Technology & Software</p>
            <span className="verified-badge">
              ✓ Verified Provider
            </span>
          </div>
        </div>

        <div className="provider-profile-section">
          <h3>Organization Information</h3>

          <div className="provider-profile-grid">
            <div className="provider-profile-field">
              <label>Organization Name</label>
              <input
                type="text"
                value="Tech Company Ghana"
                readOnly
              />
            </div>

            <div className="provider-profile-field">
              <label>Industry</label>
              <input
                type="text"
                value="Technology & Software"
                readOnly
              />
            </div>

            <div className="provider-profile-field">
              <label>Email Address</label>
              <input
                type="email"
                value="info@techcompanyghana.com"
                readOnly
              />
            </div>

            <div className="provider-profile-field">
              <label>Phone Number</label>
              <input
                type="tel"
                value="+233 24 000 0000"
                readOnly
              />
            </div>

            <div className="provider-profile-field">
              <label>Location</label>
              <input
                type="text"
                value="Accra, Ghana"
                readOnly
              />
            </div>

            <div className="provider-profile-field">
              <label>Website</label>
              <input
                type="url"
                value="https://example.com"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="provider-profile-section">
          <h3>About Organization</h3>

          <textarea
            rows="5"
            value="Tech Company Ghana provides technology solutions and creates opportunities for students, graduates and early-career professionals."
            readOnly
          />
        </div>

        <div className="provider-profile-section">
          <h3>Provider Statistics</h3>

          <div className="provider-profile-stats">
            <div>
              <strong>12</strong>
              <span>Opportunities Posted</span>
            </div>

            <div>
              <strong>1,248</strong>
              <span>Total Views</span>
            </div>

            <div>
              <strong>86</strong>
              <span>Applications</span>
            </div>

            <div>
              <strong>735</strong>
              <span>Subscribers</span>
            </div>
          </div>
        </div>

        <div className="provider-profile-actions">
          <button type="button">
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProviderProfile;