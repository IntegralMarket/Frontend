import { FC } from 'react'
import s from './ProductionPanel.module.scss'

const productionData = [
  {
    key: 'Final products produced from the commodity',
    value: 'you list products produced',
  },
  {
    key: "Production equipment used",
    value: ""
  },
  {
    key: "Commodities required",
    commoditiesRequire: [
      { key: "Type", value: "HDPE" },
      { key: "Processing method", value: "Blow Molding" },
      { key: "MFR", value: 5 },
      { key: " Grades preferred", value: " BY-250" }
    ]
  },
  {
    key: 'Expected annual requirement',
    value: 50000,
  },
  {
    key: 'Frequency of purchase',
    value: 'quarterly',
  },
  {

    key: 'Purchase process',
    value: '',
  },
  {
    key: 'Current tenders',
    value: 0,
  },
]

export const ProductionPanel: FC = () => {
  return (
    <div className={s.panelContainer}>
      <div className={s.panelContent}>
        <ul className={s.table}>
          {productionData.map((product) =>

            <li key={product.key} className={s.row}>
              {product.key}: {product.value}
              {product.commoditiesRequire?.map((commodity) =>
                <div key={commodity.value} className={s.commodities}>
                  {commodity.key}: {commodity.value}
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

