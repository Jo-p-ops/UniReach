import { useState } from "react";
import { Link } from "react-router-dom";

function Saved() {
  const [savedOpportunities, setSavedOpportunities] = useState(() => {
    return JSON.parse(localStorage.getItem("savedOpportunities")) || [];
  });

  const toggleSave = (opportunityId) => {
    const updatedSaved = savedOpportunities.filter(
      (opportunity) => opportunity.id !== opportunityId
    );

    setSavedOpportunities(updatedSaved);

    localStorage.setItem(
      "savedOpportunities",
      JSON.stringify(updatedSaved)
    );
  };

  return (
    <div className="opportunities-page">
      <header className="opportunities-header">
        <div>
          <Link to="/dashboard" className="back-home">
            ← Dashboard
          </Link>

          <h1>Saved Opportunities</h1>

          <p>
            View the opportunities you saved for later.
          </p>
        </div>
      </header>

      <section className="opportunity-feed">
        {savedOpportunities.length > 0 ? (
          savedOpportunities.map((opportunity) => (
            <div className="feed-card" key={opportunity.id}>
              <span className="opportunity-category">
                {opportunity.category}
              </span>

              <h2>{opportunity.title}</h2>

              <h4>{opportunity.provider}</h4>

              <p>{opportunity.description}</p>

              <div className="opportunity-info">
                <span>📍 {opportunity.location}</span>

                <span>
                  📅 Deadline: {opportunity.deadline}
                </span>
              </div>

              <div className="feed-actions">
                <button
                  onClick={() => toggleSave(opportunity.id)}
                  className="saved-button"
                >
                  Saved ✓
                </button>

                <Link
                  to={`/opportunities/${opportunity.id}`}
                  className="view-button"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No saved opportunities</h3>

            <p>
              Go to Explore Opportunities and save an opportunity.
            </p>

            <Link
              to="/opportunities"
              className="hero-primary-button"
            >
              Explore Opportunities
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Saved;