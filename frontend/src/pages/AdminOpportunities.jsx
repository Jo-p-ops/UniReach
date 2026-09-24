import { Link } from "react-router-dom";

function AdminOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Software Engineering Internship",
      provider: "Tech Company Ghana",
      category: "Internship",
      submitted: "September 18, 2026",
      deadline: "October 15, 2026",
      status: "Approved",
    },
    {
      id: 2,
      title: "Graduate Electrical Engineer",
      provider: "Energy Solutions Ltd",
      category: "Job",
      submitted: "September 18, 2026",
      deadline: "October 20, 2026",
      status: "Approved",
    },
    {
      id: 3,
      title: "Technology Scholarship",
      provider: "FutureTech Foundation",
      category: "Scholarship",
      submitted: "September 19, 2026",
      deadline: "October 30, 2026",
      status: "Pending Review",
    },
    {
      id: 4,
      title: "AI & Data Science Bootcamp",
      provider: "Data Community Ghana",
      category: "Training",
      submitted: "September 19, 2026",
      deadline: "November 5, 2026",
      status: "Pending Review",
    },
    {
      id: 5,
      title: "Junior Software Developer",
      provider: "Tech Company Ghana",
      category: "Job",
      submitted: "September 15, 2026",
      deadline: "October 25, 2026",
      status: "Rejected",
    },
  ];

  return (
    <div className="admin-opportunities-page">
      <header className="provider-page-header">
        <Link to="/admin" className="back-home">
          ← Admin Dashboard
        </Link>

        <div>
          <h1>Opportunity Moderation</h1>
          <p>
            Review and manage opportunities submitted by providers.
          </p>
        </div>
      </header>

      <section className="admin-opportunity-summary">
        <div>
          <strong>584</strong>
          <span>Total Opportunities</span>
        </div>

        <div>
          <strong>571</strong>
          <span>Approved</span>
        </div>

        <div>
          <strong>8</strong>
          <span>Pending Review</span>
        </div>

        <div>
          <strong>5</strong>
          <span>Rejected</span>
        </div>
      </section>

      <section className="admin-opportunities-card">
        <div className="admin-opportunities-toolbar">
          <div>
            <h2>Submitted Opportunities</h2>
            <p>
              Review opportunities before they appear on the platform.
            </p>
          </div>

          <div className="admin-opportunity-filters">
            <input
              type="text"
              placeholder="Search opportunities..."
            />

            <select defaultValue="">
              <option value="">
                All Statuses
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="pending">
                Pending Review
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        <div className="admin-opportunities-list">
          {opportunities.map((opportunity) => (
            <div
              className="admin-opportunity-row"
              key={opportunity.id}
            >
              <div className="admin-opportunity-icon">
                📢
              </div>

              <div className="admin-opportunity-info">
                <span className="opportunity-category">
                  {opportunity.category}
                </span>

                <h3>{opportunity.title}</h3>

                <p>
                  Provider: <strong>{opportunity.provider}</strong>
                </p>
              </div>

              <div className="admin-opportunity-dates">
                <div>
                  <small>Submitted</small>
                  <span>{opportunity.submitted}</span>
                </div>

                <div>
                  <small>Deadline</small>
                  <span>{opportunity.deadline}</span>
                </div>
              </div>

              <span
                className={`admin-opportunity-status ${
                  opportunity.status === "Approved"
                    ? "approved"
                    : opportunity.status === "Pending Review"
                    ? "pending"
                    : "rejected"
                }`}
              >
                {opportunity.status}
              </span>

              <div className="admin-opportunity-actions">
                <button type="button">
                  View
                </button>

                {opportunity.status === "Pending Review" ? (
                  <>
                    <button
                      type="button"
                      className="approve-button"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      className="reject-button"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button type="button">
                    Manage
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminOpportunities;