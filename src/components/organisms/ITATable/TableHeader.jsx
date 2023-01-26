import React, { useContext } from 'react'
import styled from 'styled-components'
import { TableContext } from './store/context'
import { Actions } from './store/reducer'
import { TableCell } from './styles'

const TableCellSortable = styled(TableCell)`
  .off {
    color: gray;
  }
  .on {
    color: black;
  }
  .sort {
    margin-left: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0px 2px 0px 2px;
    cursor: pointer;
    font-size: small;
  }
`

function TableHeader() {
  const { state, dispatch } = useContext(TableContext)
  const { columns, sorting } = state

  const handleSort = (id) => {
    dispatch({ type: Actions.TOGGLE_SORT_COLUMN, payload: { id } })
  }

  return (
    <thead>
      <tr>
        {columns
          .filter((col) => !col.isHidden)
          .map((col, index) => (
            <TableCellSortable as="th" key={col.id}>
              {col.label}
              {col.sortable && (
                <span
                  className="sort"
                  onClick={() => handleSort(col.id)}
                  aria-hidden="true"
                >
                  <span className={sorting[index]?.sortAsc ? 'on' : 'off'}>
                    &#129045;
                  </span>
                  <span className={sorting[index]?.sortDesc ? 'on' : 'off'}>
                    &#129047;
                  </span>
                </span>
              )}
            </TableCellSortable>
          ))}
      </tr>
    </thead>
  )
}

export default TableHeader
