import { useEffect } from 'react'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { NotFound } from '../components/NotFound'
import { ThemeProvider } from '../theme'

function Root() {
  // The prerendered HTML ships its own head tags (scripts/prerender-shells.mjs); once the router's
  // <HeadContent /> has rendered the same tags, drop the static copies so nothing is duplicated.
  useEffect(() => {
    document.head.querySelectorAll('[data-prerender]').forEach((el) => el.remove())
  }, [])

  return (
    <ThemeProvider>
      <HeadContent />
      <div className="container">
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound,
})
