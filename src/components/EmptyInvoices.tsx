import Image from 'next/image';

function EmptyInvoices() {
  return (
    <div className='grid place-items-center'>
      <div className='flex flex-col items-center gap-11 md:gap-16'>
        <Image
          src={'/empty.svg'}
          alt='no invoices'
          width={194}
          height={160}
          className='md:w-60'
        />
        <div className='space-y-6'>
          <h3 className='text-lg'>There is nothing here</h3>
          <div className='text-xs text-foreground-light text-center'>
            <p>Create an invoice by clicking the</p>
            <p>
              <span className='font-bold mr-0.5'>New</span>
              <span className='hidden md:inline-block font-bold mr-0.5'>
                Invoice
              </span>
              button and get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyInvoices;
