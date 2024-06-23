import EmptyInvoices from '@/components/EmptyInvoices';
import InvoiceCard from '@/components/InvoiceCard';

// IMPORTING DATA
import data from '@/data.json';
import CreateInvoice from '@/components/CreateInvoice';
import FilterInvoices from '@/components/FilterInvoices';

export default function Home() {
  const invoices = data;
  return (
    <div className='container'>
      <div className='flex items-center py-8 gap-5'>
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
        <div className='space-y-4 pb-8'>
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
