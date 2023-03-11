import { TableColumns } from 'components'
import { ProductDetail } from 'shared/types/products'

export const convertToRow = (
  availabilities: ProductDetail['availabilities']
) => [
  {
    packingPrices: availabilities.packing_pieces || '-',
    length: availabilities.length || '-',
    width: availabilities.width || '-',
    height: availabilities.height || '-',
    grossWeight: availabilities.gross_weight || '-',
    netWeight: availabilities.net_weight || '-',
  },
]

export const availabilitiesColumns: TableColumns = {
  packingPrices: {
    title: 'Packing Pieces',
    height: 80,
    align: 'center',
  },
  length: {
    title: 'Length',
    height: 80,
    align: 'center',
  },
  width: {
    title: 'Width',
    height: 80,
    align: 'center',
  },
  height: {
    title: 'Height',
    height: 80,
    align: 'center',
  },
  grossWeight: {
    title: 'Gross Weight',
    height: 80,
    align: 'center',
  },
  netWeight: {
    title: 'Net Weight',
    height: 80,
    align: 'center',
  },
}
