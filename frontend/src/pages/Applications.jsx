import { Link } from "react-router-dom";

function Applications() {
  const applications = [
    {
      id: 1,
      title: "Software Engineering Internship",
      provider: "Tech Company Ghana",
      category: "Internship",
      appliedDate: "September 10, 2026",
      status: "Applied",
    },
    {
      id: 2,
      title: "Graduate Electrical Engineer",
      provider: "Energy Solutions Ltd",
      category: "Job",
      appliedDate: "September 8, 2026",
      status: "Under Review",
    },
    {
      id: 3,
      title: "Technology Scholarship",
      provider: "FutureTech Foundation",
      category: "Scholarship",
      appliedDate: "September 5, 2026",
      status: "Shortlisted",
    },
  ];

  return (
    <div className="applications-page">
      <header className="applications-header">
        <Link to="/dashboard" className="back-home">
          ← Dashboard
        </Link>

        <h1>My Applications</h1>

        <p>
          Keep track of the opportunities you have applied for.
        </p>
      </header>

      <section className="applications-summary">
        <div>
          <strong>3</strong>
          <span>Total Applications</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Shortlisted</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Under Review</span>
        </div>
      </section>

      <section className="applications-list">
        {applications.map((application) => (
          <div className="application-card" key={application.id}>
            <div className="application-main">
              <span className="opportunity-category">
                {application.category}
              </span>

              <h2>{application.title}</h2>

              <h4>{application.provider}</h4>

              <p>
                Applied on {application.appliedDate}
              </p>
            </div>

            <div className="application-side">
              <span
                className={`application-status ${application.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {application.status}
              </span>

              <Link
                to={`/opportunities/${application.id}`}
                className="view-button"
              >
                View Opportunity
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Applications;