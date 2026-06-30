import { getCodespaceCollectionUrl, useApiCollectionByUrl } from '../api';

export default function Workouts() {
  const endpoint = getCodespaceCollectionUrl('workouts');
  const { items, total, responseShape, isLoading, error } = useApiCollectionByUrl(endpoint);

  return (
    <section className="panel-card p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className="eyebrow">Workouts</span>
          <h1 className="h2 mt-3 mb-2">Suggested training blocks</h1>
          <p className="text-white-75 mb-0">Workout recommendations linked to focus areas, difficulty, and suggested athletes.</p>
        </div>
        <div className="meta-card">
          <div className="meta-label">Endpoint.</div>
          <div className="meta-value">{endpoint}</div>
          <div className="meta-label mt-3">Response shape</div>
          <div className="meta-value text-capitalize">{responseShape}</div>
        </div>
      </div>
      {isLoading ? <p className="text-white-75 mb-0">Loading workouts...</p> : null}
      {error ? <div className="alert alert-warning mb-0">Unable to load workouts: {error}</div> : null}
      {!isLoading && !error ? (
        <>
          <p className="text-white-75">Showing {items.length} of {total} workout records.</p>
          <div className="row g-4">
            {items.map((workout) => (
              <div className="col-lg-6" key={workout._id ?? workout.title}>
                <article className="metric-card h-100 p-4">
                  <p className="text-uppercase text-white-50 small mb-2">{workout.focus ?? 'General focus'}</p>
                  <h2 className="h4 mb-2">{workout.title ?? 'Untitled workout'}</h2>
                  <p className="text-white-75 mb-2">Difficulty: {workout.difficulty ?? 'beginner'}</p>
                  <p className="text-white-75 mb-3">Duration: {workout.durationMinutes ?? 0} minutes</p>
                  <p className="small text-white-50 mb-2">Exercises</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {(workout.exercises ?? []).map((exercise) => (
                      <span className="soft-chip soft-chip--inline" key={exercise}>{exercise}</span>
                    ))}
                  </div>
                  <p className="small text-white-50 mb-2">Suggested for</p>
                  <div className="d-flex flex-wrap gap-2">
                    {(workout.suggestedFor ?? []).map((user) => (
                      <span className="soft-chip soft-chip--inline" key={user}>{user}</span>
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