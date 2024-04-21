import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

function InvoiceStatus({ status }: { status: string }) {
  return (
    <div
      className={cn(
        'pt-[14px] pb-[11px] w-[6.5rem] bg-carbon-blue/5 text-carbon-blue  rounded-md flex items-center justify-center',
        {
          'bg-green/5 text-green': status === 'paid',
          'bg-orange/5 text-orange': status === 'pending',
          'bg-carbon-blue/5 text-carbon-blue dark:bg-grey/5 dark:text-[#DFE3FA]':
            status === 'draft',
        }
      )}
    >
      <Dot className='stroke-[8px]' />
      <p className='text-sm pt-[3px] pr-[6px] capitalize'>{status}</p>
    </div>
  );
}

export default InvoiceStatus;
