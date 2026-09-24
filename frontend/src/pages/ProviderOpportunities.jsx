import { Link } from "react-router-dom";

function ProviderOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: "Software Engineering Internship",
      category: "Internship",
      location: "Accra, Ghana",
      deadline: "October 15, 2026",
      views: 520,
      applications: 32,
      status: "Active",
    },
    {
      id: 2,
      title: "Junior Software Developer",
      category: "Job",
      location: "Accra, Ghana",
      deadline: "October 25, 2026",
      views: 380,
      applications: 21,
      status: "Active",
    },
    {
      id: 3,
      title: "Graduate Technology Training",
      category: "Training",
      location: "Online",
      deadline: "November 5, 2026",
      views: 348,
      applications: 33,
      status: "Closed",
    },
  ];

  return (
    <div className="provider-opportunities-page">
      <header className="provider-page-header">
        <Link to="/provider" className="back-home">
          ← Provider Dashboard
        </Link>

        <div>
          <h1>My Opportunities</h1>
          <p>
            Manage the opportunities you have published on UniReach.
          </p>
        </div>

        <Link
          to="/provider/create-opportunity"
          className="dashboard-search-button"
        >
          + Post Opportunity
        </Link>
      </header>

      <section className="provider-opportunity-summary">
        <div>
          <strong>3</strong>
          <span>Total Opportunities</span>
        </div>

        <div>
          <strong>2</strong>
          <span>Active</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Closed</span>
        </div>

        <div>
          <strong>86</strong>
          <span>Total Applications</span>
        </div>
      </section>

      <section className="provider-opportunity-list">
        {opportunities.map((opportunity) => (
          <div
            className="provider-opportunity-card"
            key={opportunity.id}
          >
            <div className="provider-opportunity-main">
              <div className="provider-opportunity-top">
                <span className="opportunity-category">
                  {opportunity.category}
                </span>

                <span
                  className={
                    opportunity.status === "Active"
                      ? "provider-status active"
                      : "provider-status closed"
                  }
                >
                  {opportunity.status}
                </span>
              </div>

              <h2>{opportunity.title}</h2>

              <div className="provider-opportunity-info">
                <span>📍 {opportunity.location}</span>
                <span>📅 Deadline: {opportunity.deadline}</span>
              </div>

              <div className="provider-opportunity-stats">
                <span>👁️ {opportunity.views} views</span>
                <span>📄 {opportunity.applications} applications</span>
              </div>
            </div>

            <div className="provider-opportunity-actions">
              <button type="button">
                Edit
              </button>

              <button type="button">
                {opportunity.status === "Active"
                  ? "Close"
                  : "Reopen"}
              </button>

              <button
                type="button"
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProviderOpportunities;