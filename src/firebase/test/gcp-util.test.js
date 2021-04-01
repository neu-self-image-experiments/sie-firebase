import { uploadSelfImage, observeStimuliCompletion } from '../api/gcp-utils';
import { useState } from 'react';

test('upload self image', () => {
  const userId = 'test';
  const experimentId = '001';
  const image = new File('../../../../testImages/test01.jpeg');
  expect(uploadSelfImage(userId, experimentId, image)).toEqual({
    status: StatusCodes.CREATED,
    message: 'image successfully uploaded',
    data: null,
  });
});

test('observe stimuli completion', async () => {
  const userId = 'test';
  const experimentId = '001';
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const imageUrlsHandler = (urls) => setUrls(urls);
  const errorHandler = (error) => setError(error);
  await observeStimuliCompletion(userId, experimentId,
    imageUrlsHandler, errorHandler);
  expect(urls).toHaveLength(400);
  expect(error).toBe('');
});
