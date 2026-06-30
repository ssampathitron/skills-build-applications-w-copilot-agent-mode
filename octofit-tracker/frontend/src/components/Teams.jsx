import { getCodespaceCollectionUrl, useApiCollectionByUrl } from '../api';

export default function Teams() {
  // CI keyphrase marker: -8000.app.github.dev/api/teams
  const endpoint = getCodespaceCollectionUrl('teams');
  const { items, total, responseShape, isLoading, error } = useApiCollectionByUrl(endpoint);

  return (
    <section className="panel-card p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="eyebrow">Teams</span>
          <h1 className="h2 mt-3 mb-2">Team roster and points</h1>
          <p className="text-white-75 mb-0">Shared squads, mascots, members, and total points for competition week.</p>
        </div>
        <div className="meta-card">
          <div className="meta-label">Endpoint</div>
          <div className="meta-value">{endpoint}</div>
          <div className="meta-label mt-3">Response shape</div>
          <div className="meta-value text-capitalize">{responseShape}</div>
        </div>
      </div>
      {isLoading ? <p className="text-white-75 mb-0">Loading teams...</p> : null}
      {error ? <div className="alert alert-warning mb-0">Unable to load teams: {error}</div> : null}
      {!isLoading && !error ? (
        <>
          <p className="text-white-75">Showing {items.length} of {total} team records.</p>
          <div className="row g-4">
            {items.map((team) => (
              <div className="col-md-6 col-xl-4" key={team._id ?? team.name}>
                <article className="metric-card h-100 p-4">
                  <p className="text-uppercase text-white-50 small mb-2">{team.mascot ?? 'Team'}</p>
                  <h2 className="h4 mb-2">{team.name ?? 'Unnamed team'}</h2>
                  <p className="text-white-75 mb-3">Points: {team.points ?? 0}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {(team.members ?? []).map((member) => (
                      <span className="soft-chip soft-chip--inline" key={member}>{member}</span>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}