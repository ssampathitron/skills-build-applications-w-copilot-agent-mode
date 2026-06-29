import { Link, Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';

const scorecards = [
  { label: 'Weekly sessions', value: '6', detail: '+2 from last week' },
  { label: 'Team rank', value: '#2', detail: 'Climbing toward the top' },
  { label: 'Workout streak', value: '18 days', detail: 'Personal best pace' },
];

const agenda = [
  'Log today\'s workout before noon',
  'Review team leaderboard after your run',
  'Complete one recovery session this evening',
];

function Layout() {
  return (
    <div className="app-shell">
      <header className="octo-header border-bottom border-light border-opacity-10">
        <div className="container py-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <Link to="/" className="brand-link text-decoration-none">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit Tracker logo"
              className="brand-logo"
            />
            <span className="brand-name">OctoFit Tracker</span>
          </Link>
          <nav className="nav nav-pills gap-2">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
            <NavLink to="/activity" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Activity
            </NavLink>
            <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Teams
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="container py-4 py-lg-5">
        <Outlet />
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="hero-card p-4 p-lg-5 mb-4">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="eyebrow">Modern multi-tier fitness platform</span>
          <h1 className="display-5 fw-semibold mt-3 mb-3">
            Train, compete, and track your OctoFit progress in one place.
          </h1>
          <p className="lead text-white-75 mb-4">
            Capture activity, coordinate with your team, and surface the next best workout without leaving the dashboard.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-light btn-lg px-4">Log workout</button>
            <button className="btn btn-outline-light btn-lg px-4">View leaderboard</button>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass-panel p-4">
            <p className="text-uppercase text-white-50 small mb-2">Today\'s focus</p>
            <h2 className="h4 mb-3">Recovery plus interval work</h2>
            <p className="text-white-75 mb-0">
              A balanced session to keep momentum high while protecting tomorrow\'s performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Dashboard />
      <div className="row g-4 mb-4">
        {scorecards.map((card) => (
          <div className="col-md-4" key={card.label}>
            <article className="metric-card h-100 p-4">
              <p className="text-uppercase text-white-50 small mb-1">{card.label}</p>
              <div className="display-6 fw-semibold mb-2">{card.value}</div>
              <p className="text-white-75 mb-0">{card.detail}</p>
            </article>
          </div>
        ))}
      </div>
      <div className="row g-4">
        <div className="col-lg-7">
          <section className="panel-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">Workout agenda</h2>
              <span className="badge text-bg-light">API tier ready</span>
            </div>
            <ul className="list-group list-group-flush">
              {agenda.map((item) => (
                <li key={item} className="list-group-item bg-transparent text-white border-white border-opacity-10 px-0">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="col-lg-5">
          <section className="panel-card p-4 h-100">
            <h2 className="h4 mb-3">What ships next</h2>
            <div className="d-grid gap-3">
              <div className="soft-chip">Authentication and profiles</div>
              <div className="soft-chip">Activity logging and tracking</div>
              <div className="soft-chip">Team creation and leaderboard views</div>
              <div className="soft-chip">Personalized workout recommendations</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function ActivityPage() {
  return (
    <section className="panel-card p-4 p-lg-5">
      <h1 className="h2 mb-3">Activity</h1>
      <p className="text-white-75 mb-0">
        This route will later surface recent workouts, volume trends, and session logging controls.
      </p>
    </section>
  );
}

function TeamsPage() {
  return (
    <section className="panel-card p-4 p-lg-5">
      <h1 className="h2 mb-3">Teams</h1>
      <p className="text-white-75 mb-0">
        This route will later manage teams, rankings, and shared challenges.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
