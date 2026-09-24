import { Link } from "react-router-dom";

function AdminProviders() {
  const providers = [
    {
      id: 1,
      name: "Tech Company Ghana",
      email: "info@techcompanyghana.com",
      industry: "Technology & Software",
      opportunities: 12,
      joined: "September 8, 2026",
      status: "Verified",
    },
    {
      id: 2,
      name: "FutureTech Foundation",
      email: "info@futuretech.org",
      industry: "Education & Technology",
      opportunities: 8,
      joined: "September 5, 2026",
      status: "Pending",
    },
    {
      id: 3,
      name: "Energy Solutions Ltd",
      email: "info@energysolutions.com",
      industry: "Energy & Engineering",
      opportunities: 15,
      joined: "August 28, 2026",
      status: "Verified",
    },
    {
      id: 4,
      name: "Ghana Tech Community",
      email: "hello@ghanatech.org",
      industry: "Technology Community",
      opportunities: 6,
      joined: "August 22, 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="admin-providers-page">
      <header className="provider-page-header">
        <Link to="/admin" className="back-home">
          ← Admin Dashboard
        </Link>

        <div>
          <h1>Provider Management</h1>
          <p>
            Verify and manage organizations publishing opportunities on UniReach.
          </p>
        </div>
      </header>

      <section className="admin-provider-summary">
        <div>
          <strong>126</strong>
          <span>Total Providers</span>
        </div>

        <div>
          <strong>118</strong>
          <span>Verified</span>
        </div>

        <div>
          <strong>5</strong>
          <span>Pending Review</span>
        </div>

        <div>
          <strong>3</strong>
          <span>Suspended</span>
        </div>
      </section>

      <section className="admin-providers-card">
        <div className="admin-providers-toolbar">
          <div>
            <h2>Registered Providers</h2>
            <p>
              Review organizations and their verification status.
            </p>
          </div>

          <div className="admin-provider-filters">
            <input
              type="text"
              placeholder="Search providers..."
            />

            <select defaultValue="">
              <option value="">
                All Statuses
              </option>

              <option value="verified">
                Verified
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="suspended">
                Suspended
              </option>
            </select>
          </div>
        </div>

        <div className="admin-providers-list">
          {providers.map((provider) => (
            <div
              className="admin-provider-row"
              key={provider.id}
            >
              <div className="admin-provider-logo">
                {provider.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="admin-provider-info">
                <h3>{provider.name}</h3>

                <p>{provider.email}</p>

                <span>{provider.industry}</span>
              </div>

              <div className="admin-provider-opportunities">
                <strong>{provider.opportunities}</strong>
                <small>Opportunities</small>
              </div>

              <div className="admin-provider-joined">
                <small>Joined</small>
                <span>{provider.joined}</span>
              </div>

              <span
                className={`admin-provider-status ${provider.status.toLowerCase()}`}
              >
                {provider.status}
              </span>

              <div className="admin-provider-actions">
                <button type="button">
                  View
                </button>

                {provider.status === "Pending" ? (
                  <button
                    type="button"
                    className="verify-button"
                  >
                    Verify
                  </button>
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

export default AdminProviders;