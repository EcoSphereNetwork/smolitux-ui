import { fetchActivityPub, searchActivityPub } from './activityPub';
import { mockFetch, mockFetchError } from '../../../../test-utils/test-mocks';

describe('activityPub protocol helpers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetchActivityPub sends Accept header and parses json', async () => {
    mockFetch({ id: 'actor1' });
    const data = await fetchActivityPub('https://example.com');
    expect(global.fetch).toHaveBeenCalledWith('https://example.com', expect.objectContaining({
      headers: expect.objectContaining({ Accept: 'application/activity+json' }),
    }));
    expect(data).toEqual({ id: 'actor1' });
  });

  it('fetchActivityPub throws on network error', async () => {
    mockFetchError('fail');
    await expect(fetchActivityPub('https://bad.example')).rejects.toThrow('fail');
  });

  it('searchActivityPub constructs query url and returns items', async () => {
    mockFetch({ items: [{ id: '1', title: 't', url: 'u', type: 'post', platform: { id: 'p', name: 'p', url: 'u' } }] });
    const results = await searchActivityPub('https://example.com/search', 'foo');
    expect(global.fetch).toHaveBeenCalled();
    expect(results[0].id).toBe('1');
  });
});
