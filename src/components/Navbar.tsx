import Link from "next/link";
import Logo from "./Logo";
import { ThemeToggler } from "./ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 flex w-screen justify-between border-b bg-carbon-blue/95 shadow-sm backdrop-blur dark:bg-muted/95 lg:fixed lg:h-full lg:w-auto lg:flex-col lg:rounded-r-3xl lg:border-none">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="flex items-center gap-6 pr-10 lg:flex-col lg:pb-6 lg:pr-0">
        <ThemeToggler />
        <div className="w-[1px] self-stretch bg-[#494E6E] lg:h-[1px] lg:w-full" />
        <Link href={"https://github.com/dev-anurag-singh"} target="_blank">
          <Avatar>
            <AvatarImage src="https://github.com/dev-anurag-singh.png" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
