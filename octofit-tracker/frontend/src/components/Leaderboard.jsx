import { useApiCollection } from '../api';

export default function Leaderboard() {
  const { items, total, responseShape, isLoading, error, endpoint } = useApiCollection('leaderboard');

  return (
    <section className="panel-card p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="eyebrow">Leaderboard</span>
          <h1 className="h2 mt-3 mb-2">Competitive standings</h1>
          <p className="text-white-75 mb-0">Athlete ranks and points, with support for both array and paginated API responses.</p>
        </div>
        <div className="meta-card">
          <div className="meta-label">Endpoint</div>
          <div className="meta-value">{endpoint}</div>
          <div className="meta-label mt-3">Response shape</div>
          <div className="meta-value text-capitalize">{responseShape}</div>
        </div>
      </div>
      {isLoading ? <p className="text-white-75 mb-0">Loading leaderboard...</p> : null}
      {error ? <div className="alert alert-warning mb-0">Unable to load leaderboard: {error}</div> : null}
      {!isLoading && !error ? (
        <>
          <p className="text-white-75">Showing {items.length} of {total} leaderboard records.</p>
          <div className="table-responsive">
            <table className="table table-dark table-borderless align-middle octo-table">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => (
                  <tr key={entry._id ?? `${entry.userId}-${entry.rank}`}>
                    <td>{entry.rank ?? '-'}</td>
                    <td>{entry.username ?? entry.userId ?? 'n/a'}</td>
                    <td>{entry.teamName ?? 'No team'}</td>
                    <td>{entry.points ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </section>
  );
}