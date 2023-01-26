import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import TableProvider, { TableContext } from './store/context'
import { Actions } from './store/reducer'
import { TableStyled } from './styles'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'

function Table({
  columns,
  data,
  showHeader = true,
  isLoading,
  isError,
  hasData,
}) {
  const { dispatch } = useContext(TableContext)

  useEffect(() => {
    dispatch({ type: Actions.SET_DATA, payload: data })
    dispatch({ type: Actions.SET_COLUMNS, payload: columns })
    dispatch({ type: Actions.SET_SORT_COLUMNS })
  }, [data, columns, dispatch])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!!</div>}
      {hasData && (
        <>
          <TableStyled>
            {showHeader && <TableHeader />}
            <TableBody />
          </TableStyled>
          <TableFooter />
        </>
      )}
    </>
  )
}

function ITATable(props) {
  return (
    <TableProvider>
      <Table {...props} />
    </TableProvider>
  )
}

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columns: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  showHeader: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasData: PropTypes.bool,
}

export default ITATable
