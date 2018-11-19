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

export const addFirebase = data => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.push("list", { ...data, isBought: 0, id: 0 });
};

export const updateFirebase = data => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase
    .ref("list/" + data.key)
    .set({
      name: data.name,
      quantity: data.quantity,
      price : data.price,
      isBought: data.isBought
    });
};

export const removeFirebase = key => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase
    .remove("list/" + key)
};

export const loginAction = ({ login, password }) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase();
  console.log('firebase :', firebase);
  await firebase.login({
    email: `${login}`,
    password: `${password}`
  });
};

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
