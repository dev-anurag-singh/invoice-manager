'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ChevronLeft, CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import InvoiceForm from './InvoiceForm';

function CreateInvoice() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild disabled={!isMounted}>
        <Button className='pl-[6px] pr-4 py-2'>
          <CirclePlus id='icon-plus' className='h-8 w-8 fill-white mr-2' />
          <span className='mt-[2px] mr-1'>New</span>
          <span className='hidden md:inline-block mt-[2px]'>Invoice</span>
        </Button>
      </SheetTrigger>
      {isMounted && (
        <SheetContent side={'left'} className='w-full'>
          <SheetTrigger className='flex gap-6 items-center mb-7'>
            <span>
              <ChevronLeft className='w-4 h-4 stroke-[3px] stroke-primary' />
            </span>
            <span className='text-sm mt-1'>Go back</span>
          </SheetTrigger>
          <SheetHeader>
            <SheetTitle className='text-lg leading-8 text-left'>
              New Invoice
            </SheetTitle>
          </SheetHeader>
          <div className='mt-6'>
            <InvoiceForm />
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}

export default CreateInvoice;
