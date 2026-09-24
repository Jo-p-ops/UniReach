import { Link } from "react-router-dom";

function ProviderChannels() {
  const channels = [
    {
      id: 1,
      name: "Technology",
      description:
        "Technology jobs, internships, events and learning opportunities.",
      opportunities: 12,
      subscribers: 340,
    },
    {
      id: 2,
      name: "Engineering & Energy",
      description:
        "Engineering, electrical, energy and renewable energy opportunities.",
      opportunities: 8,
      subscribers: 215,
    },
    {
      id: 3,
      name: "Graduate Opportunities",
      description:
        "Graduate jobs, internships and early-career opportunities.",
      opportunities: 6,
      subscribers: 180,
    },
  ];

  return (
    <div className="provider-channels-page">
      <header className="provider-page-header">
        <Link to="/provider" className="back-home">
          ← Provider Dashboard
        </Link>

        <div>
          <h1>My Channels</h1>
          <p>
            Create and manage the channels where you publish opportunities.
          </p>
        </div>

        <button className="create-channel-button" type="button">
          + Create Channel
        </button>
      </header>

      <section className="provider-channel-summary">
        <div>
          <strong>3</strong>
          <span>Total Channels</span>
        </div>

        <div>
          <strong>26</strong>
          <span>Published Opportunities</span>
        </div>

        <div>
          <strong>735</strong>
          <span>Total Subscribers</span>
        </div>
      </section>

      <section className="provider-channels-grid">
        {channels.map((channel) => (
          <div className="provider-channel-card" key={channel.id}>
            <div className="provider-channel-icon">
              📢
            </div>

            <div className="provider-channel-content">
              <h2>{channel.name}</h2>

              <p>{channel.description}</p>

              <div className="provider-channel-stats">
                <span>
                  📄 {channel.opportunities} opportunities
                </span>

                <span>
                  👥 {channel.subscribers} subscribers
                </span>
              </div>
            </div>

            <div className="provider-channel-actions">
              <button type="button">
                Edit
              </button>

              <button type="button">
                Manage
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProviderChannels;