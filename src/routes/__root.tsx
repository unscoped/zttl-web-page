import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../theme'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="container">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
})
