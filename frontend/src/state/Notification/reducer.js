import {
  GET_NOTIFICATION_PROGRESS,
  GET_NOTIFICATION_SUCCESS,
  REQUEST_FAILED,
  SAVE_NOTIFICATION,
  CLEAN_DATA,
  GET_NOTIFICATION_BY_ID_SUCCESS,
  UPDATE_NOTIFICATION_ATTACHMENT,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_BY_KEY_NOTIFICATION_SUCCESS,
  GET_USERS_BY_KEY_NOTIFICATION_PROGRESS,
} from './const';

const initialState = {
  data: [],
  users: [],
  searchValue: '',
  dataOption: {},
  loading: false,
  fetching: false,
};

function notificationApp(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_BY_KEY_NOTIFICATION_PROGRESS: {
      return {
        ...state,
        fetching: true,
      };
    }
    case GET_USERS_BY_KEY_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        fetching: false,
        users: action.data,
      };
    }
    case GET_USERS_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    }
    case GET_NOTIFICATION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_NOTIFICATION_BY_ID_SUCCESS: {
      return {
        ...state,
        dataOption: action.dataOption,
        loading: false,
      };
    }
    case SAVE_NOTIFICATION: {
      return {
        ...state,
        loading: false,
      };
    }
    case UPDATE_NOTIFICATION_ATTACHMENT: {
      return {
        ...state,
        loading: false,
        data: action.data,
        dataOption: action.dataOption,
      };
    }
    case CLEAN_DATA: {
      return {
        ...state,
        dataOption: {
          ...state.dataOption,
          message: '',
          subject: '',
          withCopy: [],
          // banner: {},
          // idBanner: '',
          // footer: {},
          // idFooter: '',
        },
      };
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default notificationApp;
