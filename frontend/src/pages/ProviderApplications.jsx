import { Link } from "react-router-dom";

function ProviderApplications() {
  const applications = [
    {
      id: 1,
      name: "Kwame Mensah",
      email: "kwame@example.com",
      opportunity: "Software Engineering Internship",
      date: "September 15, 2026",
      status: "New",
    },
    {
      id: 2,
      name: "Ama Boateng",
      email: "ama@example.com",
      opportunity: "Software Engineering Internship",
      date: "September 14, 2026",
      status: "Under Review",
    },
    {
      id: 3,
      name: "Daniel Asare",
      email: "daniel@example.com",
      opportunity: "Junior Software Developer",
      date: "September 12, 2026",
      status: "Shortlisted",
    },
    {
      id: 4,
      name: "Michael Owusu",
      email: "michael@example.com",
      opportunity: "Junior Software Developer",
      date: "September 10, 2026",
      status: "Rejected",
    },
  ];

  return (
    <div className="provider-applications-page">
      <header className="provider-page-header">
        <Link to="/provider" className="back-home">
          ← Provider Dashboard
        </Link>

        <div>
          <h1>Applications</h1>
          <p>
            Review and manage applications submitted for your opportunities.
          </p>
        </div>
      </header>

      <section className="provider-application-summary">
        <div>
          <strong>86</strong>
          <span>Total Applications</span>
        </div>

        <div>
          <strong>24</strong>
          <span>New</span>
        </div>

        <div>
          <strong>31</strong>
          <span>Under Review</span>
        </div>

        <div>
          <strong>12</strong>
          <span>Shortlisted</span>
        </div>
      </section>

      <section className="provider-applications-list">
        {applications.map((application) => (
          <div
            className="provider-application-card"
            key={application.id}
          >
            <div className="applicant-avatar">
              {application.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            <div className="provider-application-main">
              <h2>{application.name}</h2>

              <p className="applicant-email">
                {application.email}
              </p>

              <p className="application-opportunity">
                Applied for:{" "}
                <strong>{application.opportunity}</strong>
              </p>

              <small>
                Applied on {application.date}
              </small>
            </div>

            <div className="provider-application-side">
              <span
                className={`provider-application-status ${application.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {application.status}
              </span>

              <button type="button">
                View Application
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProviderApplications;