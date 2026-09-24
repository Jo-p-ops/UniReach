import { Link } from "react-router-dom";

function ProviderDashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>UniReach</h2>
          <span>Provider Portal</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/provider" className="active">
            <span>🏠</span>
            Dashboard
          </Link>

          <Link to="/provider/opportunities">
            <span>📢</span>
            My Opportunities
          </Link>

          <Link to="/provider/create-opportunity">
            <span>➕</span>
            Post Opportunity
          </Link>

          <Link to="/provider/channels">
            <span>📣</span>
            My Channels
          </Link>

          <Link to="/provider/applications">
            <span>📄</span>
            Applications
          </Link>

          <Link to="/provider/profile">
            <span>👤</span>
            Organization Profile
          </Link>
        </nav>

        <Link to="/" className="logout">
          <span>↪</span>
          Logout
        </Link>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-label">PROVIDER DASHBOARD</p>

            <h1>Welcome back, Tech Company Ghana 👋</h1>

            <p>
              Manage your opportunities and connect with qualified candidates.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="profile-avatar">
              TC
            </div>

            <div>
              <strong>Tech Company Ghana</strong>
              <span>Opportunity Provider</span>
            </div>
          </div>
        </header>

        <section className="dashboard-search">
          <div>
            <h2>Post a new opportunity</h2>

            <p>
              Reach students and job seekers looking for their next
              opportunity.
            </p>
          </div>

          <Link
            to="/provider/create-opportunity"
            className="dashboard-search-button"
          >
            + Post Opportunity
          </Link>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📢</div>

            <div>
              <h3>12</h3>
              <p>Active Opportunities</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👁️</div>

            <div>
              <h3>1,248</h3>
              <p>Total Views</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>

            <div>
              <h3>86</h3>
              <p>Applications</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📣</div>

            <div>
              <h3>4</h3>
              <p>Channels</p>
            </div>
          </div>
        </section>

        <section className="recent-opportunities">
          <div className="section-heading">
            <div>
              <h2>Recent Opportunities</h2>

              <p>
                Manage your recently published opportunities.
              </p>
            </div>

            <Link to="/provider/opportunities">
              View All →
            </Link>
          </div>

          <div className="opportunity-list">

            <div className="opportunity-card">
              <div className="opportunity-card-top">
                <span className="opportunity-category">
                  Internship
                </span>

                <span className="application-status applied">
                  Active
                </span>
              </div>

              <h3>
                Software Engineering Internship
              </h3>

              <p>
                Gain practical experience working with a technology
                team and develop your software engineering skills.
              </p>

              <div className="dashboard-opportunity-meta">
                <span>👁️ 520 views</span>
                <span>📄 32 applications</span>
              </div>

              <div className="opportunity-card-bottom">
                <small>
                  Deadline: October 15, 2026
                </small>

                <Link
                  to="/provider/opportunities"
                  className="small-view-button"
                >
                  Manage
                </Link>
              </div>
            </div>


            <div className="opportunity-card">
              <div className="opportunity-card-top">
                <span className="opportunity-category">
                  Job
                </span>

                <span className="application-status under-review">
                  Active
                </span>
              </div>

              <h3>
                Junior Software Developer
              </h3>

              <p>
                Entry-level software development opportunity for
                graduates and early-career professionals.
              </p>

              <div className="dashboard-opportunity-meta">
                <span>👁️ 380 views</span>
                <span>📄 21 applications</span>
              </div>

              <div className="opportunity-card-bottom">
                <small>
                  Deadline: October 25, 2026
                </small>

                <Link
                  to="/provider/opportunities"
                  className="small-view-button"
                >
                  Manage
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="deadline-section">
          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Manage your provider account.
              </p>
            </div>
          </div>

          <div className="deadline-list">

            <div className="deadline-item">
              <div className="deadline-date">
                <strong>+</strong>
                <span>POST</span>
              </div>

              <div>
                <h3>Post Opportunity</h3>
                <p>
                  Create a new opportunity for students and job seekers.
                </p>
              </div>

              <Link
                to="/provider/create-opportunity"
                className="view-button"
              >
                Create
              </Link>
            </div>


            <div className="deadline-item">
              <div className="deadline-date">
                <strong>📣</strong>
                <span>CHANNEL</span>
              </div>

              <div>
                <h3>Manage Channels</h3>
                <p>
                  Create and manage your opportunity channels.
                </p>
              </div>

              <Link
                to="/provider/channels"
                className="view-button"
              >
                Manage
              </Link>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default ProviderDashboard;