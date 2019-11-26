import * as actions from '../../actions';
import reducer from '../index';

describe('reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      initialLoading: false,
      join: {
        id: '',
        password: '',
        passwordToCheck: ''
      },
      login: {
        id: '',
        password: ''
      },
      isLoggedIn: {
        check: false
      },
      user: {
        id: ''
      },
      game: {
        isStarted: false,
        role: '',
        socket: null,
        endTime: null,
        result: null,
        finishMessage: null
      },
      hide: {
        ready: false,
        photo: [],
        notice: false,
        partnerLocation: null,
        myLocation: null,
        message: '',
        messageCount: 0
      },
      seek: {
        ready: false,
        photo: [],
        notice: false,
        partnerLocation: null,
        myLocation: null,
        hintLocation: null,
        geoLocationId: null,
        message: '',
        firstHint: false,
        secondHint: false,
        isShownPhoto: false,
        isShownMap: false,
        distanceHint: null
      }
    };
  });

  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should save user id after login and change isLoggedIn state to true', () => {
    const userId = 'sally';
    const loginResult = reducer(initialState, actions.logIn(userId));
    expect(loginResult.user.id).toEqual(userId);
    expect(loginResult.isLoggedIn.check).toEqual(true);
  });

  it('should initialize state when user logout', () => {
    const logoutResult = reducer(initialState, actions.logOut);
    expect(logoutResult).toEqual(initialState);
  });

  it('should update photo state when hide user take pictures', () => {
    const photoA = 'A';
    const photoB = 'B';
    const photoC = 'C';

    const takePhotoAResult = reducer(initialState, actions.takePhoto(photoA));
    expect(takePhotoAResult.hide.photo.length).toEqual(1);
    const takePhotoBResult = reducer(
      takePhotoAResult,
      actions.takePhoto(photoB)
    );
    expect(takePhotoBResult.hide.photo.length).toEqual(2);
    const takePhotoCResult = reducer(
      takePhotoBResult,
      actions.takePhoto(photoC)
    );
    expect(takePhotoCResult.hide.photo.length).toEqual(3);
  });

  it('should update seek user state when receive data from hide user', () => {
    const mockData = [
      ['A', 'B', 'C'],
      {
        lat: '37',
        lng: '127'
      },
      [{ hint: 1 }, { hint: 2 }, { hint: 3 }],
      'geoId'
    ];

    const receiveDataResult = reducer(
      initialState,
      actions.receivePhotoLocation(...mockData)
    );
    expect(receiveDataResult.seek.photo).toBeInstanceOf(Array);
    expect(receiveDataResult.seek.partnerLocation).toBeInstanceOf(Object);
    expect(receiveDataResult.seek.hintLocation.length).toEqual(3);
    expect(receiveDataResult.seek.geoLocationId).toEqual('geoId');
  });

  it('should initialize game, hide and seek state when go back to home', () => {
    const backToHomeResult = reducer(initialState, actions.backToHome);
    expect(backToHomeResult.game).toEqual(initialState.game);
    expect(backToHomeResult.hide).toEqual(initialState.hide);
    expect(backToHomeResult.seek).toEqual(initialState.seek);
  });
});
