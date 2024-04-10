import { ChevronRight, Dot } from 'lucide-react';
import { Card, CardContent } from './ui/card';

function InvoiceCard() {
  return (
    <Card className='hover:border-primary hover:shadow-md group cursor-pointer transition-all'>
      <CardContent className='pt-6'>
        <div className='space-y-6 relative md:flex md:justify-between md:space-y-0 md:items-center'>
          <div className='flex justify-between'>
            <div className='text-sm md:mr-6'>
              <span className=''>#</span>
              <span className='text-foreground'>RT3080</span>
            </div>
            <div className='absolute md:static md:mr-12 bottom-8 left-0 text-xs space-x-[6px]'>
              <span className='text-foreground-light'>Due</span>
              <span>19 Aug 2021</span>
            </div>
            <div>
              <p className='text-xs'>Jensen Huang</p>
            </div>
          </div>
          <div className='flex justify-between items-end md:items-center'>
            <p className='text-md text-foreground'>$ 1,800</p>
            <div className='pl-6 md:ml-10 md:mr-5 pr-7 pt-[14px] pb-[11px] bg-green/5 rounded-sm flex items-center'>
              <Dot className='stroke-[8px] stroke-green' />
              <p className='text-sm text-green mt-[2px] '>Paid</p>
            </div>
            <div className='hidden md:block cursor-pointer'>
              <ChevronRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InvoiceCard;
