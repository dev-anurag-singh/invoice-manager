import EmptyInvoices from '@/components/EmptyInvoices';
import InvoiceCard from '@/components/InvoiceCard';

// IMPORTING DATA
import data from '@/data.json';
import CreateInvoice from '@/components/CreateInvoice';
import FilterInvoices from '@/components/FilterInvoices';

export default function Home() {
  const invoices = data;
  return (
    <div className='grid grid-cols-1 grid-rows-[auto_1fr] h-full'>
      <div className='bg-background container flex items-center py-8 gap-5 sticky top-[4.5rem] md:top-20 lg:top-0 w-full z-10'>
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
        <div className='container space-y-4 pb-8'>
          {invoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
}
