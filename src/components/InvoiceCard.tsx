import { ChevronRight, Dot } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import moment from 'moment';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import InvoiceStatus from './InvoiceStatus';

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
        <CardContent className='pt-6 md:py-4 lg:px-8'>
          <div className='space-y-6 md:space-y-0 relative md:grid md:grid-cols-[1fr_16.5rem] md:items-center '>
            <div className='flex justify-between md:grid md:grid-cols-[2fr_3fr_3fr]'>
              <div className='text-sm'>
                <span className='mr-[1px]'>#</span>
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
            <div className='flex justify-between items-end md:items-center md:grid md:grid-cols-[1fr_6.5rem_1rem] md:gap-5'>
              <p className='text-md text-foreground md:text-right pr-5'>
                $ {invoice.total}
              </p>
              <InvoiceStatus status={invoice.status} />
              <div className='hidden md:block'>
                <ChevronRight className='h-4 w-4 stroke-[3px] group-hover:translate-x-1 stroke-primary transition-transform' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default InvoiceCard;
