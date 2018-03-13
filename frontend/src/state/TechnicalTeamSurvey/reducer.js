import {
  GET_TECHNICAL_TEAM_SURVEY_PROGRESS,
  GET_TECHNICAL_TEAM_SURVEY_SUCCESS,
  FILTER_TECHNICAL_TEAM_SURVEY,
  CALCULATE_TOTAL,
  CHANGE_SCORE,
  CHANGE_COMMENT,
  UPDATE_ERRORS,
  UPDATE_SUPPLIERS,
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
    case CALCULATE_TOTAL: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((supplier) => {
            const items = supplier.items.filter(item => item.value !== null);
            return {
              ...supplier,
              totals: supplier.totals.map((total) => {
                const subset = items.filter(item => item.idService === total.idService);
                return {
                  ...total,
                  value: subset.length > 0 ?
                    subset.reduce((a, b) => ({
                      value: a.value + b.value,
                    })).value / subset.length : 0,
                };
              }),
              total: items.length > 0 ?
                supplier.items.reduce((a, b) => ({
                  value: a.value + b.value,
                })).value / items.length : 0,
            };
          }),
        },
        loading: false,
      };
    }
    case CHANGE_SCORE: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map(supplier => (
            supplier.id === action.idSupplier ? {
              ...supplier,
              required: action.value !== null,
              readOnly: action.value === null,
              items: supplier.items.map(item => (
                item.id === action.idItem ? {
                  ...item,
                  defaultValue: action.value ? {
                    key: action.value.key,
                  } : {
                    key: null,
                  },
                  value: action.value ? parseInt(action.value.label, 10) : null,
                  error: false,
                } : item
              )),
            } : supplier
          )),
        },
      };
    }
    case CHANGE_COMMENT: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map(supplier => (
            supplier.id === action.idSupplier ? {
              ...supplier,
              required: action.value !== null,
              readOnly: action.value === null,
              comments: supplier.comments.map(comment => (
                comment.idService === action.idService ? {
                  ...comment,
                  value: action.value,
                } : comment
              )),
            } : supplier
          )),
        },
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
    case UPDATE_ERRORS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: [...action.data],
        },
      };
    }
    case UPDATE_SUPPLIERS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((supplier) => {
            if (action.data.indexOf(supplier.id) >= 0) {
              return {
                ...supplier,
                required: false,
                readOnly: true,
              };
            }
            return supplier;
          }),
          suppliersByCall: state.data.suppliersByCall.map((supplierByCall) => {
            if (action.data.indexOf(supplierByCall.idSupplier) >= 0) {
              return {
                ...supplierByCall,
                idState: state.data.masters.State.find(
                  element => element.shortName === 'ENDED_TECHNICAL_TEAM').id,
                whoEvaluateOfTechnicalTeam: state.data.masters.User[0].name,
              };
            }
            return supplierByCall;
          }),
        },
        loading: false,
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
