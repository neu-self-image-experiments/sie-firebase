import { getSieStimuliFromBucket } from '../api/gcp-utils';
// disregard uploadSelfImage function as unit tests can cause too much
// burden on cloud storage.

// test observe image stimuli generation completion.
test('get 400 stimuli image urls from bucket', async () => {
  const userId = 'testuser';
  const experimentId = '002';

  // if the user-experiment folder exists, it shall have length of 400
  // otherwise it shall return an empty array
  return getSieStimuliFromBucket(userId, experimentId).then((res) => {
    try {
      expect(res.data).toHaveLength(400);
      expect(res.status).toBe(200);
    } catch {
      try {
        // got empty array when the user has not uploaded a photo yet
        expect(res.data).toHaveLength(0);
        expect(res.status).toBe(204);
      } catch {
        // error while fetching image urls
        expect(res.status).toBe(500);
      }
    }
  });
});
