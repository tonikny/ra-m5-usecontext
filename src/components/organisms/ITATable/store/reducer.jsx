import { createNextState } from '@reduxjs/toolkit'

export const initialState = {
  data: [],
  columns: [],
  state: 'initial',
  rowsPerPage: 10,
  page: 1,
}

export const Actions = {
  SET_DATA: 'SET_DATA',
  SET_COLUMNS: 'SET_COLUMNS',
  SET_ROWS_PER_PAGE: 'SET_ROWS_PER_PAGE',
  SET_PAGE: 'SET_PAGE',
}

// eslint-disable-next-line default-param-last
export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATA:
      return createNextState(state, (draft) => {
        draft.data = action.payload
      })

    case Actions.SET_COLUMNS:
      return createNextState(state, (draft) => {
        draft.columns = action.payload
      })

    case Actions.SET_ROWS_PER_PAGE:
      return createNextState(state, (draft) => {
        draft.rowsPerPage = action.payload
      })

    case Actions.SET_PAGE:
      return createNextState(state, (draft) => {
        draft.page = action.payload
      })

    default:
      return state
  }
}
