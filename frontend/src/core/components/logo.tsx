import * as React from 'react';
import { cn } from '@/core/lib/utils';
import { useAppStore } from '@/core/stores/app';

interface LogoProps {
  className?: string;
  simplified?: boolean;
  onClick?: () => void;
}

function Logo({ className, simplified = false, onClick }: LogoProps) {
  const { theme } = useAppStore();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 320);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const logoSrc = React.useMemo(() => {
    if (isMobile || simplified) {
      return '/img/logo/chocolatudo-icon.svg';
    }
    return theme === 'dark'
      ? '/img/logo/chocolatudo-logo-dark.svg'
      : '/img/logo/chocolatudo-logo.svg';
  }, [theme, isMobile, simplified]);

  const logoAlt = 'Logomarca Chocolatudo - Bolos de chocolate artesanais';

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-3 outline-none transition-all duration-300',
        'focus-visible:ring-ring hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2',
        'rounded-md',
        className
      )}
      aria-label="Voltar ao topo da página"
      type="button"
    >
      <img
        src={logoSrc}
        alt={logoAlt}
        className={cn(
          'h-auto transition-all duration-300',
          isMobile || simplified ? 'w-[40px]' : 'w-[90px] sm:w-[120px] md:w-[180px]'
        )}
        style={{
          animation: 'fadeInDown 500ms ease-out',
        }}
      />
      {!isMobile && !simplified && (
        <span
          className={cn(
            'font-semibold transition-all duration-300',
            'text-[18px] sm:text-[20px] md:text-[24px]',
            'hidden sm:inline'
          )}
          style={{
            animation: 'fadeInDown 500ms ease-out 100ms backwards',
          }}
        >
          Chocolatudo
        </span>
      )}
    </button>
  );
}

export { Logo };
export type { LogoProps };
