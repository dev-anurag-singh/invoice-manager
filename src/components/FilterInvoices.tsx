'use client';

import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from './ui/checkbox';

function FilterInvoices() {
  const searchParams = useSearchParams();

  function handleFilter(term?: string) {
    const params = new URLSearchParams(searchParams);

    console.log(params);

    // if (term) {
    //   params.set('filter', term);
    // } else {
    //   params.delete('filter');
    // }
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className='flex items-center text-sm group'>
          <span className='md:hidden'>Filter</span>
          <span className='hidden md:inline'>Filter by status</span>
          <span className='ml-2 group-aria-expanded:rotate-180 transition-transform'>
            <ChevronDown className='h-4 w-4 stroke-primary' />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent sideOffset={22} className='max-w-48 p-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center space-x-3'>
            <Checkbox onCheckedChange={v => handleFilter()} id='draft' />
            <label
              htmlFor='draft'
              className='text-sm cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Draft
            </label>
          </div>
          <div className='flex items-center space-x-3'>
            <Checkbox onCheckedChange={v => handleFilter()} id='pending' />
            <label
              htmlFor='pending'
              className='text-sm cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Pending
            </label>
          </div>
          <div className='flex items-center space-x-3'>
            <Checkbox onCheckedChange={v => handleFilter()} id='paid' />
            <label
              htmlFor='paid'
              className='text-sm cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Paid
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default FilterInvoices;
