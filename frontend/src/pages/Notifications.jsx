import { Link } from "react-router-dom";

function Notifications() {
  const notifications = [
    {
      id: 1,
      icon: "💼",
      title: "New Opportunity",
      message:
        "A new Software Engineering Internship has been posted and may match your interests.",
      date: "Today",
      opportunityId: 1,
    },
    {
      id: 2,
      icon: "📄",
      title: "Application Update",
      message:
        "Your application for the Graduate Electrical Engineer position is under review.",
      date: "Yesterday",
      opportunityId: 2,
    },
    {
      id: 3,
      icon: "⏰",
      title: "Deadline Reminder",
      message:
        "The Technology Scholarship deadline is approaching. Make sure you apply before it closes.",
      date: "2 days ago",
      opportunityId: 3,
    },
    {
      id: 4,
      icon: "🎓",
      title: "New Training Opportunity",
      message:
        "A new AI & Data Science Bootcamp is available. Check the opportunity details.",
      date: "3 days ago",
      opportunityId: 4,
    },
  ];

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <Link to="/dashboard" className="back-home">
          ← Dashboard
        </Link>

        <h1>Notifications</h1>

        <p>
          Stay updated with new opportunities, application updates and
          important deadlines.
        </p>
      </header>

      <section className="notifications-list">
        {notifications.map((notification) => (
          <div className="notification-card" key={notification.id}>
            <div className="notification-icon">
              {notification.icon}
            </div>

            <div className="notification-content">
              <div className="notification-top">
                <h3>{notification.title}</h3>

                <span className="notification-date">
                  {notification.date}
                </span>
              </div>

              <p>{notification.message}</p>

              <div className="notification-action">
                <Link
                  to={`/opportunities/${notification.opportunityId}`}
                  className="view-button"
                >
                  View Opportunity
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Notifications;