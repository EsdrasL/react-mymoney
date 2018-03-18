import * as actions from './actionTypes';
import axios from '../../axios-instance';

export const fetchBudgetCycles = (token, userId) => {
  return dispatch => {
    dispatch(fetchBudgetCyclesStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/budgetCycles.json' + queryParams)
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

export const addBudgetCycle = (budgetCycleData, token) => {
  return dispatch => {
    axios.post('/budgetCycles.json?auth=' + token, budgetCycleData)
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

export const updateBudgetCycle = (budgetCycleData, token) => {
  return dispatch => {
    const { id, ...data } = budgetCycleData;
    axios.patch('/budgetCycles/' + id + '.json?auth=' + token, data)
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
export const deleteBudgetCycle = (id, token) => {
  return dispatch => {
    axios.delete('/budgetCycles/' + id + '.json?auth=' + token)
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