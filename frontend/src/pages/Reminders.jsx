import { Link } from "react-router-dom";

function Reminders() {
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
          <strong>3</strong>
          <span>Upcoming Deadlines</span>
        </div>

        <div>
          <strong>1</strong>
          <span>High Priority</span>
        </div>

        <div>
          <strong>2</strong>
          <span>Due This Month</span>
        </div>
      </section>

      <section className="reminders-list">

        <div className="reminder-card">
          <div className="reminder-date">
            <span>DEADLINE</span>
            <strong>15</strong>
            <small>OCT</small>
          </div>

          <div className="reminder-info">
            <span className="opportunity-category">
              High Priority
            </span>

            <h2>Software Engineering Internship</h2>

            <h4>Tech Company Ghana</h4>

            <p>Deadline: October 15, 2026</p>
          </div>

          <div className="reminder-actions">
            <span className="days-left">
              25 days left
            </span>

            <Link
              to="/opportunities/1"
              className="view-button"
            >
              View
            </Link>
          </div>
        </div>


        <div className="reminder-card">
          <div className="reminder-date">
            <span>DEADLINE</span>
            <strong>30</strong>
            <small>OCT</small>
          </div>

          <div className="reminder-info">
            <span className="opportunity-category">
              Medium Priority
            </span>

            <h2>Technology Scholarship</h2>

            <h4>FutureTech Foundation</h4>

            <p>Deadline: October 30, 2026</p>
          </div>

          <div className="reminder-actions">
            <span className="days-left">
              40 days left
            </span>

            <Link
              to="/opportunities/3"
              className="view-button"
            >
              View
            </Link>
          </div>
        </div>


        <div className="reminder-card">
          <div className="reminder-date">
            <span>DEADLINE</span>
            <strong>5</strong>
            <small>NOV</small>
          </div>

          <div className="reminder-info">
            <span className="opportunity-category">
              Low Priority
            </span>

            <h2>AI & Data Science Bootcamp</h2>

            <h4>Data Community Ghana</h4>

            <p>Deadline: November 5, 2026</p>
          </div>

          <div className="reminder-actions">
            <span className="days-left">
              46 days left
            </span>

            <Link
              to="/opportunities/4"
              className="view-button"
            >
              View
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Reminders;