import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>UniReach</h2>
          <span>Admin Portal</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className="active">
            <span>🏠</span>
            Dashboard
          </Link>

          <Link to="/admin/users">
            <span>👥</span>
            Users
          </Link>

          <Link to="/admin/providers">
            <span>🏢</span>
            Providers
          </Link>

          <Link to="/admin/opportunities">
            <span>📢</span>
            Opportunities
          </Link>

          <Link to="/admin/channels">
            <span>📣</span>
            Channels
          </Link>

          <Link to="/admin/reports">
            <span>⚠️</span>
            Reports
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
            <p className="dashboard-label">
              ADMIN DASHBOARD
            </p>

            <h1>
              Welcome back, Admin 👋
            </h1>

            <p>
              Monitor and manage the UniReach opportunity platform.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="profile-avatar">
              AD
            </div>

            <div>
              <strong>UniReach Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              👥
            </div>

            <div>
              <h3>2,480</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              🏢
            </div>

            <div>
              <h3>126</h3>
              <p>Providers</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              📢
            </div>

            <div>
              <h3>584</h3>
              <p>Opportunities</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              ⚠️
            </div>

            <div>
              <h3>8</h3>
              <p>Pending Reviews</p>
            </div>
          </div>
        </section>

        <section className="recent-opportunities">
          <div className="section-heading">
            <div>
              <h2>
                Platform Overview
              </h2>

              <p>
                Review important activity across UniReach.
              </p>
            </div>
          </div>

          <div className="admin-overview-grid">
            <div className="admin-overview-card">
              <span className="admin-overview-icon">
                🏢
              </span>

              <div>
                <h3>Provider Verification</h3>

                <p>
                  5 providers are waiting for verification.
                </p>

                <Link to="/admin/providers">
                  Review Providers →
                </Link>
              </div>
            </div>

            <div className="admin-overview-card">
              <span className="admin-overview-icon">
                📢
              </span>

              <div>
                <h3>Opportunity Moderation</h3>

                <p>
                  3 opportunities are waiting for review.
                </p>

                <Link to="/admin/opportunities">
                  Review Opportunities →
                </Link>
              </div>
            </div>

            <div className="admin-overview-card">
              <span className="admin-overview-icon">
                ⚠️
              </span>

              <div>
                <h3>Reported Content</h3>

                <p>
                  2 reports require administrator attention.
                </p>

                <Link to="/admin/reports">
                  View Reports →
                </Link>
              </div>
            </div>

            <div className="admin-overview-card">
              <span className="admin-overview-icon">
                👥
              </span>

              <div>
                <h3>User Management</h3>

                <p>
                  Manage student and provider accounts.
                </p>

                <Link to="/admin/users">
                  Manage Users →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="deadline-section">
          <div className="section-heading">
            <div>
              <h2>
                Recent Activity
              </h2>

              <p>
                Latest activity on the platform.
              </p>
            </div>
          </div>

          <div className="deadline-list">
            <div className="deadline-item">
              <div className="deadline-date">
                <strong>5</strong>
                <span>NEW</span>
              </div>

              <div>
                <h3>
                  New providers awaiting verification
                </h3>

                <p>
                  5 organizations have submitted verification requests.
                </p>
              </div>

              <Link
                to="/admin/providers"
                className="view-button"
              >
                Review
              </Link>
            </div>

            <div className="deadline-item">
              <div className="deadline-date">
                <strong>3</strong>
                <span>POSTS</span>
              </div>

              <div>
                <h3>
                  Opportunities awaiting moderation
                </h3>

                <p>
                  Review newly submitted opportunities before publication.
                </p>
              </div>

              <Link
                to="/admin/opportunities"
                className="view-button"
              >
                Review
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;