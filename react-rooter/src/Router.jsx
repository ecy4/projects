import { useState, useEffect, Children } from 'react'
import { EVENTS } from './consts.js'
import { match } from 'path-to-regexp'

const DefaultComponent404 = () => <h1>404</h1>

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = DefaultComponent404 }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}
  let Page = null

 
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type ?? {}
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  for (const route of routesToUse) {
    if (route.path === currentPath) {
      Page = route.Component
      break
    }

    const matcherUrl = match(route.path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (matched) {
      routeParams = matched.params
      Page = route.Component
      break
    }
  }

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
