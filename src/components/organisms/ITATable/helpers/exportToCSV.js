import tableType from '../constants'

function convertToCSV(data) {
  const dataObj = JSON.parse(data)
  let str = ''
  dataObj.forEach((item) => {
    let line = ''
    Object.values(item).forEach((value) => {
      if (line !== '') line += ','
      line += value
    })
    str += `${line}\r\n`
  })
  return str
}

const prepareListAll = (headers, items) => {
  const columns = {}
  headers.forEach((header) => {
    columns[header.id] = header.label
  })

  const data = items.map((item) => ({
    title: item.title,
    type: item.type,
    price: item.price,
    district: item.district,
    city: item.city,
  }))
  data.unshift(columns)
  return data
}

const prepareByDistrict = (headers, items) => {
  const columns = {}
  headers.forEach((header) => {
    columns[header.id] = header.label
  })
  const data = items.map((item) => ({
    district: item.district,
    houseNum: item.houseNum,
    meanPrice: item.meanPrice,
  }))
  data.unshift(columns)
  return data
}

export default function exportCSVFile(headers, items, type, fileTitle) {
  let data
  if (type === tableType.LIST_ALL) data = prepareListAll(headers, items)
  else if (type === tableType.BY_DISTRICT)
    data = prepareByDistrict(headers, items)

  const jsonObject = JSON.stringify(data)
  const csv = convertToCSV(jsonObject)

  const exportedFilename = `${fileTitle}.csv` || 'tabla.csv'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', exportedFilename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
