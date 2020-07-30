import CacheManager from 'helpers/cache-manager';
import * as CommonActions from 'helpers/common.actions';
import { setMasterData } from 'helpers/common.actions';
import { MasterData_TYPE, REPORT_TYPE } from "helpers/constants";
import * as lodash from "lodash";
import { store } from "store";
import { buildURL, callAPI, Urls } from "./api-urls";

const listNotToSort = [
  MasterData_TYPE.SUB_STATUS_TYPE,
  MasterData_TYPE.STATUS_TYPE_FOR_CASE,
  MasterData_TYPE.COURT_TYPE,
  MasterData_TYPE.REPORT_RECOMMENDATION_TYPE
]

export const getMasterDataFor = (masterDataType, cb) => {
  loadMasterData(masterDataType, cb);
}

export const statusOptionsForNewCase = (cb) => {
  loadMasterData(MasterData_TYPE.STATUS_TYPE_FOR_CASE, (resp) => {
    const allowedStatus = ['open', 'initial', 'potential'];
    const filteredStatus = lodash.filter(resp || [], (itm) => {
      return lodash.includes(allowedStatus, (itm.label || '').toLowerCase())
    });
    cb && cb(filteredStatus);
  });
}

export const yesNoMasterData = (cb) => {
  loadMasterData(MasterData_TYPE.INSTITUTION_CLIENT_TYPE, (resp) => {
    let yesNoList = lodash.filter(resp, (itm) => { return (itm.label || '').toLowerCase() !== 'potential' });
    yesNoList = lodash.orderBy(yesNoList, ['label'], 'desc');
    cb && cb(yesNoList);
  });
}

export const reportTypeWithLitigationMasterData = (cb) => {
  loadMasterData(MasterData_TYPE.REPORT_TYPE, (resp) => {
    let allList = lodash.filter(resp, (itm) => { return parseInt(itm.id) !== REPORT_TYPE.LITIGATION });
    allList = lodash.orderBy(allList, ['label'], 'desc');
    cb && cb(allList);
  });
}

export const activeInactiveMasterData = (cb) => {
  loadMasterData(MasterData_TYPE.STATUS_TYPE, (resp) => {
    let activeInactiveList = lodash.filter(resp, (itm) => { return (itm.label || '').toLowerCase() !== 'potential' });
    cb && cb(activeInactiveList);
  });
}

export const userListMasterData = (cb) => {
  CommonActions.getUserList((resp) => {
    let users = lodash.map(resp || [], (usr) => {
      return {
        id: usr.UserId,
        label: `${usr.FirstName} ${usr.LastName}`,
        ...usr
      }
    });

    users = lodash.sortBy(users, ['label']);
    cb && cb(users);
  });
}

export const loadMasterData = (masterDataType, cb) => {
  const storeData = store.getState();
  let masterData = lodash.get(storeData, `commonReducer.masterData.${masterDataType}`, []);
  if (masterData.length === 0) {
    masterData = CacheManager.getItem(`commonReducer.masterData.${masterDataType}`, []);
  }

  if (masterData.length > 0) {
    return cb(masterData);
  }

  const url = `${buildURL(Urls.MasterData)}?type=${masterDataType}`;
  callAPI(url, 'get', null, (resp) => {
    if (resp) {
      let result = resp.Data.map(itm => { return { id: itm.Id, label: itm.Value, ...itm } });

      if (!lodash.includes(listNotToSort, masterDataType)) {
        result = lodash.sortBy(result, ['label']);
      }

      setMasterData(masterDataType, result);
      CacheManager.setItem(`commonReducer.masterData.${masterDataType}`, result);
      //sessionStorage.setItem(`commonReducer.masterData.${masterDataType}`, JSON.stringify(result));
      cb && cb(result);
    }
  })
}
