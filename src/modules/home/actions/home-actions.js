import * as types from '../../../action-types';
import { buildURL, callAPI, Urls } from "../../../helpers/api-urls";
const searchWord = (searchTerm, cb, dispatch) => {
  // const resp = { "pronunciation": "ˈeləˌvādəd", "word": "elevated", "definitions": [{ "type": "adjective", "definition": "situated or placed higher than the surrounding area.", "example": "this hotel has an elevated position above the village", "image_url": null, "emoji": null }, { "type": "verb", "definition": "raise or lift (something) to a higher position.", "example": "the exercise will naturally elevate your chest and head", "image_url": null, "emoji": null }, { "type": "verb", "definition": "raise to a more important or impressive level.", "example": "he was <b>elevated to</b> Secretary of State", "image_url": null, "emoji": null }] }
  // cb && cb(resp);
  // return;

  const url = buildURL(Urls.SearchWord, null, { searchWord: searchTerm });
  callAPI(url, 'get', null, (resp) => {
    if (resp) {
      cb && cb(resp);
      return;
    }

    cb && cb(null);

  });
};

const getImg = (searchTerm, cb) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=6WqMHFLsRcNdxStZAeWTAKDITe7ELdLv&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`;
  callAPI(url, 'get', null, (resp) => {
    if (resp) {
      cb && cb(resp);
      return;
    }
    cb && cb(null);
  });
};

const newSearchWordAdded = (dispatch) => {
  dispatch({ type: types.NEW_SEARCH_ADDED })
}



export default {
  searchWord,
  newSearchWordAdded,
  getImg
};
