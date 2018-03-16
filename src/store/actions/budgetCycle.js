import * as actions from './actionTypes';
import axios from '../../axios-instance';

export const fetchBudgetCycles = () => {
  return dispatch => {
    dispatch(fetchBudgetCyclesStart());
    axios.get('/budgetCycles.json')
      .then(response => {        
        const fetchedBudgetCycles = [];
        for (let key in response.data) {
          fetchedBudgetCycles.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchBudgetCyclesSuccess(fetchedBudgetCycles));
      })
      .catch(error => {
        dispatch(fetchBudgetCyclesFail(error.response));
      });
  }
}

export const fetchBudgetCyclesStart = () => {
  return {
    type: actions.FETCH_BUDGET_CYCLES_START
  }
}

export const fetchBudgetCyclesSuccess = (budgetCycles) => {
  return {
    type: actions.FETCH_BUDGET_CYCLES_SUCCESS,
    budgetCycles: budgetCycles
  }
}

export const fetchBudgetCyclesFail = (error) => {
  return {
    type: actions.FETCH_BUDGET_CYCLES_FAIL,
    error: error
  }
}

export const fetchBudgetCycle = (id) => {
  return dispatch => {
    dispatch(fetchBudgetCycleStart());
    axios.get('budgetCycles.json?orderBy="$key"&equalTo="' + id + '"')
      .then(response => {
        let fetchedBudgetCycle = {};
        for (let key in response.data) {
          fetchedBudgetCycle = {
            ...response.data[key],
            id: key
          };
        }
        dispatch(fetchBudgetCycleSuccess(fetchedBudgetCycle));
      })
      .catch(error => {
        dispatch(fetchBudgetCycleFail(error.response));
      });
  }
}

export const fetchBudgetCycleStart = () => {
  return {
    type: actions.FETCH_BUDGET_CYCLE_START
  }
}

export const fetchBudgetCycleSuccess = (budgetCycle) => {
  return {
    type: actions.FETCH_BUDGET_CYCLE_SUCCESS,
    budgetCycle: budgetCycle
  }
}

export const fetchBudgetCycleFail = (error) => {
  return {
    type: actions.FETCH_BUDGET_CYCLE_FAIL,
    error: error
  }
}

export const addBudgetCycle = (budgetCycleData) => {
  return dispatch => {
    axios.post('/budgetCycles.json', budgetCycleData)
      .then(response => {
        dispatch(addBudgetCycleSuccess(response.data.name, budgetCycleData))
      })
      .catch(error => {
        dispatch(addBudgetCycleFail(error.response))
      })
  }
}

export const addBudgetCycleSuccess = (id, budgetCycleData) => {
  return {
    type: actions.ADD_BUDGET_CYCLE_SUCCESS,
    id: id,
    budgetCycleData: budgetCycleData
  }
}

export const addBudgetCycleFail = (error) => {
  return {
    type: actions.ADD_BUDGET_CYCLE_FAIL,
    error: error
  }
}

export const updateBudgetCycle = (budgetCycleData) => {
  return dispatch => {
    const { id, ...data } = budgetCycleData;
    axios.patch('/budgetCycles/' + id + '.json', data)
      .then(response => {
        dispatch(updateBudgetCycleSuccess(budgetCycleData))
      })
      .catch(error => {
        dispatch(updateBudgetCycleFail(error.response))
      })
  }
}

export const updateBudgetCycleSuccess = (budgetCycleData) => {
  return {
    type: actions.UPDATE_BUDGET_CYCLE_SUCCESS,
    budgetCycleData: budgetCycleData
  }
}

export const updateBudgetCycleFail = (error) => {
  return {
    type: actions.UPDATE_BUDGET_CYCLE_FAIL,
    error: error
  }
}
export const deleteBudgetCycle = (id) => {
  return dispatch => {
    axios.delete('/budgetCycles/' + id + '.json')
      .then(response => {
        dispatch(deleteBudgetCycleSuccess(id))
      })
      .catch(error => {
        dispatch(deleteBudgetCycleFail(error.response))
      })
  }
}

export const deleteBudgetCycleSuccess = (id) => {
  return {
    type: actions.DELETE_BUDGET_CYCLE_SUCCESS,
    id: id
  }
}

export const deleteBudgetCycleFail = (error) => {
  return {
    type: actions.DELETE_BUDGET_CYCLE_FAIL,
    error: error
  }
}