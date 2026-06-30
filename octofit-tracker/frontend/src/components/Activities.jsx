import { getCodespaceCollectionUrl, useApiCollectionByUrl } from '../api';

export default function Activities() {
  const endpoint = getCodespaceCollectionUrl('activities');
  const { items, total, responseShape, isLoading, error } = useApiCollectionByUrl(endpoint);

  return (
    <section className="panel-card p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="eyebrow">Activities</span>
          <h1 className="h2 mt-3 mb-2">Recent training log</h1>
          <p className="text-white-75 mb-0">Durations, earned points, and activity dates coming from the activity API.</p>
        </div>
        <div className="meta-card">
          <div className="meta-label">Endpoint</div>
          <div className="meta-value">{endpoint}</div>
          <div className="meta-label mt-3">Response shape</div>
          <div className="meta-value text-capitalize">{responseShape}</div>
        </div>
      </div>
      {isLoading ? <p className="text-white-75 mb-0">Loading activities...</p> : null}
      {error ? <div className="alert alert-warning mb-0">Unable to load activities: {error}</div> : null}
      {!isLoading && !error ? (
        <>
          <p className="text-white-75">Showing {items.length} of {total} activity records.</p>
          <div className="table-responsive">
            <table className="table table-dark table-borderless align-middle octo-table">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Points</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity._id ?? `${activity.userId}-${activity.activityDate}`}>
                    <td>{activity.userId ?? 'n/a'}</td>
                    <td>{activity.type ?? 'n/a'}</td>
                    <td>{activity.durationMinutes ?? 0} min</td>
                    <td>{activity.points ?? 0}</td>
                    <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'n/a'}</td>
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