import reducer from './Auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userid: null,
            error: null,
            loading: false,
            authredirectpath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userid: null,
            error: null,
            loading: false,
            authredirectpath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userid: 'some-user-id'
         })).toEqual({
            token: 'some-token',
            userid: 'some-user-id',
            error: null,
            loading: false,
            authredirectpath: '/'
        });
    })
});
