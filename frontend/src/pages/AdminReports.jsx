import { Link } from "react-router-dom";

function AdminReports() {
  const reports = [
    {
      id: 1,
      type: "Opportunity",
      subject: "Software Engineering Internship",
      reportedBy: "Kwame Mensah",
      reason: "Misleading information",
      date: "September 19, 2026",
      status: "Pending",
    },
    {
      id: 2,
      type: "Provider",
      subject: "FutureTech Foundation",
      reportedBy: "Ama Boateng",
      reason: "Unverified organization",
      date: "September 18, 2026",
      status: "Under Review",
    },
    {
      id: 3,
      type: "Opportunity",
      subject: "Online Investment Training",
      reportedBy: "Daniel Asare",
      reason: "Suspicious opportunity",
      date: "September 17, 2026",
      status: "Pending",
    },
    {
      id: 4,
      type: "User",
      subject: "Unknown User",
      reportedBy: "Michael Owusu",
      reason: "Inappropriate content",
      date: "September 15, 2026",
      status: "Resolved",
    },
  ];

  return (
    <div className="admin-reports-page">
      <header className="provider-page-header">
        <Link to="/admin" className="back-home">
          ← Admin Dashboard
        </Link>

        <div>
          <h1>Reports & Moderation</h1>
          <p>
            Review reports and take appropriate moderation actions.
          </p>
        </div>
      </header>

      <section className="admin-report-summary">
        <div>
          <strong>8</strong>
          <span>Total Reports</span>
        </div>

        <div>
          <strong>5</strong>
          <span>Pending</span>
        </div>

        <div>
          <strong>2</strong>
          <span>Under Review</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Resolved</span>
        </div>
      </section>

      <section className="admin-reports-card">
        <div className="admin-reports-toolbar">
          <div>
            <h2>Reported Content</h2>
            <p>
              Review reports submitted by UniReach users.
            </p>
          </div>

          <select defaultValue="">
            <option value="">
              All Reports
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="review">
              Under Review
            </option>

            <option value="resolved">
              Resolved
            </option>
          </select>
        </div>

        <div className="admin-reports-list">
          {reports.map((report) => (
            <div
              className="admin-report-row"
              key={report.id}
            >
              <div className="admin-report-icon">
                ⚠️
              </div>

              <div className="admin-report-main">
                <div className="admin-report-top">
                  <span className="admin-report-type">
                    {report.type}
                  </span>

                  <span
                    className={`admin-report-status ${report.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {report.status}
                  </span>
                </div>

                <h3>{report.subject}</h3>

                <p>
                  Reason: <strong>{report.reason}</strong>
                </p>

                <small>
                  Reported by {report.reportedBy} • {report.date}
                </small>
              </div>

              <div className="admin-report-actions">
                <button type="button">
                  View
                </button>

                {report.status !== "Resolved" && (
                  <>
                    <button
                      type="button"
                      className="review-button"
                    >
                      Review
                    </button>

                    <button
                      type="button"
                      className="resolve-button"
                    >
                      Resolve
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminReports;