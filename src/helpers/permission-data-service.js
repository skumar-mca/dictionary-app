import CacheManager from 'helpers/cache-manager';
import { setPermissionData } from 'helpers/common.actions';
import { RESOURCE_TYPE } from 'helpers/constants';
import * as lodash from 'lodash';
import { store } from "store";
import { buildURL, callAPI, Urls } from "./api-urls";

export const getPermissionDataFor = (resourceId, cb) => {
  loadPermissionData(resourceId, cb);
}

export const getPermissionValue = (permission, typeOfPermission) => {
  if (!lodash.get(permission, 'AccessInformation', null)) {
    return false;
  }

  switch (typeOfPermission) {
    case 'view': return lodash.get(permission, 'AccessInformation.CanView', false);
    case 'edit': return lodash.get(permission, 'AccessInformation.CanEdit', false);
    case 'create': return lodash.get(permission, 'AccessInformation.CanCreate', false);
    case 'delete': return lodash.get(permission, 'AccessInformation.CanDelete', false);
    case 'export': return lodash.get(permission, 'AccessInformation.CanExport', false);
    case 'search': return lodash.get(permission, 'AccessInformation.CanSearch', false);
    default: return lodash.get(permission, 'AccessInformation.CanView', false);
  }
}

export const loadPermissionData = (resourceId, cb) => {
  // let permissionData = CacheManager.getItem(`usrpermission_${resourceId}`, null);

  // if (permissionData) {
  //   return cb(permissionData);
  // }

  const storeData = store.getState();
  let permissionData = lodash.get(storeData, `commonReducer.permissionData.${resourceId}`, null);

  if (!permissionData) {
    permissionData = CacheManager.getItemWithTimeout(`usrpermission_${resourceId}`, null);
  }

  if (permissionData) {
    return cb(permissionData);
  }

  const isSilent = lodash.includes([RESOURCE_TYPE.WIDGET_774, RESOURCE_TYPE.WIDGET_775, RESOURCE_TYPE.WIDGET_776, RESOURCE_TYPE.WIDGET_779, RESOURCE_TYPE.WIDGET_792, RESOURCE_TYPE.WIDGET_781], resourceId);

  const url = buildURL(Urls.UserPermission, { resourceId: resourceId, silent: isSilent ? 1 : 2 })
  callAPI(url, 'post', null, (resp) => {
    if (lodash.get(resp, 'Status', false)) {
      const data = lodash.get(resp, 'Data', {});
      setPermissionData(resourceId, data);
      CacheManager.setItemWithTimeout(`usrpermission_${resourceId}`, data);
      //CacheManager.setItem(`usrpermission_${resourceId}`, data);
      cb && cb(data);
    }
  })
}

export const resetPermissionData = () => {
  lodash.forOwn(RESOURCE_TYPE, (value, key) => {
    CacheManager.removeItem(`usrpermission_${value}`);
    setPermissionData(value, null);
  });
}

export const getPagePermission = (page, cb) => {
  getPermissionDataFor(page, (resp) => {
    const hasPermission = getPermissionValue(resp, 'edit');
    cb(hasPermission);
  });
}
