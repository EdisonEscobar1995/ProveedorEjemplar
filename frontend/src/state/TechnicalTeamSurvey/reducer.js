import {
  GET_TECHNICAL_TEAM_SURVEY_PROGRESS,
  GET_TECHNICAL_TEAM_SURVEY_SUCCESS,
  FILTER_TECHNICAL_TEAM_SURVEY,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function technicalTeamSurveyApp(state = initialState, action) {
  switch (action.type) {
    case GET_TECHNICAL_TEAM_SURVEY_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_TECHNICAL_TEAM_SURVEY_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case FILTER_TECHNICAL_TEAM_SURVEY: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            const {
              supply = '',
              category = '',
              country = '',
              supplier = '',
            } = action.data;
            let visible = true;
            if (category !== '' && category !== item.idCategory) {
              visible = false;
            } else if (country !== '' && country !== item.idCountry) {
              visible = false;
            } else if (supplier !== '' && supplier !== item.id) {
              visible = false;
            } else if (supply !== '' && supply !== item.idSupply) {
              visible = false;
            }
            return {
              ...item,
              visible,
            };
          }),
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

export default technicalTeamSurveyApp;
