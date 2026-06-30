import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, isCodespaceConfigured } from './api';

const sections = [
  {
    title: 'Users',
    path: '/users',
    detail: 'Profile and roster data for individual athletes.',
  },
  {
    title: 'Activities',
    path: '/activities',
    detail: 'Training history, minutes, and earned points.',
  },
  {
    title: 'Teams',
    path: '/teams',
    detail: 'Shared groups, members, and team point totals.',
  },
  {
    title: 'Leaderboard',
    path: '/leaderboard',
    detail: 'Current standings and rank ordering.',
  },
  {
    title: 'Workouts',
    path: '/workouts',
    detail: 'Recommended sessions and training focus areas.',
  },
];

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="octo-header border-bottom border-light border-opacity-10">
        <div className="container py-3 d-flex flex-column gap-3">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <Link to="/" className="brand-link text-decoration-none">
              <img src="/octofitapp-small.png" alt="OctoFit Tracker logo" className="brand-logo" />
              <span className="brand-name">OctoFit Tracker</span>
            </Link>
            <nav className="nav nav-pills flex-wrap gap-2">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Overview
              </NavLink>
              <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Users
              </NavLink>
              <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Activities
              </NavLink>
              <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Teams
              </NavLink>
              <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Leaderboard
              </NavLink>
              <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Workouts
              </NavLink>
            </nav>
          </div>
          <div className="env-banner">
            <strong>Environment:</strong>{' '}
            {isCodespaceConfigured
              ? 'Using the Codespaces API URL derived from VITE_CODESPACE_NAME.'
              : 'VITE_CODESPACE_NAME is not set, so the app safely falls back to localhost:8000.'}
          </div>
        </div>
      </header>
      <main className="container py-4 py-lg-5">{children}</main>
    </div>
  );
}

function Overview() {
  return (
    <>
      <section className="hero-card p-4 p-lg-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="eyebrow">React 19 presentation tier</span>
            <h1 className="display-5 fw-semibold mt-3 mb-3">Route the OctoFit API through Codespaces when available, and localhost when not.</h1>
            <p className="lead text-white-75 mb-4">
              Each page below fetches its own resource collection using react-router-dom navigation and a safe API base URL builder.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link className="btn btn-light btn-lg px-4" to="/users">Open users</Link>
              <Link className="btn btn-outline-light btn-lg px-4" to="/leaderboard">View leaderboard</Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="glass-panel p-4">
              <p className="text-uppercase text-white-50 small mb-2">API base URL</p>
              <p className="route-url mb-3">{apiBaseUrl}</p>
              <p className="text-white-75 mb-0">
                Define VITE_CODESPACE_NAME in .env.local for Codespaces. Without it, requests stay on the localhost API tier.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="row g-4 mb-4">
        {sections.map((section) => (
          <div className="col-md-6 col-xl-4" key={section.path}>
            <article className="metric-card h-100 p-4">
              <p className="text-uppercase text-white-50 small mb-2">API route</p>
              <h2 className="h4 mb-2">{section.title}</h2>
              <p className="text-white-75 mb-4">{section.detail}</p>
              <Link className="btn btn-outline-light" to={section.path}>Open {section.title}</Link>
            </article>
          </div>
        ))}
      </div>
      <section className="panel-card p-4">
        <h2 className="h4 mb-3">Frontend environment setup</h2>
        <p className="text-white-75 mb-3">
          For Codespaces, define VITE_CODESPACE_NAME in .env.local so the UI can call https://VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/.
        </p>
        <pre className="env-code mb-0">VITE_CODESPACE_NAME=your-codespace-name</pre>
      </section>
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}