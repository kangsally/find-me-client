import { getDistance } from './getGeoLocation';

describe('getDistance', () => {
  it('should calculate exact distance', () => {
    expect(
      getDistance(37.5030042, 127.0507571, 37.504035189746, 127.051015210043)
    ).toEqual(117);
    expect(
      getDistance(37.5030042, 127.0507571, 37.50323870846376, 127.0509977039301)
    ).toEqual(34);
  });
});
