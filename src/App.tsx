import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

type StatCardProps = {
  number: number;
  title: string;
};

type Issue = {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Completed";
};

function StatCard({ number, title }: StatCardProps) {
  return (
    <div className="stat-card">
      <h2>{number}</h2>
      <p>{title}</p>
    </div>
  );
}

function Dashboard() {
  const [starred, setStarred] = useState(false);

  useEffect(() => {
    console.log("Dashboard loaded");

    return () => {
      console.log("Dashboard cleanup");
    };
  }, []);

  const issues: Issue[] = [
    {
      id: 1,
      title: "Fix login bug",
      status: "Todo",
    },
    {
      id: 2,
      title: "Add search feature",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Update dashboard",
      status: "Completed",
    },
    {
      id: 4,
      title: "Fix API error",
      status: "Todo",
    },
  ];

  function handleStar() {
    setStarred(!starred);
  }

  return (
    <main>
      <section>
        <h2>Dashboard</h2>
        <p className="subtitle">
          Welcome back! Here's what's happening with your projects.
        </p>
      </section>

      <section className="stats">
        <StatCard number={3} title="Projects" />
        <StatCard number={12} title="Open Issues" />
        <StatCard number={5} title="Team Members" />
      </section>

      <section className="project-card">
        <div>
          <p className="small-text">PROJECT</p>
          <h2>Brain Battle</h2>
          <p>React + TypeScript game project</p>
        </div>

        <button onClick={handleStar}>
          {starred ? "★ Starred" : "☆ Star"}
        </button>
      </section>

      <section className="issues-section">
        <div className="section-header">
          <div>
            <h2>Recent Issues</h2>
            <p className="subtitle">
              Track the latest tasks in your projects.
            </p>
          </div>

          <button className="add-button">+ New Issue</button>
        </div>

        <div className="issues-list">
          {issues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <div>
                <span className="issue-number">#{issue.id}</span>
                <h3>{issue.title}</h3>
              </div>

              <span
                className={`status ${issue.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {issue.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Projects() {
  return (
    <main>
      <section className="page-card">
        <h2>Projects</h2>
        <p className="subtitle">Manage all your development projects.</p>

        <div className="project-item">
          <h3>Brain Battle</h3>
          <p>React + TypeScript game project</p>
        </div>

        <div className="project-item">
          <h3>DevFlow</h3>
          <p>Developer productivity platform</p>
        </div>
      </section>
    </main>
  );
}

function Issues() {
  const issues = [
    "Fix login bug",
    "Add search feature",
    "Update dashboard",
    "Fix API error",
  ];

  return (
    <main>
      <section className="page-card">
        <h2>Issues</h2>
        <p className="subtitle">Track and manage development tasks.</p>

        <div className="simple-list">
          {issues.map((issue, index) => (
            <div className="simple-item" key={index}>
              #{index + 1} — {issue}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Team() {
  const members = [
    "Shikha",
    "Aman",
    "Priya",
    "Rahul",
  ];

  return (
    <main>
      <section className="page-card">
        <h2>Team</h2>
        <p className="subtitle">People working on your projects.</p>

        <div className="team-list">
          {members.map((member) => (
            <div className="team-member" key={member}>
              <div className="avatar">
                {member.charAt(0)}
              </div>

              <div>
                <h3>{member}</h3>
                <p>Developer</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div>
            <h1>DevFlow</h1>
            <p>Developer Productivity Platform</p>
          </div>

          <div className="profile-button">SM</div>
        </header>

        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/issues">Issues</Link>
          <Link to="/team">Team</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;