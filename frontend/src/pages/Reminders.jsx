import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Reminders() {
  // Temporary test user until real authentication is added
  const userId = 1;

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/reminders/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load reminders.");
        }

        const data = await response.json();

        setReminders(data.reminders || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load reminders.");
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const handleDeleteReminder = async (reminderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reminder?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(reminderId);

      const response = await fetch(
        `http://localhost:5000/api/reminders/${reminderId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel reminder."
        );
      }

      setReminders((currentReminders) =>
        currentReminders.filter(
          (reminder) => reminder.id !== reminderId
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel reminder.");
    } finally {
      setDeletingId(null);
    }
  };

  const upcomingReminders = useMemo(() => {
    return reminders.filter((reminder) => {
      if (!reminder.deadline) return false;

      return new Date(reminder.deadline) >= new Date();
    });
  }, [reminders]);

  const highPriorityCount = useMemo(() => {
    return upcomingReminders.filter((reminder) => {
      const deadline = new Date(reminder.deadline);
      const today = new Date();

      const daysLeft = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
      );

      return daysLeft <= 14;
    }).length;
  }, [upcomingReminders]);

  const dueThisMonthCount = useMemo(() => {
    const today = new Date();

    return upcomingReminders.filter((reminder) => {
      const deadline = new Date(reminder.deadline);

      return (
        deadline.getMonth() === today.getMonth() &&
        deadline.getFullYear() === today.getFullYear()
      );
    }).length;
  }, [upcomingReminders]);

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    const difference = deadlineDate - today;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const getPriority = (deadline) => {
    const daysLeft = getDaysLeft(deadline);

    if (daysLeft <= 7) {
      return "High Priority";
    }

    if (daysLeft <= 21) {
      return "Medium Priority";
    }

    return "Low Priority";
  };

  const getPriorityClass = (deadline) => {
    const priority = getPriority(deadline);

    if (priority === "High Priority") {
      return "high-priority";
    }

    if (priority === "Medium Priority") {
      return "medium-priority";
    }

    return "low-priority";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDateParts = (date) => {
    const deadline = new Date(date);

    return {
      day: deadline.toLocaleDateString("en-GB", {
        day: "numeric",
      }),
      month: deadline
        .toLocaleDateString("en-GB", {
          month: "short",
        })
        .toUpperCase(),
    };
  };

  return (
    <div className="reminders-page">
      <header className="reminders-header">
        <Link to="/dashboard" className="back-home">
          ← Dashboard
        </Link>

        <h1>Reminders</h1>

        <p>
          Keep track of important opportunity deadlines.
        </p>
      </header>

      <section className="reminders-summary">
        <div>
          <strong>{upcomingReminders.length}</strong>
          <span>Upcoming Deadlines</span>
        </div>

        <div>
          <strong>{highPriorityCount}</strong>
          <span>High Priority</span>
        </div>

        <div>
          <strong>{dueThisMonthCount}</strong>
          <span>Due This Month</span>
        </div>
      </section>

      {loading && (
        <section className="reminders-list">
          <div className="no-results">
            <h3>Loading reminders...</h3>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="reminders-list">
          <div className="no-results">
            <h3>Unable to load reminders</h3>
            <p>{error}</p>
          </div>
        </section>
      )}

      {!loading && !error && upcomingReminders.length === 0 && (
        <section className="reminders-list">
          <div className="no-results">
            <h3>No upcoming reminders</h3>

            <p>
              Save an opportunity and set a reminder for its deadline.
            </p>

            <Link
              to="/opportunities"
              className="hero-primary-button"
            >
              Explore Opportunities
            </Link>
          </div>
        </section>
      )}

      {!loading && !error && upcomingReminders.length > 0 && (
        <section className="reminders-list">
          {upcomingReminders.map((reminder) => {
            const dateParts = getDateParts(reminder.deadline);
            const daysLeft = getDaysLeft(reminder.deadline);
            const priority = getPriority(reminder.deadline);

            return (
              <div
                className="reminder-card"
                key={reminder.id}
              >
                <div className="reminder-date">
                  <span>DEADLINE</span>

                  <strong>{dateParts.day}</strong>

                  <small>{dateParts.month}</small>
                </div>

                <div className="reminder-info">
                  <span
                    className={`opportunity-category ${getPriorityClass(
                      reminder.deadline
                    )}`}
                  >
                    {priority}
                  </span>

                  <h2>{reminder.title}</h2>

                  <h4>{reminder.organization}</h4>

                  <p>
                    Deadline: {formatDate(reminder.deadline)}
                  </p>
                </div>

                <div className="reminder-actions">
                  <span className="days-left">
                    {daysLeft > 0
                      ? `${daysLeft} days left`
                      : "Deadline today"}
                  </span>

                  <Link
                    to={`/opportunities/${reminder.opportunity_id}`}
                    className="view-button"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      handleDeleteReminder(reminder.id)
                    }
                    className="cancel-button"
                    disabled={deletingId === reminder.id}
                  >
                    {deletingId === reminder.id
                      ? "Cancelling..."
                      : "Cancel"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default Reminders;
