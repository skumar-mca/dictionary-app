import * as type from '../action-types';

export const setLoader = (flag) => ({
    type: type.SET_LOADER,
    flag
});

export default {
    setLoader
}
