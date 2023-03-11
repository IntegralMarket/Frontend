import { formatDate } from 'shared/helpers/parseDate'
import {
  Incoterms,
  PaymentTypes,
  RequestAskForQuoteForm,
  RequestBuyForm,
} from 'shared/types/requestProduct'
import { DAY_IN_MS } from '.'

export const REQUEST_FORM_DEFAULT: RequestAskForQuoteForm | RequestBuyForm = {
  place_of_delivery: '',
  quantity: '',
  incoterms: [Incoterms.CFR],
  terms_of_payment: [PaymentTypes.onlinePayment],
  lead_time: [
    formatDate(new Date()),
    formatDate(new Date(Date.now() + 8 * 7 * DAY_IN_MS)),
  ].toString(),
  additional_info: '',
  preferred_grades: [],
  main_types: [
    {
      product_type: '',
      processing_method: '',
      mfr_value_input: [null, null],
    },
  ],
  document: undefined,
  packing: undefined,
}
