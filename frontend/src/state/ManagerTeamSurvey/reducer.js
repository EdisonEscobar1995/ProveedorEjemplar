import {
  GET_MANAGER_TEAM_SURVEY_PROGRESS,
  GET_MANAGER_TEAM_SURVEY_SUCCESS,
  FINISH_MANAGER_TEAM_SURVEY_PROGRESS,
  FINISH_MANAGER_TEAM_SURVEY_SUCCESS,
  FILTER_MANAGER_TEAM_SURVEY,
  CHANGE_COMMENT_MANAGER,
  CHANGE_SCORE_MANAGER,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function managerTeamSurveyApp(state = initialState, action) {
  switch (action.type) {
    case GET_MANAGER_TEAM_SURVEY_PROGRESS:
    case FINISH_MANAGER_TEAM_SURVEY_PROGRESS:
    {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MANAGER_TEAM_SURVEY_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case CHANGE_SCORE_MANAGER: {
      const answers = [...state.data.masters.ManagerTeamAnswer];
      if (action.new) {
        answers.push(action.score);
      }
      return {
        ...state,
        data: {
          ...state.data,
          masters: {
            ...state.data.masters,
            ManagerTeamAnswer: answers,
          },
          suppliers: state.data.suppliers.map(supplier => (
            supplier.id === action.idSupplier ? {
              ...supplier,
              readOnly: action.value === null,
              score: {
                ...supplier.score,
                defaultValue: action.value ? {
                  key: action.value.key,
                  name: state.data.masters.EvaluationScale
                    .find(element => element.id === action.value.key).name,
                } : {
                  key: null,
                  name: null,
                },
                value: action.value ? parseInt(action.value.label, 10) : null,
                error: false,
              },
              idState: state.data.masters.State.find(
                element => element.shortName === 'MANAGER_TEAM').id,
            } : supplier
          )),
        },
        loading: false,
      };
    }
    case CHANGE_COMMENT_MANAGER: {
      const answers = [...state.data.masters.ManagerTeamAnswer];
      if (action.new) {
        answers.push(action.comment);
      }
      return {
        ...state,
        data: {
          ...state.data,
          masters: {
            ...state.data.masters,
            ManagerTeamAnswer: answers,
          },
          suppliers: state.data.suppliers.map(supplier => (
            supplier.id === action.idSupplier ? {
              ...supplier,
              readOnly: action.value === null,
              comment: {
                ...supplier.comment,
                value: action.value,
              },
              idState: state.data.masters.State.find(
                element => element.shortName === 'MANAGER_TEAM').id,
            } : supplier
          )),
        },
        loading: false,
      };
    }
    case FILTER_MANAGER_TEAM_SURVEY: {
      const managerProcess = [...state.data.masters.Managers];
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
              managers = '',
              states = '',
              companySize = '',
            } = action.data;
            const manager = managerProcess.find(x => x.name === (item.whoEvaluate ? item.whoEvaluate : ''));
            let visible = true;
            if (category !== '' && category !== item.idCategory) {
              visible = false;
            } else if (country !== '' && country !== item.idCountry) {
              visible = false;
            } else if (supplier !== '' && supplier !== item.id) {
              visible = false;
            } else if (companySize !== '' && companySize !== item.idCompanySize) {
              visible = false;
            } else if (supply !== '' && supply !== item.idSupply) {
              visible = false;
            } else if (managers !== '' && managers !== (manager !== undefined ? manager.id : null)) {
              visible = false;
            } else if (states !== '' && states !== item.idState) {
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
    case REQUEST_FAILED:
    case FINISH_MANAGER_TEAM_SURVEY_SUCCESS:
    {
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

export default managerTeamSurveyApp;
