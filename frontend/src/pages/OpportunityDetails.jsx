import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OpportunityDetails() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savedOpportunities, setSavedOpportunities] = useState(() => {
    return JSON.parse(localStorage.getItem("savedOpportunities")) || [];
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/opportunities/${id}`
        );

        if (!response.ok) {
          throw new Error("Opportunity not found.");
        }

        const data = await response.json();

        setOpportunity(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load opportunity details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  if (loading) {
    return (
      <div className="opportunities-page">
        <h1>Loading Opportunity...</h1>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="opportunities-page">
        <h1>Opportunity Not Found</h1>

        <p>
          {error || "The opportunity you are looking for does not exist."}
        </p>

        <Link to="/opportunities" className="back-home">
          ← Back to Opportunities
        </Link>
      </div>
    );
  }

  const isSaved = savedOpportunities.some(
    (item) => item.id === opportunity.id
  );

  const toggleSave = () => {
    let updatedSaved;

    if (isSaved) {
      updatedSaved = savedOpportunities.filter(
        (item) => item.id !== opportunity.id
      );
    } else {
      updatedSaved = [...savedOpportunities, opportunity];
    }

    setSavedOpportunities(updatedSaved);

    localStorage.setItem(
      "savedOpportunities",
      JSON.stringify(updatedSaved)
    );
  };

  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No deadline specified";

  return (
    <div className="opportunities-page">
      <header className="opportunities-header">
        <div>
          <Link to="/opportunities" className="back-home">
            ← Back to Opportunities
          </Link>

          <h1>{opportunity.title}</h1>

          <p>{opportunity.organization}</p>
        </div>
      </header>

      <section className="feed-card opportunity-details">
        <span className="opportunity-category">
          {opportunity.opportunity_type}
        </span>

        <h2>{opportunity.title}</h2>

        <h4>{opportunity.organization}</h4>

        <div className="opportunity-info">
          <span>
            📍 {opportunity.location || "Location not specified"}
          </span>

          <span>
            📅 Deadline: {formattedDeadline}
          </span>
        </div>

        <div className="details-section">
          <h3>About This Opportunity</h3>

          <p>{opportunity.description}</p>
        </div>

        <div className="feed-actions">
          <button
            onClick={toggleSave}
            className={isSaved ? "saved-button" : ""}
          >
            {isSaved ? "Saved ✓" : "Save"}
          </button>

          {opportunity.application_url ? (
            <a
              href={opportunity.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button apply-button"
            >
              Apply Now
            </a>
          ) : (
            <button className="view-button apply-button" disabled>
              Application Link Unavailable
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default OpportunityDetails;