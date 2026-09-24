import { useState } from "react";
import { Link } from "react-router-dom";

function Channels() {
  const channels = [
    {
      id: 1,
      name: "Technology",
      description:
        "Discover technology jobs, internships, events and other opportunities.",
      icon: "💻",
    },
    {
      id: 2,
      name: "Engineering & Energy",
      description:
        "Find engineering, energy, power and renewable energy opportunities.",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Jobs",
      description:
        "Explore job opportunities from companies and organizations.",
      icon: "💼",
    },
    {
      id: 4,
      name: "Scholarships",
      description:
        "Discover scholarships and financial opportunities for students.",
      icon: "🎓",
    },
    {
      id: 5,
      name: "Internships",
      description:
        "Find internships that help you gain practical work experience.",
      icon: "📚",
    },
    {
      id: 6,
      name: "AI & Data Science",
      description:
        "Explore opportunities in artificial intelligence, data science and machine learning.",
      icon: "🤖",
    },
    {
      id: 7,
      name: "Training & Courses",
      description:
        "Discover courses, bootcamps and professional development programs.",
      icon: "🧠",
    },
    {
      id: 8,
      name: "NGOs & Development",
      description:
        "Find opportunities from NGOs, development organizations and social impact groups.",
      icon: "🌍",
    },
  ];

  const [followedChannels, setFollowedChannels] = useState(() => {
    return JSON.parse(localStorage.getItem("followedChannels")) || [];
  });

  const toggleFollow = (channel) => {
    setFollowedChannels((currentFollowed) => {
      const alreadyFollowing = currentFollowed.some(
        (item) => item.id === channel.id
      );

      let updatedFollowed;

      if (alreadyFollowing) {
        updatedFollowed = currentFollowed.filter(
          (item) => item.id !== channel.id
        );
      } else {
        updatedFollowed = [...currentFollowed, channel];
      }

      localStorage.setItem(
        "followedChannels",
        JSON.stringify(updatedFollowed)
      );

      return updatedFollowed;
    });
  };

  return (
    <div className="channels-page">
      <header className="channels-header">
        <Link to="/dashboard" className="back-home">
          ← Dashboard
        </Link>

        <h1>Channels</h1>

        <p>
          Follow channels that match your interests and receive relevant
          opportunities.
        </p>
      </header>

      <section className="channels-grid">
        {channels.map((channel) => {
          const isFollowing = followedChannels.some(
            (item) => item.id === channel.id
          );

          return (
            <div className="channel-card" key={channel.id}>
              <div className="channel-icon">{channel.icon}</div>

              <h3>{channel.name}</h3>

              <p>{channel.description}</p>

              <div className="channel-footer">
                <button
                  type="button"
                  onClick={() => toggleFollow(channel)}
                  className={isFollowing ? "following-button" : ""}
                >
                  {isFollowing ? "Following ✓" : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Channels;