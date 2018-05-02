import {
  GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
  GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  REQUEST_FAILED,
  CLEAN_DATA,
  UPDATE_ATTACHMENT,
  SAVE_DATA_PROGRESS,
  SAVE_DATA_SUCCESS,
  CLEAN_STORE,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function generalAdministratorApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS:
    case SAVE_DATA_PROGRESS:
    {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS:
    {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case REQUEST_FAILED:
    case SAVE_DATA_SUCCESS:
    {
      return {
        ...state,
        loading: false,
      };
    }
    case CLEAN_DATA: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          id: '',
          rotationTime: '',
          title: '',
          content: '',
          informationProgram: '',
          inputPoll: '',
          uploadMaxFilesize: '',
        },
      };
    }
    case UPDATE_ATTACHMENT: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          images: action.images.images,
          document: action.images.document,
        },
      };
    }
    case CLEAN_STORE:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
}

export default generalAdministratorApp;
