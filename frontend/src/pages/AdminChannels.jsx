import { Link } from "react-router-dom";

function AdminChannels() {
  const channels = [
    {
      id: 1,
      name: "Technology",
      description:
        "Technology jobs, internships, events and learning opportunities.",
      opportunities: 124,
      subscribers: 1240,
      status: "Active",
    },
    {
      id: 2,
      name: "Engineering & Energy",
      description:
        "Engineering, electrical, energy and renewable energy opportunities.",
      opportunities: 86,
      subscribers: 820,
      status: "Active",
    },
    {
      id: 3,
      name: "Jobs",
      description:
        "General job opportunities from companies and organizations.",
      opportunities: 156,
      subscribers: 1840,
      status: "Active",
    },
    {
      id: 4,
      name: "Scholarships",
      description:
        "Scholarships, grants and educational funding opportunities.",
      opportunities: 74,
      subscribers: 1100,
      status: "Active",
    },
    {
      id: 5,
      name: "Internships",
      description:
        "Internship opportunities for students and graduates.",
      opportunities: 98,
      subscribers: 1520,
      status: "Active",
    },
    {
      id: 6,
      name: "AI & Data Science",
      description:
        "Artificial intelligence, machine learning and data science opportunities.",
      opportunities: 46,
      subscribers: 780,
      status: "Active",
    },
  ];

  return (
    <div className="admin-channels-page">
      <header className="provider-page-header">
        <Link to="/admin" className="back-home">
          ← Admin Dashboard
        </Link>

        <div>
          <h1>Channel Management</h1>
          <p>
            Manage the channels used to organize opportunities on UniReach.
          </p>
        </div>

        <button
          type="button"
          className="admin-create-channel-button"
        >
          + Create Channel
        </button>
      </header>

      <section className="admin-channel-summary">
        <div>
          <strong>8</strong>
          <span>Total Channels</span>
        </div>

        <div>
          <strong>8</strong>
          <span>Active Channels</span>
        </div>

        <div>
          <strong>584</strong>
          <span>Opportunities</span>
        </div>

        <div>
          <strong>7,300+</strong>
          <span>Subscribers</span>
        </div>
      </section>

      <section className="admin-channels-grid">
        {channels.map((channel) => (
          <div
            className="admin-channel-card"
            key={channel.id}
          >
            <div className="admin-channel-top">
              <div className="admin-channel-icon">
                📢
              </div>

              <span className="admin-channel-status">
                {channel.status}
              </span>
            </div>

            <h2>{channel.name}</h2>

            <p>
              {channel.description}
            </p>

            <div className="admin-channel-stats">
              <div>
                <strong>{channel.opportunities}</strong>
                <span>Opportunities</span>
              </div>

              <div>
                <strong>{channel.subscribers}</strong>
                <span>Subscribers</span>
              </div>
            </div>

            <div className="admin-channel-actions">
              <button type="button">
                Edit
              </button>

              <button type="button">
                Manage
              </button>

              <button
                type="button"
                className="admin-channel-disable"
              >
                Disable
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminChannels;