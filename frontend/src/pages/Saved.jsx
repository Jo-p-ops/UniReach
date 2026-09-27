
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Saved() {
    const [savedOpportunities, setSavedOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [removingId, setRemovingId] = useState(null);

    // Temporary logged-in user.
    // We will connect this to the real authentication system later.
    const userId = 1;

    useEffect(() => {
        loadSavedOpportunities();
    }, []);

    const loadSavedOpportunities = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/saved-opportunities/${userId}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load saved opportunities"
                );
            }

            const data = await response.json();

            if (data.success) {
                setSavedOpportunities(
                    Array.isArray(data.opportunities)
                        ? data.opportunities
                        : []
                );
            } else {
                throw new Error(
                    data.message ||
                        "Failed to load saved opportunities"
                );
            }
        } catch (error) {
            console.error(
                "Error loading saved opportunities:",
                error
            );

            setError(
                "Unable to load your saved opportunities. Please make sure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const removeSavedOpportunity = async (opportunityId) => {
        try {
            setRemovingId(opportunityId);

            const response = await fetch(
                `http://localhost:5000/api/saved-opportunities/${userId}/${opportunityId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Failed to remove opportunity"
                );
            }

            setSavedOpportunities((current) =>
                current.filter(
                    (opportunity) =>
                        opportunity.id !== opportunityId
                )
            );
        } catch (error) {
            console.error(
                "Error removing saved opportunity:",
                error
            );

            alert(
                error.message ||
                    "Something went wrong while removing the opportunity."
            );
        } finally {
            setRemovingId(null);
        }
    };

    const formatDeadline = (deadline) => {
        if (!deadline) {
            return "No deadline";
        }

        return new Date(deadline).toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    if (loading) {
        return (
            <div className="saved-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>

                    <h2>Loading saved opportunities...</h2>

                    <p>
                        Please wait while we retrieve your
                        saved opportunities.
                    </p>
                </div>

                <style>{styles}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="saved-page">
                <div className="error-container">
                    <div className="error-icon">!</div>

                    <h2>Something went wrong</h2>

                    <p>{error}</p>

                    <button
                        className="retry-button"
                        onClick={loadSavedOpportunities}
                    >
                        Try Again
                    </button>
                </div>

                <style>{styles}</style>
            </div>
        );
    }

    return (
        <div className="saved-page">
            <div className="saved-container">

                {/* HEADER */}
                <header className="page-header">
                    <Link
                        to="/dashboard"
                        className="back-link"
                    >
                        ← Dashboard
                    </Link>

                    <h1>Saved Opportunities</h1>

                    <p>
                        Keep track of opportunities you want
                        to come back to later.
                    </p>
                </header>

                {/* RESULTS HEADER */}
                <div className="results-header">
                    <div>
                        <h2>Your Saved Opportunities</h2>

                        <p>
                            {savedOpportunities.length}{" "}
                            {savedOpportunities.length === 1
                                ? "opportunity"
                                : "opportunities"}{" "}
                            saved
                        </p>
                    </div>

                    <Link
                        to="/opportunities"
                        className="explore-button"
                    >
                        Explore Opportunities
                    </Link>
                </div>

                {/* EMPTY STATE */}
                {savedOpportunities.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            ☆
                        </div>

                        <h2>
                            No saved opportunities yet
                        </h2>

                        <p>
                            When you find an opportunity you
                            like, click Save and it will appear
                            here.
                        </p>

                        <Link
                            to="/opportunities"
                            className="primary-button"
                        >
                            Explore Opportunities
                        </Link>
                    </div>
                ) : (
                    <div className="saved-grid">
                        {savedOpportunities.map(
                            (opportunity) => (
                                <article
                                    className="saved-card"
                                    key={opportunity.id}
                                >

                                    {/* TOP */}
                                    <div className="card-top">
                                        <span className="opportunity-type">
                                            {
                                                opportunity.opportunity_type
                                            }
                                        </span>

                                        <span className="saved-label">
                                            ♥ Saved
                                        </span>
                                    </div>

                                    {/* TITLE */}
                                    <h2>
                                        {opportunity.title}
                                    </h2>

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
                                                📅{" "}
                                                {formatDeadline(
                                                    opportunity.deadline
                                                )}
                                            </span>
                                        </div>

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
                                            className="remove-button"
                                            onClick={() =>
                                                removeSavedOpportunity(
                                                    opportunity.id
                                                )
                                            }
                                            disabled={
                                                removingId ===
                                                opportunity.id
                                            }
                                        >
                                            {removingId ===
                                            opportunity.id
                                                ? "Removing..."
                                                : "Remove"}
                                        </button>

                                    </div>

                                </article>
                            )
                        )}
                    </div>
                )}

            </div>

            <style>{styles}</style>
        </div>
    );
}

const styles = `
    * {
        box-sizing: border-box;
    }

    .saved-page {
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

    .saved-container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 40px 24px 70px;
    }

    /* HEADER */

    .page-header {
        margin-bottom: 35px;
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

    /* RESULTS */

    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-bottom: 22px;
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

    .explore-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 0 16px;
        border-radius: 9px;
        background: #111827;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;
    }

    .explore-button:hover {
        background: #1f2937;
    }

    /* GRID */

    .saved-grid {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(320px, 1fr));
        gap: 22px;
    }

    /* CARD */

    .saved-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 22px;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
    }

    .saved-card:hover {
        transform: translateY(-3px);
        border-color: #c7d2fe;
        box-shadow:
            0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
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

    .saved-label {
        color: #4f46e5;
        font-size: 13px;
        font-weight: 700;
    }

    .saved-card h2 {
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

    /* ACTIONS */

    .card-actions {
        display: grid;
        grid-template-columns: 1fr 100px;
        gap: 10px;
        margin-top: 22px;
    }

    .view-button,
    .remove-button {
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

    .remove-button {
        border: 1px solid #fecaca;
        background: white;
        color: #dc2626;
    }

    .remove-button:hover {
        background: #fef2f2;
    }

    .remove-button:disabled {
        opacity: 0.6;
        cursor: wait;
    }

    /* EMPTY */

    .empty-state {
        padding: 75px 20px;
        text-align: center;
        background: white;
        border: 1px dashed #cbd5e1;
        border-radius: 16px;
    }

    .empty-icon {
        width: 62px;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        border-radius: 50%;
        background: #eef2ff;
        color: #4f46e5;
        font-size: 32px;
    }

    .empty-state h2 {
        margin: 0 0 8px;
    }

    .empty-state p {
        max-width: 480px;
        margin: 0 auto 22px;
        color: #64748b;
        line-height: 1.6;
    }

    .primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 0 18px;
        border-radius: 9px;
        background: #4f46e5;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;
    }

    .primary-button:hover {
        background: #4338ca;
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

    .retry-button {
        border: none;
        background: #4f46e5;
        color: white;
        padding: 11px 18px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* MOBILE */

    @media (max-width: 600px) {
        .saved-container {
            padding: 28px 16px 50px;
        }

        .page-header h1 {
            font-size: 30px;
        }

        .results-header {
            align-items: flex-start;
            flex-direction: column;
        }

        .saved-grid {
            grid-template-columns: 1fr;
        }

        .card-actions {
            grid-template-columns: 1fr;
        }

        .info-item {
            flex-direction: column;
            gap: 3px;
        }

        .explore-button {
            width: 100%;
        }
    }
`;

export default Saved;
