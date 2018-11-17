import {
  addItem,
  getList,
  initDB,
  removeItem,
  updateItem
} from "../../utils/api";
import { createRequestTypes, requestActions } from "../helpers";

export const [
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  GET_LIST_ERROR
] = createRequestTypes("smb/list", "GET_LIST", requestActions);

export default function reducer(
  state = {
    list: []
  },
  action
) {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}

export function getListAction() {
  return async dispatch => {
    await getList(values =>
      dispatch({ type: GET_LIST_SUCCESS, payload: values })
    );
  };
}

export function initDBAction() {
  return async dispatch => {
    await initDB();
  };
}

export function addItemAction(data) {
  return async dispatch => {
    await addItem(data);
  };
}

export function editItemAction(data) {
  return async dispatch => {
    await updateItem(data);
  };
}
export function removeItemAction(id) {
  return async dispatch => {
    await removeItem(id);
  };
}
