import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>UniReach</h2>
          <span>Opportunity Platform</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="active">
            <span>🏠</span>
            Dashboard
          </Link>

          <Link to="/opportunities">
            <span>🔎</span>
            Opportunities
          </Link>

          <Link to="/channels">
            <span>📢</span>
            Channels
          </Link>

          <Link to="/saved">
            <span>⭐</span>
            Saved
          </Link>

          <Link to="/applications">
            <span>📄</span>
            My Applications
          </Link>

          <Link to="/reminders">
            <span>⏰</span>
            Reminders
          </Link>

          <Link to="/notifications">
            <span>🔔</span>
            Notifications
          </Link>

          <Link to="/profile">
            <span>👤</span>
            Profile
          </Link>
        </nav>

        <Link to="/" className="logout">
          <span>↪</span>
          Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <p className="dashboard-label">STUDENT DASHBOARD</p>

            <h1>Welcome back, Joshua 👋</h1>

            <p>
              Discover opportunities that match your interests and career
              goals.
            </p>
          </div>

          <div className="dashboard-profile">
            <div className="profile-avatar">
              JN
            </div>

            <div>
              <strong>Joshua Nyamekye</strong>
              <span>Student</span>
            </div>
          </div>
        </header>

        {/* Quick Search */}
        <section className="dashboard-search">
          <div>
            <h2>Find your next opportunity</h2>

            <p>
              Search for jobs, internships, scholarships, training and more.
            </p>
          </div>

          <Link to="/opportunities" className="dashboard-search-button">
            Explore Opportunities →
          </Link>
        </section>

        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">🔎</div>

            <div>
              <h3>12</h3>
              <p>New Opportunities</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>

            <div>
              <h3>5</h3>
              <p>Saved Opportunities</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>

            <div>
              <h3>3</h3>
              <p>Applications</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏰</div>

            <div>
              <h3>2</h3>
              <p>Upcoming Deadlines</p>
            </div>
          </div>

        </section>

        {/* Recent Opportunities */}
        <section className="recent-opportunities">

          <div className="section-heading">
            <div>
              <h2>Recent Opportunities</h2>

              <p>
                Opportunities you may be interested in.
              </p>
            </div>

            <Link to="/opportunities">
              View All →
            </Link>
          </div>

          <div className="opportunity-list">

            <div className="opportunity-card">

              <div className="opportunity-card-top">
                <span className="opportunity-category">
                  Internship
                </span>

                <button className="bookmark-button">
                  ☆
                </button>
              </div>

              <h3>
                Software Engineering Internship
              </h3>

              <p>
                Gain practical experience working with a technology team
                and develop your software engineering skills.
              </p>

              <div className="dashboard-opportunity-meta">
                <span>🏢 Tech Company Ghana</span>
                <span>📍 Accra</span>
              </div>

              <div className="opportunity-card-bottom">
                <small>
                  Deadline: October 15, 2026
                </small>

                <Link
                  to="/opportunities/1"
                  className="small-view-button"
                >
                  View
                </Link>
              </div>

            </div>

            <div className="opportunity-card">

              <div className="opportunity-card-top">
                <span className="opportunity-category">
                  Scholarship
                </span>

                <button className="bookmark-button">
                  ☆
                </button>
              </div>

              <h3>
                Technology Scholarship
              </h3>

              <p>
                Financial support for students pursuing technology,
                engineering and related programs.
              </p>

              <div className="dashboard-opportunity-meta">
                <span>🏢 FutureTech Foundation</span>
                <span>📍 Ghana</span>
              </div>

              <div className="opportunity-card-bottom">
                <small>
                  Deadline: October 30, 2026
                </small>

                <Link
                  to="/opportunities/3"
                  className="small-view-button"
                >
                  View
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="deadline-section">

          <div className="section-heading">
            <div>
              <h2>Upcoming Deadlines</h2>

              <p>
                Don't miss your application deadlines.
              </p>
            </div>

            <Link to="/reminders">
              View Reminders →
            </Link>
          </div>

          <div className="deadline-list">

            <div className="deadline-item">
              <div className="deadline-date">
                <strong>15</strong>
                <span>OCT</span>
              </div>

              <div>
                <h3>Software Engineering Internship</h3>
                <p>Tech Company Ghana</p>
              </div>

              <span className="deadline-status">
                25 days left
              </span>
            </div>

            <div className="deadline-item">
              <div className="deadline-date">
                <strong>30</strong>
                <span>OCT</span>
              </div>

              <div>
                <h3>Technology Scholarship</h3>
                <p>FutureTech Foundation</p>
              </div>

              <span className="deadline-status">
                40 days left
              </span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;