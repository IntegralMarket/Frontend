// @ts-nocheck
import { AxiosPromise } from 'axios'
import {
  RequestAskDocument,
  RequestAskForQuoteForm,
  RequestBuyForm,
  RequestQuoteProduct,
  RequestQuoteProductPostResponse,
  RequestSampleModalForm,
  RequestSampleModalFormPostResponse,
  RequestSendOfferModalForm,
} from 'shared/types/requestProduct'
//import { RequestProduct } from './../../types/requestProduct'
import { api, endpoints } from '..'

export const postRequestDocumentCreate = (
  data: RequestAskDocument
): AxiosPromise<RequestQuoteProductPostResponse> => {
  return api.post(endpoints.polymers.forms.ask_document, data)
}

export const postRequestQuote = (data: RequestAskForQuoteForm) => {
  return api.post(endpoints.polymers.forms.ask_quote, data)
}

export const postRequestSample = (
  data: RequestSampleModalForm
): AxiosPromise<RequestSampleModalFormPostResponse> => {
  return api.post(endpoints.polymers.forms.ask_sample, data)
}

export const postRequestBuy = (data: RequestBuyForm) => {
  return api.post(endpoints.polymers.forms.buy, data)
}

export const postRequestSendOffer = (data: RequestSendOfferModalForm) => {
  return api.post(endpoints.polymers.forms.send_offer, data)
}

export const postRequestSpQuote = (
  data: RequestQuoteProduct
): AxiosPromise<RequestQuoteProductPostResponse> => {
  return api.post(endpoints.polymers.forms.ask_quote_sp, data)
}
