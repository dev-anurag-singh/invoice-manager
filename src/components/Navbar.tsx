import { Moon } from 'lucide-react';
import Logo from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function Navbar() {
  return (
    <header className='bg-[#373B53] flex justify-between lg:flex-col lg:rounded-r-3xl'>
      <div>
        <Logo />
      </div>
      <div className='pr-6 flex items-center gap-6 lg:flex-col lg:pr-0 lg:pb-6'>
        <Moon className='fill-[#7E88C3] cursor-pointer transition-colors hover:fill-white  stroke-inherit' />
        <div className='w-[1px] bg-[#494E6E] self-stretch lg:w-full lg:h-[1px]' />
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Navbar;
