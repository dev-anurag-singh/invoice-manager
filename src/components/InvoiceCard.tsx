import { ChevronRight, Dot } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import moment from 'moment';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface InvoiceCardProps {
  invoice: {
    id: string;
    paymentDue: string;
    status: string;
    total: number;
    clientName: string;
  };
}

function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link href={`/invoices/${invoice.id}`} className='block'>
      <Card className='hover:border-primary hover:shadow-md group transition-all'>
        <CardContent className='pt-6'>
          <div className='space-y-6 md:space-y-0 relative md:grid md:grid-cols-[4fr_3fr] md:items-center md:gap-2'>
            <div className='flex justify-between md:grid md:grid-cols-[2fr_3fr_3fr]'>
              <div className='text-sm'>
                <span className=''>#</span>
                <span className='text-foreground'>{invoice.id}</span>
              </div>
              <div className='absolute md:static bottom-8 left-0 text-xs space-x-[6px]'>
                <span className='text-foreground-light'>Due</span>
                <span>{moment(invoice.paymentDue).format('ll')}</span>
              </div>
              <div>
                <p className='text-xs'>{invoice.clientName}</p>
              </div>
            </div>
            <div className='flex justify-between items-end md:items-center md:grid md:grid-cols-[2fr_2fr_1fr] md:gap-3'>
              <p className='text-md text-foreground'>$ {invoice.total}</p>
              <div
                className={cn(
                  'pt-[14px] pb-[11px] w-[6.5rem] bg-carbon-blue/5 text-carbon-blue dark:bg-grey/5 dark:text-[#DFE3FA]  rounded-sm flex items-center justify-center',
                  {
                    'bg-green/5 text-green': invoice.status === 'paid',
                    'bg-orange/5 text-orange': invoice.status === 'pending',
                  }
                )}
              >
                <Dot className='stroke-[8px]' />
                <p className='text-sm pt-[3px] pr-[6px] capitalize'>
                  {invoice.status}
                </p>
              </div>
              <div className='hidden md:block cursor-pointer pl-2'>
                <ChevronRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default InvoiceCard;