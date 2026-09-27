
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Opportunities() {
    const [opportunities, setOpportunities] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [savedIds, setSavedIds] = useState([]);
    const [savingId, setSavingId] = useState(null);

    // Temporary logged-in user.
    // We will connect this to the real login system later.
    const userId = 1;

    useEffect(() => {
        loadOpportunities();
        loadSavedOpportunities();
    }, []);

    const loadOpportunities = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/opportunities"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch opportunities");
            }

            const data = await response.json();

            setOpportunities(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading opportunities:", error);

            setError(
                "Unable to load opportunities. Please make sure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadSavedOpportunities = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/saved-opportunities/${userId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch saved opportunities");
            }

            const data = await response.json();

            if (data.success && Array.isArray(data.opportunities)) {
                setSavedIds(
                    data.opportunities.map(
                        (opportunity) => opportunity.id
                    )
                );
            }
        } catch (error) {
            console.error(
                "Error loading saved opportunities:",
                error
            );
        }
    };

    const saveOpportunity = async (opportunity) => {
        try {
            setSavingId(opportunity.id);

            const isSaved = savedIds.includes(opportunity.id);

            if (isSaved) {
                const response = await fetch(
                    `http://localhost:5000/api/saved-opportunities/${userId}/${opportunity.id}`,
                    {
                        method: "DELETE",
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to remove saved opportunity"
                    );
                }

                setSavedIds((current) =>
                    current.filter(
                        (id) => id !== opportunity.id
                    )
                );
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
                            opportunity_id: opportunity.id,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to save opportunity"
                    );
                }

                setSavedIds((current) => [
                    ...current,
                    opportunity.id,
                ]);
            }
        } catch (error) {
            console.error("Save error:", error);
            alert(
                error.message ||
                    "Something went wrong while saving the opportunity."
            );
        } finally {
            setSavingId(null);
        }
    };

    const filteredOpportunities = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return opportunities;
        }

        return opportunities.filter((opportunity) => {
            const searchableText = `
                ${opportunity.title || ""}
                ${opportunity.description || ""}
                ${opportunity.organization || ""}
                ${opportunity.opportunity_type || ""}
                ${opportunity.location || ""}
            `.toLowerCase();

            return searchableText.includes(searchText);
        });
    }, [opportunities, search]);

    const getDeadlineStatus = (deadline) => {
        if (!deadline) {
            return {
                label: "No deadline",
                className: "neutral",
            };
        }

        const deadlineDate = new Date(deadline);
        const now = new Date();

        if (deadlineDate < now) {
            return {
                label: "Closed",
                className: "closed",
            };
        }

        const difference =
            deadlineDate.getTime() - now.getTime();

        const daysLeft = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        if (daysLeft <= 7) {
            return {
                label: `${daysLeft} day${
                    daysLeft === 1 ? "" : "s"
                } left`,
                className: "urgent",
            };
        }

        return {
            label: `${daysLeft} days left`,
            className: "open",
        };
    };

    if (loading) {
        return (
            <div className="opportunities-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h2>Loading opportunities...</h2>
                    <p>
                        Please wait while we fetch the latest
                        opportunities.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="opportunities-page">
                <div className="error-container">
                    <div className="error-icon">!</div>

                    <h2>Something went wrong</h2>

                    <p>{error}</p>

                    <button
                        className="retry-button"
                        onClick={loadOpportunities}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="opportunities-page">
            <div className="opportunities-container">

                {/* HEADER */}
                <header className="page-header">
                    <div>
                        <Link
                            to="/dashboard"
                            className="back-link"
                        >
                            ← Dashboard
                        </Link>

                        <h1>Discover Opportunities</h1>

                        <p>
                            Find internships, training programs,
                            jobs and other opportunities in one place.
                        </p>
                    </div>
                </header>

                {/* SEARCH */}
                <section className="search-section">
                    <div className="search-wrapper">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Search by title, organization, location or type..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (
                            <button
                                className="clear-search"
                                onClick={() => setSearch("")}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </section>

                {/* RESULTS HEADER */}
                <div className="results-header">
                    <div>
                        <h2>
                            Available Opportunities
                        </h2>

                        <p>
                            {filteredOpportunities.length}{" "}
                            {filteredOpportunities.length === 1
                                ? "opportunity"
                                : "opportunities"}{" "}
                            found
                        </p>
                    </div>
                </div>

                {/* EMPTY STATE */}
                {filteredOpportunities.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">⌕</div>

                        <h2>No opportunities found</h2>

                        <p>
                            We couldn't find anything matching
                            your search.
                        </p>

                        {search && (
                            <button
                                className="clear-button"
                                onClick={() => setSearch("")}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="opportunity-grid">
                        {filteredOpportunities.map(
                            (opportunity) => {
                                const deadlineStatus =
                                    getDeadlineStatus(
                                        opportunity.deadline
                                    );

                                const isSaved =
                                    savedIds.includes(
                                        opportunity.id
                                    );

                                const isSaving =
                                    savingId === opportunity.id;

                                return (
                                    <article
                                        className="opportunity-card"
                                        key={opportunity.id}
                                    >

                                        {/* CARD TOP */}
                                        <div className="card-top">
                                            <span className="opportunity-type">
                                                {
                                                    opportunity.opportunity_type
                                                }
                                            </span>

                                            <button
                                                className={`save-icon ${
                                                    isSaved
                                                        ? "saved"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    saveOpportunity(
                                                        opportunity
                                                    )
                                                }
                                                disabled={isSaving}
                                                title={
                                                    isSaved
                                                        ? "Remove from saved"
                                                        : "Save opportunity"
                                                }
                                            >
                                                {isSaving
                                                    ? "..."
                                                    : isSaved
                                                    ? "♥"
                                                    : "♡"}
                                            </button>
                                        </div>

                                        {/* TITLE */}
                                        <h3>
                                            {opportunity.title}
                                        </h3>

                                        {/* ORGANIZATION */}
                                        <div className="organization">
                                            <span>🏢</span>

                                            <span>
                                                {
                                                    opportunity.organization
                                                }
                                            </span>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <p className="description">
                                            {
                                                opportunity.description
                                            }
                                        </p>

                                        {/* INFORMATION */}
                                        <div className="opportunity-info">

                                            <div className="info-item">
                                                <span className="info-label">
                                                    Location
                                                </span>

                                                <span>
                                                    📍{" "}
                                                    {opportunity.location ||
                                                        "Not specified"}
                                                </span>
                                            </div>

                                            <div className="info-item">
                                                <span className="info-label">
                                                    Deadline
                                                </span>

                                                <span>
                                                    {opportunity.deadline
                                                        ? new Date(
                                                              opportunity.deadline
                                                          ).toLocaleDateString(
                                                              "en-GB",
                                                              {
                                                                  day: "numeric",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : "No deadline"}
                                                </span>
                                            </div>

                                        </div>

                                        {/* DEADLINE STATUS */}
                                        <div
                                            className={`deadline-status ${deadlineStatus.className}`}
                                        >
                                            <span>●</span>

                                            {
                                                deadlineStatus.label
                                            }
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="card-actions">

                                            <Link
                                                to={`/opportunities/${opportunity.id}`}
                                                className="view-button"
                                            >
                                                View Details
                                            </Link>

                                            <button
                                                className={`save-button ${
                                                    isSaved
                                                        ? "saved-button"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    saveOpportunity(
                                                        opportunity
                                                    )
                                                }
                                                disabled={isSaving}
                                            >
                                                {isSaving
                                                    ? "..."
                                                    : isSaved
                                                    ? "Saved"
                                                    : "Save"}
                                            </button>

                                        </div>

                                    </article>
                                );
                            }
                        )}
                    </div>
                )}

            </div>

            {/* PAGE STYLES */}
            <style>{`

                * {
                    box-sizing: border-box;
                }

                .opportunities-page {
                    min-height: 100vh;
                    background: #f8fafc;
                    color: #111827;
                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .opportunities-container {
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 40px 24px 70px;
                }

                /* HEADER */

                .page-header {
                    margin-bottom: 30px;
                }

                .back-link {
                    display: inline-block;
                    margin-bottom: 18px;
                    color: #4f46e5;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                }

                .back-link:hover {
                    text-decoration: underline;
                }

                .page-header h1 {
                    margin: 0;
                    font-size: 38px;
                    line-height: 1.15;
                    letter-spacing: -1px;
                }

                .page-header p {
                    margin: 12px 0 0;
                    color: #64748b;
                    font-size: 16px;
                    line-height: 1.6;
                }

                /* SEARCH */

                .search-section {
                    margin-bottom: 36px;
                }

                .search-wrapper {
                    position: relative;
                    max-width: 760px;
                }

                .search-wrapper input {
                    width: 100%;
                    height: 54px;
                    padding: 0 48px 0 48px;
                    border: 1px solid #dbe1ea;
                    border-radius: 12px;
                    background: white;
                    outline: none;
                    font-size: 15px;
                    color: #111827;
                    box-shadow:
                        0 2px 5px rgba(15, 23, 42, 0.03);
                }

                .search-wrapper input:focus {
                    border-color: #6366f1;
                    box-shadow:
                        0 0 0 3px rgba(99, 102, 241, 0.12);
                }

                .search-icon {
                    position: absolute;
                    left: 17px;
                    top: 13px;
                    font-size: 25px;
                    color: #64748b;
                    pointer-events: none;
                }

                .clear-search {
                    position: absolute;
                    right: 14px;
                    top: 12px;
                    width: 30px;
                    height: 30px;
                    border: none;
                    border-radius: 50%;
                    background: #f1f5f9;
                    color: #64748b;
                    cursor: pointer;
                    font-size: 20px;
                }

                /* RESULTS */

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .results-header h2 {
                    margin: 0;
                    font-size: 22px;
                }

                .results-header p {
                    margin: 5px 0 0;
                    color: #64748b;
                    font-size: 14px;
                }

                /* GRID */

                .opportunity-grid {
                    display: grid;
                    grid-template-columns:
                        repeat(auto-fit, minmax(320px, 1fr));
                    gap: 22px;
                }

                /* CARD */

                .opportunity-card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 22px;
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .opportunity-card:hover {
                    transform: translateY(-3px);
                    border-color: #c7d2fe;
                    box-shadow:
                        0 12px 30px rgba(15, 23, 42, 0.08);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 18px;
                }

                .opportunity-type {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 10px;
                    border-radius: 999px;
                    background: #eef2ff;
                    color: #4f46e5;
                    font-size: 12px;
                    font-weight: 700;
                }

                .save-icon {
                    width: 36px;
                    height: 36px;
                    border: 1px solid #e2e8f0;
                    border-radius: 9px;
                    background: white;
                    color: #64748b;
                    cursor: pointer;
                    font-size: 21px;
                    transition: 0.2s;
                }

                .save-icon:hover {
                    border-color: #6366f1;
                    color: #4f46e5;
                }

                .save-icon.saved {
                    background: #eef2ff;
                    color: #4f46e5;
                    border-color: #c7d2fe;
                }

                .save-icon:disabled,
                .save-button:disabled {
                    opacity: 0.6;
                    cursor: wait;
                }

                .opportunity-card h3 {
                    margin: 0 0 10px;
                    font-size: 21px;
                    line-height: 1.35;
                }

                .organization {
                    display: flex;
                    gap: 7px;
                    align-items: center;
                    margin-bottom: 14px;
                    color: #4f46e5;
                    font-size: 14px;
                    font-weight: 700;
                }

                .description {
                    min-height: 68px;
                    margin: 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.65;
                }

                /* INFO */

                .opportunity-info {
                    margin-top: 20px;
                    padding-top: 16px;
                    border-top: 1px solid #eef2f7;
                }

                .info-item {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    margin-bottom: 10px;
                    color: #374151;
                    font-size: 13px;
                }

                .info-label {
                    color: #94a3b8;
                    font-weight: 600;
                }

                /* DEADLINE */

                .deadline-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    margin-top: 5px;
                    font-size: 13px;
                    font-weight: 700;
                }

                .deadline-status.open {
                    color: #059669;
                }

                .deadline-status.urgent {
                    color: #d97706;
                }

                .deadline-status.closed {
                    color: #dc2626;
                }

                .deadline-status.neutral {
                    color: #64748b;
                }

                /* BUTTONS */

                .card-actions {
                    display: grid;
                    grid-template-columns: 1fr 100px;
                    gap: 10px;
                    margin-top: 22px;
                }

                .view-button,
                .save-button {
                    min-height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    text-decoration: none;
                    transition: 0.2s;
                }

                .view-button {
                    background: #111827;
                    color: white;
                }

                .view-button:hover {
                    background: #1f2937;
                }

                .save-button {
                    border: 1px solid #dbe1ea;
                    background: white;
                    color: #374151;
                }

                .save-button:hover {
                    border-color: #6366f1;
                    color: #4f46e5;
                }

                .saved-button {
                    background: #eef2ff;
                    color: #4f46e5;
                    border-color: #c7d2fe;
                }

                /* EMPTY */

                .empty-state {
                    padding: 70px 20px;
                    text-align: center;
                    background: white;
                    border: 1px dashed #cbd5e1;
                    border-radius: 16px;
                }

                .empty-icon {
                    width: 58px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    border-radius: 50%;
                    background: #eef2ff;
                    color: #4f46e5;
                    font-size: 30px;
                }

                .empty-state h2 {
                    margin: 0 0 8px;
                }

                .empty-state p {
                    color: #64748b;
                    margin: 0 0 20px;
                }

                .clear-button,
                .retry-button {
                    border: none;
                    background: #4f46e5;
                    color: white;
                    padding: 11px 18px;
                    border-radius: 8px;
                    font-weight: 700;
                    cursor: pointer;
                }

                /* LOADING */

                .loading-container,
                .error-container {
                    min-height: 70vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    text-align: center;
                }

                .loading-container h2,
                .error-container h2 {
                    margin-bottom: 8px;
                }

                .loading-container p,
                .error-container p {
                    color: #64748b;
                }

                .loading-spinner {
                    width: 42px;
                    height: 42px;
                    margin-bottom: 20px;
                    border: 4px solid #e2e8f0;
                    border-top-color: #4f46e5;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                .error-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                    border-radius: 50%;
                    background: #fee2e2;
                    color: #dc2626;
                    font-size: 25px;
                    font-weight: 800;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* MOBILE */

                @media (max-width: 600px) {

                    .opportunities-container {
                        padding: 28px 16px 50px;
                    }

                    .page-header h1 {
                        font-size: 30px;
                    }

                    .opportunity-grid {
                        grid-template-columns: 1fr;
                    }

                    .card-actions {
                        grid-template-columns: 1fr;
                    }

                    .info-item {
                        flex-direction: column;
                        gap: 3px;
                    }
                }

            `}</style>
        </div>
    );
}

export default Opportunities;
