
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Opportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savedOpportunities, setSavedOpportunities] = useState(() => {
    return JSON.parse(localStorage.getItem("savedOpportunities")) || [];
  });

  // Fetch opportunities from the backend
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/opportunities"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }

        const data = await response.json();

        setOpportunities(data);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
        setError("Unable to load opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const toggleSave = (opportunity) => {
    setSavedOpportunities((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => item.id === opportunity.id
      );

      let updatedSaved;

      if (alreadySaved) {
        updatedSaved = currentSaved.filter(
          (item) => item.id !== opportunity.id
        );
      } else {
        updatedSaved = [...currentSaved, opportunity];
      }

      localStorage.setItem(
        "savedOpportunities",
        JSON.stringify(updatedSaved)
      );

      return updatedSaved;
    });
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      opportunity.title.toLowerCase().includes(search) ||
      opportunity.organization.toLowerCase().includes(search) ||
      opportunity.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "" ||
      opportunity.opportunity_type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="opportunities-page">
      <header className="opportunities-header">
        <div>
          <Link to="/dashboard" className="back-home">
            ← Dashboard
          </Link>

          <h1>Explore Opportunities</h1>

          <p>
            Discover opportunities that match your interests and career goals.
          </p>
        </div>
      </header>

      <div className="opportunity-search">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Job">Jobs</option>
          <option value="Internship">Internships</option>
          <option value="Scholarship">Scholarships</option>
          <option value="Training">Training</option>
        </select>
      </div>

      <section className="opportunity-feed">
        {loading ? (
          <div className="no-results">
            <h3>Loading opportunities...</h3>
          </div>
        ) : error ? (
          <div className="no-results">
            <h3>{error}</h3>
            <p>Make sure the UniReach backend is running.</p>
          </div>
        ) : filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => {
            const isSaved = savedOpportunities.some(
              (item) => item.id === opportunity.id
            );

            const formattedDeadline = opportunity.deadline
              ? new Date(opportunity.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "No deadline";

            return (
              <div className="feed-card" key={opportunity.id}>
                <span className="opportunity-category">
                  {opportunity.opportunity_type}
                </span>

                <h2>{opportunity.title}</h2>

                <h4>{opportunity.organization}</h4>

                <p>{opportunity.description}</p>

                <div className="opportunity-info">
                  <span>📍 {opportunity.location}</span>

                  <span>
                    📅 Deadline: {formattedDeadline}
                  </span>
                </div>

                <div className="feed-actions">
                  <button
                    onClick={() => toggleSave(opportunity)}
                    className={isSaved ? "saved-button" : ""}
                  >
                    {isSaved ? "Saved ✓" : "Save"}
                  </button>

                  <Link
                    to={`/opportunities/${opportunity.id}`}
                    className="view-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <h3>No opportunities found</h3>

            <p>
              Try changing your search or selecting a different category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Opportunities;
