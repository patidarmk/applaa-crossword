import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index.tsx";
import PuzzlePage from './pages/PuzzlePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import NotFound from './pages/NotFound.tsx';

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  ),
  notFoundComponent: NotFound,
})

// Create index route
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

// Create puzzle route
const puzzleRoute = createTanStackRoute({
    getParentRoute: () => rootRoute,
    path: '/puzzle',
    component: PuzzlePage,
})

// Create about route
const aboutRoute = createTanStackRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: AboutPage,
})

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, puzzleRoute, aboutRoute])

// Create router with proper TypeScript configuration
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;