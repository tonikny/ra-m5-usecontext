import React, { useContext } from 'react'
import styled from 'styled-components'
import { FlexBox } from '../../../styles'
import { SelectGroup } from '../../molecules/SelectGroup'
import { TableContext } from './store/context'
import { Actions } from './store/reducer'

const ShowRowsStyled = styled(FlexBox)``

function ShowRows() {
  const { dispatch } = useContext(TableContext)
  const rowsNumbers = [10, 25, 50]

  const handleRowsNumber = (e) =>
    dispatch({
      type: Actions.SET_ROWS_PER_PAGE,
      payload: e.target.value,
    })

  return (
    <ShowRowsStyled justify="flex-end" direction="row">
      <SelectGroup
        id="show-rows"
        label="Mostrar"
        defaultValue="{rowsPerPage}"
        options={rowsNumbers.map((num) => ({
          value: `${num}`,
          text: `${num}`,
        }))}
        onChange={handleRowsNumber}
      />
    </ShowRowsStyled>
  )
}

export default styled(ShowRows)``
