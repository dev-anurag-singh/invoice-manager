'use client';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant='ghost'
            className='hover:bg-transparent'
          >
            <Moon className='hidden dark:inline-block fill-foreground-light cursor-pointer transition-colors hover:fill-white/70 stroke-inherit' />
            <Sun className='dark:hidden transition-colors hover:stroke-white/70 stroke-foreground-light' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-sm'>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
