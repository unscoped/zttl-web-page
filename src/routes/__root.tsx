import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { NotFound } from '../components/NotFound'
import { ThemeProvider } from '../theme'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <HeadContent />
      <div className="container">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
  notFoundComponent: NotFound,
})
