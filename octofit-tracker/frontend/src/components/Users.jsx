import { getCodespaceCollectionUrl, useApiCollectionByUrl } from '../api';

export default function Users() {
  const endpoint = getCodespaceCollectionUrl('users');
  const { items, total, responseShape, isLoading, error } = useApiCollectionByUrl(endpoint);

  return (
    <section className="panel-card p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="eyebrow">Users</span>
          <h1 className="h2 mt-3 mb-2">Athlete directory</h1>
          <p className="text-white-75 mb-0">Profiles, usernames, email addresses, and team membership from the API tier.</p>
        </div>
        <div className="meta-card">
          <div className="meta-label">Endpoint</div>
          <div className="meta-value">{endpoint}</div>
          <div className="meta-label mt-3">Response shape</div>
          <div className="meta-value text-capitalize">{responseShape}</div>
        </div>
      </div>
      {isLoading ? <p className="text-white-75 mb-0">Loading users...</p> : null}
      {error ? <div className="alert alert-warning mb-0">Unable to load users: {error}</div> : null}
      {!isLoading && !error ? (
        <>
          <p className="text-white-75">Showing {items.length} of {total} user records.</p>
          <div className="table-responsive">
            <table className="table table-dark table-borderless align-middle octo-table">
              <thead>
                <tr>
                  <th scope="col">Display Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                </tr>
              </thead>
              <tbody>
                {items.map((user) => (
                  <tr key={user._id ?? user.username}>
                    <td>{user.displayName ?? 'Unknown user'}</td>
                    <td>{user.username ?? 'n/a'}</td>
                    <td>{user.email ?? 'n/a'}</td>
                    <td>{user.teamId ?? 'Unassigned'}</td>
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