import { useReducer } from 'react';

export const CHANGE = 'CHANGE';
export const SET_FIELDS = 'SET_FIELDS';
export const SET_ERRORS = 'SET_ERRORS';

const onChange = (state, payload) => {
  const { id, value } = payload;
  return {
    ...state,
    values: { ...state.values, [id]: value },
    mode: 'Changed',
  };
};

const setFormFields = (payload) => {
  return {
    values: { ...payload.values },
    mode: payload.mode,
    errors: {},
  };
};

function reducer(state, { type, payload }) {
  switch (type) {
    case CHANGE:
      return onChange(state, payload);
    case SET_FIELDS:
      return setFormFields(payload);
    case SET_ERRORS:
      return { ...state, errors: payload };
    default:
      return state;
  }
}

const useFormFields = (initialFormValues) => {
  const [state, dispatch] = useReducer(reducer, {
    values: initialFormValues,
    errors: {},
  });

  return [state, dispatch];
};

export default useFormFields;
