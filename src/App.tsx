import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

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

function Issues({
  issues,
  setIssues,
}: {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}) {
  const [title, setTitle] = useState("");

  function handleAddIssue() {
    if (title.trim() === "") {
      return;
    }

    const newIssue: Issue = {
      id: issues.length + 1,
      title: title,
      status: "Todo",
    };

    setIssues([...issues, newIssue]);
    setTitle("");
  }

  function handleStatusChange(
    id: number,
    newStatus: Issue["status"]
  ) {
    setIssues(
      issues.map((issue) =>
        issue.id === id
          ? { ...issue, status: newStatus }
          : issue
      )
    );
  }

  return (
    <main>
      <section className="page-card">
        <h2>Issues</h2>

        <p className="subtitle">
          Track and manage development tasks.
        </p>

        <div className="issue-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new issue..."
          />

          <button onClick={handleAddIssue}>
            Add Issue
          </button>
        </div>

        <div className="simple-list">
          {issues.map((issue) => (
            <div
              className="issue-card"
              key={issue.id}
            >
              <div>
                <span className="issue-number">
                  #{issue.id}
                </span>

                <h3>{issue.title}</h3>
              </div>

              <select
                value={issue.status}
                onChange={(e) =>
                  handleStatusChange(
                    issue.id,
                    e.target.value as Issue["status"]
                  )
                }
              >
                <option value="Todo">Todo</option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
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

  const [issues, setIssues] = useState<Issue[]>([
  { id: 1, title: "Fix login bug", status: "Todo" },
  { id: 2, title: "Add search feature", status: "In Progress" },
  { id: 3, title: "Update dashboard", status: "Completed" },
  { id: 4, title: "Fix API error", status: "Todo" },
]);

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
          <Route
  path="/dashboard"
  element={<Dashboard issues={issues} />}
/>
          <Route path="/projects" element={<Projects />} />
          <Route
  path="/issues"
  element={
    <Issues
      issues={issues}
      setIssues={setIssues}
    />
  }
/>
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;