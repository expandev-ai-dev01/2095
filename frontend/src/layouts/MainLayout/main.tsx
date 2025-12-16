import { ErrorBoundary } from '@/router/error-boundary';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Logo } from '@/core/components/logo';
import { cn } from '@/core/lib/utils';

function MainLayout() {
  const { location } = useNavigation();

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased">
        {/* Fixed Header with Logo */}
        <header
          className={cn(
            'bg-background/95 backdrop-blur-sm',
            'sticky top-0 z-50',
            'border-b shadow-sm',
            'transition-all duration-300'
          )}
        >
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            <Logo />
          </div>
        </header>

        <main className="flex h-full min-h-fit flex-1">
          <div className="max-w-dvw container mx-auto flex-1 px-4 py-0 md:px-6">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>

        <footer className="border-t px-4 py-6 md:px-6">
          <div className="container mx-auto flex flex-col items-center justify-center gap-2 text-center">
            <Logo simplified />
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Chocolatudo. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export { MainLayout };
