import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Button, Title } from 'components'
import { useAppSelector } from 'shared/hooks'
import { postRequestProduct } from 'shared/api/routes/products'
// import { RequestProductPrePost } from 'shared/types/requestProduct'
import { formToPost } from 'features/RequestProductForm/utils'

import arrow from '/public/assets/img/arrow-right.svg'

import s from './ThankModal.module.scss'

interface ThankModalProps {
  onClose?: () => void
}

export const ThankModal: FC<ThankModalProps> = ({ onClose }) => {
  // call API request and take data from slice in thank-you is not the best options.
  // temporarily commented it until contact modal is ready
  // use onSubsribe props instead..

  // const formData = useAppSelector(state => state.requestForm.form)

  // const handleSubscribe = async () => {
  //   const postData: RequestProductPrePost = {
  //     ...formData,
  //     incoterms: formData.incoterms.length ? formData.incoterms.join(', ') : '',
  //     terms_of_payment: formData.terms_of_payment.length
  //       ? formData.terms_of_payment.join(', ')
  //       : '',
  //     delivery_period: Array.isArray(formData.delivery_period)
  //       ? formData.delivery_period.join(' - ')
  //       : formData.delivery_period,
  //   }

  //   const response = await postRequestProduct(formToPost(postData))
  //   onClose?.()
  // }

  return (
    <div className={s.wrapper}>
      <div className={s.heading}>
        <Title className={s.title} As='h2'>
          Thank you!
        </Title>
        <Image width='80px' height='80px' src={arrow.src} alt='arrow' />
      </div>

      <p className={s.subtitle}>Your request has been sent successfully</p>

      {/* <Button className={s.button} onClick={handleSubscribe}>
        Subscribe to updates
      </Button> */}

      <p className={s.content}>
        <Link href={'#'}>
          <a className={s.link}> Current market</a>
        </Link>
        : Spot trade, prices, 2Q trade patterns and negotiations
        <Link href={'#'}>
          <a className={s.link}> Market outlook</a>
        </Link>
        : Changing trade flows, new capacity impacting the short and medium-term
        balance, polymers demand impact, pricing outlook
      </p>
    </div>
  )
}
