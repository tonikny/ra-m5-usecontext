import { createNextState } from '@reduxjs/toolkit'

export const initialState = {
  data: [],
  columns: [],
  state: 'initial',
  rowsPerPage: 10,
  page: 1,
  sorting: [],
}

export const Actions = {
  SET_DATA: 'SET_DATA',
  SET_COLUMNS: 'SET_COLUMNS',
  SET_ROWS_PER_PAGE: 'SET_ROWS_PER_PAGE',
  SET_PAGE: 'SET_PAGE',
  SET_SORT_COLUMNS: 'SET_SORT_COLUMNS',
  TOGGLE_SORT_COLUMN: 'TOGGLE_SORT_COLUMN',
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

    case Actions.SET_SORT_COLUMNS:
      return createNextState(state, (draft) => {
        draft.sorting = state.columns.map((column) => ({
          id: column.id,
          sortAsc: false,
          sortDesc: false,
        }))
      })

    case Actions.TOGGLE_SORT_COLUMN:
      return createNextState(state, (draft) => {
        const { id } = action.payload
        const index = state.sorting.findIndex((column) => column.id === id)

        if (draft.sorting[index].sortAsc === false) {
          draft.sorting.forEach((column, i) => {
            draft.sorting[i].sortAsc = false
            draft.sorting[i].sortDesc = false
          })
          draft.sorting[index].sortAsc = true
          draft.sorting[index].sortDesc = false
          draft.data.sort((a, b) => (a[id] > b[id] ? 1 : -1))
        } else if (draft.sorting[index].sortAsc === true) {
          draft.sorting.forEach((column, i) => {
            draft.sorting[i].sortAsc = false
            draft.sorting[i].sortDesc = false
          })
          draft.sorting[index].sortAsc = false
          draft.sorting[index].sortDesc = true
          draft.data.sort((a, b) => (a[id] < b[id] ? 1 : -1))
        }
      })

    default:
      return state
  }
}
