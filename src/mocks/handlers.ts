import { http, HttpResponse } from 'msw'

import { RYCK_AND_MORTY_URL, RESPONSE_API } from './data'

export const handlers = [
  http.get(RYCK_AND_MORTY_URL, () => {
    return HttpResponse.json(RESPONSE_API)
  })
]
