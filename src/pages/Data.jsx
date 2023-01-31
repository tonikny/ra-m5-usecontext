import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Body } from '../components/layout'
import { ITATable } from '../components/organisms'
import { Container, FlexBox } from '../styles'
import { getAllHouses } from '../store/houses.slice'
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
  const { isError, isLoading, hasData } = reqStatus
  const { byId, allIds } = houses
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllHouses())
  }, [dispatch])

  const columns = useMemo(
    () => [
      {
        id: 'title',
        label: 'Nombre',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'type',
        label: 'Tipo',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'price',
        label: 'Precio',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'district',
        label: 'Barrio',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'city',
        label: 'Ciudad',
        isHidden: false,
        sortable: true,
      },
    ],
    [],
  )
  const data = useMemo(
    () => allIds.map((id) => ({ ...byId[id], id })),
    [allIds, byId],
  )

  const columnsByDistrict = useMemo(
    () => [
      {
        id: 'district',
        label: 'Barrio',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'houseNum',
        label: 'N. de viviendas',
        isHidden: false,
        sortable: true,
      },
      {
        id: 'meanPrice',
        label: 'Precio medio',
        isHidden: false,
        sortable: true,
      },
    ],
    [],
  )
  const dataByDistrict = useMemo(() => {
    const GroupedData = []
    data.forEach((house) => {
      const index = GroupedData.findIndex(
        (item) => item.district === house.district,
      )
      if (!(index < 0)) {
        GroupedData[index].count += 1
        GroupedData[index].sum += house.price
      } else {
        GroupedData.push({
          district: house.district,
          count: 1,
          sum: house.price,
        })
      }
    })
    return GroupedData.map((obj) => ({
      id: obj.district,
      district: obj.district,
      houseNum: obj.count,
      meanPrice: obj.sum / obj.count,
    }))
  }, [data])

  const handleDownload = useCallback(() => {
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
  }, [columns, columnsByDistrict, data, dataByDistrict, mode])

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
