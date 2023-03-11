import Link from 'next/link'
import { TableRow } from 'components'
import s from './OfferTable.module.scss'
import { Bid } from 'shared/types/bid'
import { Offer } from 'shared/types/offer'
import { getQuantity } from 'shared/helpers/transform'
import { isBid } from 'shared/helpers/guards'

export const convertToRow = (product: Offer | Bid): TableRow => {
  return {
    grade: ( // TODO unsave tab links 4 3
      <Link href={`/polymers/${product.grade_id}/${isBid(product) ? 'bid' : 'offer'}/${product.id}?tab=${isBid(product) ? 4 : 3}`}>
        <a className={s.grade}>{product.mark}</a>
      </Link>
    ),
    offer: !isBid(product) && product.price ? (
      <p className={s.offer}>
        <span>${product.price}</span>
      </p>
    ) : (
      '-'
    ),
    bid: isBid(product) && product.price ? (
      <p className={s.bid}>
        <span>${product.price}</span>
      </p>
    ) : (
      '-'
    ),
    quantity: product?.quantity_min ? (
      <p>
        <span>{getQuantity(product.quantity_min, product.quantity_max)}</span>
      </p>
    ) : (
      '-'
    ),
    time: <p>{product.lead_time ? `${product.lead_time} ${product.lead_time === '1' ? 'week' : 'weeks'}` : '-'}</p>,
  }
}
