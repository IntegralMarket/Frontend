export const endpoints = {
  producers: {
    list: '/generic/producers/',
    data: (id: number) => `/generic/producers/${id}/`,
    commodities: (id: number) => `/generic/producers/${id}/catalog/`,
  },
  providers: {
    list: '/generic/providers/',
    data: (id: number) => `/generic/providers/${id}/`,
  },
  traders: {
    list: '/generic/traders/',
    profile: (id: number) => `/generic/traders/${id}/`,
    commodities: (id: number) => `/generic/traders/${id}/commodities/`,
  },
  sellers: {
    // former "traders" entity
    list: '/generic/sellers/',
    profile: (id: number) => `/generic/sellers/${id}/`,
    offers: (id: number) => `/generic/sellers/${id}/offers/`, // former "commodities" entity
    bids: (id: number) => `/generic/sellers/${id}/bids/`,
    catalog: (id: number) => `/generic/sellers/${id}/catalog/`,
  },
  buyers: {
    list: '/generic/buyers/',
    profile: (id: number) => `/generic/buyers/${id}/`,
    bids: (id: number) => `/generic/buyers/${id}/bids/`,
  },
  polymers: {
    offers: '/polymers/offers/',
    bids: '/polymers/bids/',
    grade: (id: number) => `/polymers/grades/${id}/`,
    grade_offers: (id: number) => `/polymers/grades/${id}/offers/`,
    grade_bids: (id: number) => `/polymers/grades/${id}/bids/`,
    offer: (id: number) => `/polymers/offers/${id}/`,
    bid: (id: number) => `/polymers/bids/${id}/`,
    request: '/polymers/products/requests/', // THIS endpoint is no more exist
    filters: {
      applications: '/polymers/data/applications/',
      incoterms: '/polymers/data/incoterms/',
      packing: '/polymers/data/packings/',
      processing_methods: '/polymers/data/processing_methods/',
      product_types: '/polymers/data/product_types/',
      terms_of_payments: '/polymers/data/terms_of_payments/',
    },
    forms: {
      ask_document: '/polymers/query/ask-for-document/',
      ask_quote: 'polymers/query/ask-for-quote/',
      ask_sample: 'polymers/query/ask-for-sample/',
      buy: 'polymers/query/buy/',
      send_offer: 'polymers/query/send-offer/',
      ask_quote_sp: 'polymers/query/sp-ask-for-quote/',
    },
  },
  filters: {
    origins: '/generic/origins/',
    buyer_types: '/generic/occupations/',
  },
}
