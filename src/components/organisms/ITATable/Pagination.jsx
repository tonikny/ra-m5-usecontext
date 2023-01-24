import React, { useContext } from 'react'
import styled from 'styled-components'
import { FlexBox } from '../../../styles'
import { TableContext } from './store/context'
import { Actions } from './store/reducer'

const PaginationStyled = styled(FlexBox)``

function Pagination() {
  const { dispatch } = useContext(TableContext)
  const { state } = useContext(TableContext)
  const { data, rowsPerPage, page } = state
  const pageNumber = Math.ceil(data.length / rowsPerPage)
  const isFirstPage = page === 1
  const isLastPage = page * rowsPerPage >= data.length

  const handlePrevious = () => {
    dispatch({
      type: Actions.SET_PAGE,
      payload: page - 1,
    })
  }

  const handleNext = () => {
    dispatch({
      type: Actions.SET_PAGE,
      payload: page + 1,
    })
  }

  return (
    <PaginationStyled direction="row" align="center">
      <button type="button" onClick={handlePrevious} disabled={isFirstPage}>
        {'<'}
      </button>
      &nbsp; Página {page} de {pageNumber}
      &nbsp;
      <button type="button" onClick={handleNext} disabled={isLastPage}>
        {'>'}
      </button>
    </PaginationStyled>
  )
}

export default styled(Pagination)``
