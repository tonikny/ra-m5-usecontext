import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Body } from '../components/layout'
import { ITATable } from '../components/organisms'
import { Container, FlexBox } from '../styles'
import { getAllHouses } from '../store/houses.slice'
import styled from 'styled-components'
import { Button } from '../components/atoms'
import tableType from '../components/organisms/ITATable/constants'
import exportCSVFile from '../components/organisms/ITATable/helpers/exportToCSV'

const ButtonBar = styled(FlexBox)`
  margin-right: 10px;
  margin-bottom: 10px;
`

function Data() {
  const [mode, setMode] = useState(tableType.LIST_ALL)
  const { reqStatus, houses } = useSelector((state) => state.houses)
  const { isError, isSuccess, isLoading, hasData } = reqStatus
  const { byId, allIds } = houses
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllHouses())
  }, [dispatch])

  const columns = [
    {
      id: 'title',
      label: 'Nombre',
    },
    {
      id: 'type',
      label: 'Tipo',
    },
    {
      id: 'price',
      label: 'Precio',
    },
    {
      id: 'district',
      label: 'Barrio',
    },
    {
      id: 'city',
      label: 'Ciudad',
    },
  ]
  const data = allIds.map((id) => ({ ...byId[id], id }))

  const columnsByDistrict = [
    {
      id: 'district',
      label: 'Barrio',
    },
    {
      id: 'houseNum',
      label: 'N. de viviendas',
    },
    {
      id: 'meanPrice',
      label: 'Precio medio',
    },
  ]
  let GroupedData = []
  data.forEach((house) => {
    const index = GroupedData.findIndex(
      (item) => item.district === house.district,
    )
    if (!(index < 0)) {
      GroupedData[index].count += 1
      GroupedData[index].sum += house.price
    } else {
      GroupedData.push({ district: house.district, count: 1, sum: house.price })
    }
  })
  const dataByDistrict = GroupedData.map((obj) => ({
    id: obj.district,
    district: obj.district,
    houseNum: obj.count,
    meanPrice: obj.sum / obj.count,
  }))

  const handleDownload = () => {
    if (mode === tableType.LIST_ALL) {
      exportCSVFile(columns, data, tableType.LIST_ALL, 'tablaViviendas')
    } else if (mode === tableType.BY_DISTRICT) {
      exportCSVFile(
        columnsByDistrict,
        dataByDistrict,
        tableType.BY_DISTRICT,
        'tablaPorBarrios',
      )
    }
  }

  return (
    <Body>
      <Container style={{ marginTop: '2rem' }}>
        <ButtonBar direction="row" justify="flex-end">
          <Button
            onClick={() => setMode(tableType.LIST_ALL)}
            disabled={mode === tableType.LIST_ALL}
          >
            Viviendas
          </Button>
          &nbsp;
          <Button
            onClick={() => setMode(tableType.BY_DISTRICT)}
            disabled={mode === tableType.BY_DISTRICT}
          >
            Por barrio
          </Button>
          &nbsp;
          <Button onClick={handleDownload}>Descargar</Button>
        </ButtonBar>
        {mode === tableType.LIST_ALL && (
          <ITATable
            columns={columns}
            data={data}
            isLoading={isLoading}
            isError={isError}
            hasData={hasData}
          />
        )}
        {mode === tableType.BY_DISTRICT && (
          <ITATable
            columns={columnsByDistrict}
            data={dataByDistrict}
            isLoading={isLoading}
            isError={isError}
            hasData={hasData}
          />
        )}
      </Container>
    </Body>
  )
}

export default Data
