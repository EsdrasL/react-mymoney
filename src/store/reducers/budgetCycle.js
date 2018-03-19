import * as actions from '../actions/actionTypes';

const initialState = {
  budgetCycles: [],
  loading: false,
  error: null
};

const fetchBudgetCyclesStart = (state, action) => {
  return { ...state, loading: true };
}

const fetchBudgetCyclesSuccess = (state, action) => {
  return { ...state, budgetCycles: action.budgetCycles, loading: false };
}

const fetchBudgetCyclesFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}

const addBudgetCycleSuccess = (state, action) => {
  const newBudgetCycle = { ...action.budgetCycleData, id: action.id };
  return {
    ...state,
    budgetCycles: state.budgetCycles.concat(newBudgetCycle),
    loading: false
  };
}

const addBudgetCycleFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}

const updateBudgetCycleSuccess = (state, action) => {
  const newBudgetCycles = state.budgetCycles.map(
    (budgetCycle) => {
      if (budgetCycle.id === action.budgetCycleData.id) {
        return action.budgetCycleData;
      }
      return budgetCycle;
    });

  return {
    ...state,
    budgetCycles: newBudgetCycles,
    loading: false
  };
}

const updateBudgetCycleFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}

const deleteBudgetCycleStart = (state, action) => {
  return { ...state, loading: true };
}

const deleteBudgetCycleSuccess = (state, action) => {
  const newBudgetCycles = state.budgetCycles.filter(
    (budgetCycle) => budgetCycle.id !== action.id)

  return {
    ...state,
    budgetCycles: newBudgetCycles,
    loading: false
  };
}

const deleteBudgetCycleFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_BUDGET_CYCLES_START: return fetchBudgetCyclesStart(state, action);
    case actions.FETCH_BUDGET_CYCLES_SUCCESS: return fetchBudgetCyclesSuccess(state, action);
    case actions.FETCH_BUDGET_CYCLES_FAIL: return fetchBudgetCyclesFail(state, action);
    
    case actions.ADD_BUDGET_CYCLE_SUCCESS: return addBudgetCycleSuccess(state, action);
    case actions.ADD_BUDGET_CYCLE_FAIL: return addBudgetCycleFail(state, action);
    
    case actions.UPDATE_BUDGET_CYCLE_SUCCESS: return updateBudgetCycleSuccess(state, action);
    case actions.UPDATE_BUDGET_CYCLE_FAIL: return updateBudgetCycleFail(state, action);

    case actions.DELETE_BUDGET_CYCLE_START: return deleteBudgetCycleStart(state, action);
    case actions.DELETE_BUDGET_CYCLE_SUCCESS: return deleteBudgetCycleSuccess(state, action);
    case actions.DELETE_BUDGET_CYCLE_FAIL: return deleteBudgetCycleFail(state, action);
    default: return state;
  }
}

export default reducer;