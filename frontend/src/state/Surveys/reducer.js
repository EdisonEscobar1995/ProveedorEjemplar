import {
  GET_DATA_SURVEYS_PROGRESS,
  GET_DATA_SURVEYS_SUCCESS,
  FILTER_SURVEYS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function surveysApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SURVEYS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_SURVEYS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case FILTER_SURVEYS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            const idState = state.data.suppliersByCall
              .find(supplierByCall => supplierByCall.idSupplier === item.id)
              .idState;
            const {
              supply = '',
              category = '',
              companySize = '',
              surveyState = '',
              supplier = '',
              country = '',
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
            } else if (companySize !== '' && companySize !== item.idCompanySize) {
              visible = false;
            } else if (surveyState !== '' && surveyState !== idState) {
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

export default surveysApp;
