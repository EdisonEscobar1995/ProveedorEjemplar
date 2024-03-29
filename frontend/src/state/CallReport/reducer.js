import {
  GET_DATA_CALL_REPORT_PROGRESS,
  GET_DATA_CALL_REPORT_SUCCESS,
  FILTER_CALL_REPORT,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function callReportApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_CALL_REPORT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_CALL_REPORT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case FILTER_CALL_REPORT: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            const participateInCall = state.data.suppliersByCall
              .find(supplierByCall => supplierByCall.idSupplier === item.id)
              .participateInCall;
            const {
              supply = '',
              companySize = '',
              participated = '',
              supplier = '',
            } = action.data;
            let visible = true;
            if (supplier !== '' && supplier !== item.id) {
              visible = false;
            } else if (supply !== '' && supply !== item.idSupply) {
              visible = false;
            } else if (companySize !== '' && companySize !== item.idCompanySize) {
              visible = false;
            } else if (participated !== '') {
              if ((participated === 'empty' && participateInCall !== '') ||
              (participated !== 'empty' && participated !== participateInCall)) {
                visible = false;
              }
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

export default callReportApp;
