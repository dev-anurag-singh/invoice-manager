import { Button } from '@/components/ui/button';
import { ChevronDown, CirclePlus } from 'lucide-react';

export default function Home() {
  return (
    <div className='container py-8'>
      <div className='flex items-center gap-5'>
        <div className='mr-auto flex flex-col'>
          <h2 className='text-md'>Invoices</h2>
          <span className='text-foreground-light text-xs'>7 invoices</span>
        </div>
        {/* TODO: ADDING A POPOVER */}
        <div className='flex items-center gap-3'>
          <span className='text-sm leading-4'>Filter</span>
          <span>
            <ChevronDown className='h-4 w-4 stroke-primary' />
          </span>
        </div>
        {/* TODO: ADDING ADD NEW INVOICE MODAL */}
        <div>
          <Button className='pl-[6px] pr-4'>
            <CirclePlus id='icon-plus' className='h-8 w-8 fill-white mr-2' />
            <span className='mt-[2px]'>New</span>
          </Button>
        </div>
      </div>
      <div className='mt-4'>HomePage</div>
    </div>
  );
}
