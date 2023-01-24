import React from 'react'
import styled from 'styled-components'
import { FlexBox } from '../../../styles'
import Pagination from './Pagination'
import ShowRows from './ShowRows'

const TableFooterStyled = styled(FlexBox)`
  padding-top: 10px;
  padding-bottom: 10px;
`

function TableFooter() {
  return (
    <TableFooterStyled direction="row" justify="space-between">
      <Pagination />
      <ShowRows />
    </TableFooterStyled>
  )
}

export default styled(TableFooter)``
