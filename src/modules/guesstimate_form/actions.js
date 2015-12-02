import {runFormSimulations} from 'gModules/simulations/actions.js'
import {changeGuesstimate} from 'gModules/guesstimates/actions.js'
import engine from 'gEngine/engine'

export function createGuesstimateForm(metricId) {
  return (dispatch, getState) => {
    const guesstimate = getState().guesstimates.find(e => e.metric === metricId)
    dispatch({ type: 'CREATE_GUESSTIMATE_FORM', guesstimate: engine.guesstimate.format(guesstimate) })
  }
}

export function destroyGuesstimateForm() {
  return { type: 'DESTROY_GUESSTIMATE_FORM' };
}

export function updateGuesstimateForm(values) {
  return { type: 'UPDATE_GUESSTIMATE_FORM', values };
}

export function changeGuesstimateForm(values) {
  return (dispatch, getState) => {
    dispatch(updateGuesstimateForm(values));
    dispatch(runFormSimulations(getState().guesstimateForm.metric));
    dispatch(saveGuesstimateForm())
  };
}

export function saveGuesstimateForm() {
  return (dispatch, getState) => {
    const guesstimateForm = getState().guesstimateForm
    dispatch(changeGuesstimate(guesstimateForm.metric, guesstimateForm));
  };
}
