import EmptyInvoices from '@/components/EmptyInvoices';
import InvoiceCard from '@/components/InvoiceCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';

// IMPORTING DATA
import data from '@/data.json';
import CreateInvoice from '@/components/CreateInvoice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import FilterInvoices from '@/components/FilterInvoices';

export default function Home() {
  const invoices = data;
  return (
    <div className='container md:px-12 gap-8 py-8 h-full grid grid-cols-1 grid-rows-[auto_1fr]'>
      <div className='flex items-center gap-5'>
        <div className='mr-auto flex flex-col'>
          <h2 className='text-lg md:text-xl'>Invoices</h2>
          <span className='text-foreground-light text-xs'>
            {invoices.length} invoices
          </span>
        </div>
        <FilterInvoices />
        <CreateInvoice />
      </div>
      {invoices.length ? (
        <ScrollArea className='h-full'>
          <div className='space-y-4 md:px-3'>
            {invoices.map(invoice => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
}
