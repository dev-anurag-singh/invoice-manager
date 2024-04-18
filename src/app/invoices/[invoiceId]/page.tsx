import InvoiceStatus from '@/components/InvoiceStatus';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

function Page({ params }: { params: { invoiceId: string } }) {
  return (
    <div className='container pt-8 pb-28 gap-8 md:px-12 h-full grid grid-rows-[auto_1fr]'>
      <Link href={'/'} className='flex gap-6 items-center'>
        <span>
          <ChevronLeft className='w-4 h-4 stroke-[3px] stroke-primary' />
        </span>
        <span className='text-sm mt-1'>Go back</span>
      </Link>
      <ScrollArea>
        <div className='space-y-4'>
          <div className='bg-muted shadow-sm rounded-lg p-6 flex justify-between items-center'>
            <p className='text-xs text-foreground-light'>Status</p>
            <InvoiceStatus status='pending' />
          </div>
          <div className='p-6 shadow-sm bg-muted rounded-lg text-muted-foreground'>
            <div className='space-y-7'>
              <div className='space-y-1'>
                <h4 className='text-sm'>
                  <span className='mr-0.5'>#</span>
                  <span className='text-foreground'>XM9141</span>
                </h4>
                <p className='text-xs'>Graphic Design</p>
              </div>
              <p className='text-base'>
                19 Union Terrace <br /> London <br /> E1 3EZ <br /> United
                Kingdom
              </p>
            </div>
            <div>
              <div>
                <div>
                  <p>Invoice Date</p>
                  <h4>21 Aug 2021</h4>
                </div>
                <div>
                  <p>Payment Due</p>
                  <h4>20 Sep 2021</h4>
                </div>
              </div>
              <div>
                <p>Bill To</p>
                <h4>Alex Grim</h4>
                <p>
                  84 Church Way <br /> Brandford <br /> BD1 9PB <br /> United
                  Kingdom
                </p>
              </div>
            </div>
          </div>
          <div className='p-6 fixed z-10 bottom-0 right-0 left-0 bg-muted flex justify-between text-muted-foreground'>
            <Button variant={'secondary'}>Edit</Button>
            <Button variant={'destructive'}>Delete</Button>
            <Button>Mark as Paid</Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
