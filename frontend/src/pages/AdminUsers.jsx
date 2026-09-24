import { Link } from "react-router-dom";

function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Joshua Nyamekye",
      email: "joshua@example.com",
      role: "Student",
      joined: "September 12, 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Ama Boateng",
      email: "ama@example.com",
      role: "Student",
      joined: "September 10, 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Tech Company Ghana",
      email: "info@techcompanyghana.com",
      role: "Provider",
      joined: "September 8, 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "FutureTech Foundation",
      email: "info@futuretech.org",
      role: "Provider",
      joined: "September 5, 2026",
      status: "Pending",
    },
    {
      id: 5,
      name: "Daniel Asare",
      email: "daniel@example.com",
      role: "Student",
      joined: "September 3, 2026",
      status: "Suspended",
    },
  ];

  return (
    <div className="admin-users-page">
      <header className="provider-page-header">
        <Link to="/admin" className="back-home">
          ← Admin Dashboard
        </Link>

        <div>
          <h1>User Management</h1>
          <p>
            View and manage student and provider accounts.
          </p>
        </div>
      </header>

      <section className="admin-user-summary">
        <div>
          <strong>2,480</strong>
          <span>Total Users</span>
        </div>

        <div>
          <strong>2,354</strong>
          <span>Students</span>
        </div>

        <div>
          <strong>126</strong>
          <span>Providers</span>
        </div>

        <div>
          <strong>8</strong>
          <span>Pending</span>
        </div>
      </section>

      <section className="admin-users-card">
        <div className="admin-users-toolbar">
          <div>
            <h2>Registered Users</h2>
            <p>Manage accounts registered on UniReach.</p>
          </div>

          <div className="admin-user-filters">
            <input
              type="text"
              placeholder="Search users..."
            />

            <select defaultValue="">
              <option value="">
                All Roles
              </option>

              <option value="student">
                Students
              </option>

              <option value="provider">
                Providers
              </option>
            </select>
          </div>
        </div>

        <div className="admin-users-list">
          {users.map((user) => (
            <div
              className="admin-user-row"
              key={user.id}
            >
              <div className="admin-user-avatar">
                {user.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="admin-user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>

              <span
                className={`admin-user-role ${user.role.toLowerCase()}`}
              >
                {user.role}
              </span>

              <div className="admin-user-joined">
                <small>Joined</small>
                <span>{user.joined}</span>
              </div>

              <span
                className={`admin-user-status ${user.status.toLowerCase()}`}
              >
                {user.status}
              </span>

              <div className="admin-user-actions">
                <button type="button">
                  View
                </button>

                <button type="button">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminUsers;