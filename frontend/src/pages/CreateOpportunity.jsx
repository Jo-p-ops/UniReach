import { Link } from "react-router-dom";

function CreateOpportunity() {
  return (
    <div className="create-opportunity-page">
      <header className="create-opportunity-header">
        <Link to="/provider" className="back-home">
          ← Provider Dashboard
        </Link>

        <h1>Post an Opportunity</h1>

        <p>
          Share a new opportunity with students and job seekers on UniReach.
        </p>
      </header>

      <section className="opportunity-form-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-section">
            <h2>Opportunity Information</h2>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="title">
                  Opportunity Title
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Software Engineering Internship"
                />
              </div>

              <div className="form-field">
                <label htmlFor="category">
                  Category
                </label>

                <select id="category">
                  <option value="">Select category</option>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Training">Training</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="e.g. Accra, Ghana"
                />
              </div>

              <div className="form-field">
                <label htmlFor="deadline">
                  Application Deadline
                </label>

                <input
                  id="deadline"
                  type="date"
                />
              </div>

              <div className="form-field">
                <label htmlFor="channel">
                  Channel
                </label>

                <select id="channel">
                  <option value="">
                    Select channel
                  </option>
                  <option value="technology">
                    Technology
                  </option>
                  <option value="engineering">
                    Engineering & Energy
                  </option>
                  <option value="jobs">
                    Jobs
                  </option>
                  <option value="internships">
                    Internships
                  </option>
                  <option value="training">
                    Training & Courses
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="application-link">
                  Application Link
                </label>

                <input
                  id="application-link"
                  type="url"
                  placeholder="https://example.com/apply"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Description</h2>

            <div className="form-field">
              <label htmlFor="description">
                Opportunity Description
              </label>

              <textarea
                id="description"
                rows="6"
                placeholder="Describe the opportunity, responsibilities and what applicants can expect."
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>Requirements</h2>

            <div className="form-field">
              <label htmlFor="requirements">
                Applicant Requirements
              </label>

              <textarea
                id="requirements"
                rows="6"
                placeholder="Enter the requirements for applicants. You can list qualifications, skills, experience and other requirements."
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="employment-type">
                  Employment Type
                </label>

                <select id="employment-type">
                  <option value="">Select type</option>
                  <option value="full-time">
                    Full Time
                  </option>
                  <option value="part-time">
                    Part Time
                  </option>
                  <option value="contract">
                    Contract
                  </option>
                  <option value="temporary">
                    Temporary
                  </option>
                  <option value="volunteer">
                    Volunteer
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="experience">
                  Experience Level
                </label>

                <select id="experience">
                  <option value="">Select level</option>
                  <option value="entry">
                    Entry Level
                  </option>
                  <option value="junior">
                    Junior
                  </option>
                  <option value="mid">
                    Mid Level
                  </option>
                  <option value="senior">
                    Senior
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link
              to="/provider/opportunities"
              className="cancel-button"
            >
              Cancel
            </Link>

            <button type="submit">
              Publish Opportunity
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateOpportunity;