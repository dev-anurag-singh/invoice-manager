import Logo from './Logo';
import { ThemeToggler } from './ThemeToggler';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function Navbar() {
  return (
    <header className='flex bg-carbon-blue dark:bg-muted justify-between lg:flex-col lg:rounded-r-3xl'>
      <div>
        <Logo />
      </div>
      <div className='pr-6 flex items-center gap-6 lg:flex-col lg:pr-0 lg:pb-6'>
        <ThemeToggler />
        <div className='w-[1px] bg-[#494E6E] self-stretch lg:w-full lg:h-[1px]' />
        <Avatar>
          <AvatarImage src='https://github.com/dev-anurag-singh.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Navbar;
