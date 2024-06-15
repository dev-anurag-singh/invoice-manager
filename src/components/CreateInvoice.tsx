'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ChevronLeft, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import InvoiceForm from './InvoiceForm';

function CreateInvoice() {
  const [isOpen, setIsOpen] = useState(false);

  // FUNCTION TO CLOSE SHEET
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className='pl-[6px] pr-4 py-2'>
          <CirclePlus id='icon-plus' className='h-8 w-8 fill-white mr-2' />
          <span className='mt-[2px] mr-1'>New</span>
          <span className='hidden md:inline-block mt-[2px]'>Invoice</span>
        </Button>
      </SheetTrigger>

      <SheetContent side={'left'} className='px-0 pt-8 pb-0 md:pt-14'>
        <div className='h-full flex flex-col'>
          <SheetTrigger className='flex gap-6 items-center mb-7 md:hidden pl-6 md:pl-14'>
            <span>
              <ChevronLeft className='w-4 h-4 stroke-[3px] stroke-primary' />
            </span>
            <span className='text-sm mt-1 text-foreground'>Go back</span>
          </SheetTrigger>
          <SheetHeader className='pb-6 pl-6 md:pl-14 md:pb-11'>
            <SheetTitle className='text-lg leading-8 text-left'>
              New Invoice
            </SheetTitle>
          </SheetHeader>
          <InvoiceForm onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateInvoice;
