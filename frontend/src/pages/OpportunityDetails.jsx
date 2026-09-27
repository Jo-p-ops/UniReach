
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OpportunityDetails() {
  const { id } = useParams();

  // Temporary test user until real authentication is added
  const userId = 1;

  const [opportunity, setOpportunity] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch opportunity details
        const opportunityResponse = await fetch(
          `http://localhost:5000/api/opportunities/${id}`
        );

        if (!opportunityResponse.ok) {
          throw new Error("Opportunity not found.");
        }

        const opportunityData = await opportunityResponse.json();

        // Backend returns { success: true, opportunity: {...} }
        setOpportunity(opportunityData.opportunity);

        // Fetch user's saved opportunities
        const savedResponse = await fetch(
          `http://localhost:5000/api/saved-opportunities/${userId}`
        );

        if (savedResponse.ok) {
          const savedData = await savedResponse.json();

          const saved = savedData.opportunities?.some(
            (item) => item.id === Number(id)
          );

          setIsSaved(saved || false);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load opportunity details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleSave = async () => {
    try {
      setSaving(true);

      if (isSaved) {
        const response = await fetch(
          `http://localhost:5000/api/saved-opportunities/${userId}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to remove saved opportunity.");
        }

        setIsSaved(false);
      } else {
        const response = await fetch(
          "http://localhost:5000/api/saved-opportunities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              opportunity_id: Number(id),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save opportunity.");
        }

        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
            disabled={saving}
          >
            {saving ? "..." : isSaved ? "Saved ✓" : "Save"}
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
