import { NextRouter } from 'next/router'

type NumberQuery = number | -1

/**
 * Returns the query value from URL param,
 * and tries to parse an int, or return -1
 */
const getNumberQuery = (router: NextRouter, queryName: string): NumberQuery => {
  const parsed = parseInt(String(router.query[queryName]), 10)
  return isNaN(parsed) ? -1 : parsed
}

type NumberQueryGetter = (router: NextRouter) => NumberQuery

export const getRoute: NumberQueryGetter = router => getNumberQuery(router, 'route')
export const getZone: NumberQueryGetter = router => getNumberQuery(router, 'zone')
