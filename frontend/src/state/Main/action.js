import {
  GET_USER_CONTEXT_PROGRESS,
  GET_USER_CONTEXT_SUCCESS,
  TOGGLE_MODAL,
  REQUEST_FAILED,
  LOADING_MODAL,
} from './const';

import { getUserContextApi } from '../../api/user';
import { requestApi, sortByField } from '../../utils/action';

const getUserContextProgress = () => ({
  type: GET_USER_CONTEXT_PROGRESS,
});

const getUserContextSuccess = data => ({
  type: GET_USER_CONTEXT_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getUserContext = () => (dispatch) => {
  requestApi(dispatch, getUserContextProgress, getUserContextApi)
    .then((response) => {
      const { data } = response.data;
      const menu = sortByField(data.menu, 'categoryNumber');
      const categories = new Array(menu[menu.length - 1].categoryNumber);
      menu.forEach((item) => {
        if (!categories[item.categoryNumber]) {
          categories[item.categoryNumber] = {
            name: item.categoryName,
            items: [item],
          };
        } else {
          categories[item.categoryNumber].items.push(item);
        }
      });
      data.categories = categories;
      dispatch(getUserContextSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const openModal = component => ({
  type: TOGGLE_MODAL,
  visibleModal: true,
  component,
});

const closeModal = () => ({
  type: TOGGLE_MODAL,
  visibleModal: false,
  component: null,
});

const loadingModal = flag => ({
  type: LOADING_MODAL,
  flag,
});

export {
  getUserContext,
  openModal,
  closeModal,
  loadingModal,
};
