export function createRequestTypes(path, actionName, actions) {
    return actions.map((action) => ({
      [`${actionName}_${action}`]: `${path}/${actionName}_${action}`,
    }));
  }
  export const requestActions = ['REQUEST', 'SUCCESS', 'ERROR'];
  export const savingActions = ['SUCCESS', 'ERROR'];
  