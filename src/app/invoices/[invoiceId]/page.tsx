import { DeleteInvoice } from '@/components/DeleteInvoice';
import InvoiceStatus from '@/components/InvoiceStatus';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

function Page({ params }: { params: { invoiceId: string } }) {
  return (
    <div className='container pt-8 pb-28 md:pb-8 gap-8 md:px-12 h-full grid grid-rows-[auto_1fr]'>
      <Link href={'/'} className='flex gap-6 items-center'>
        <span>
          <ChevronLeft className='w-4 h-4 stroke-[3px] stroke-primary' />
        </span>
        <span className='text-sm mt-1'>Go back</span>
      </Link>
      <ScrollArea type='auto' className='pr-3'>
        <div className='space-y-4'>
          <div className='bg-muted shadow-sm rounded-lg p-6 md:gap-5 flex justify-between md:justify-start items-center'>
            <p className='text-xs text-foreground-light'>Status</p>
            <InvoiceStatus status='pending' />
            <div className='p-6 md:mr-2 md:ml-auto fixed md:p-0 md:static z-10 bottom-0 right-0 left-0 bg-muted flex justify-end gap-2 text-muted-foreground'>
              <Button variant={'secondary'}>Edit</Button>

              {/* Delete Invoice Modal */}
              <DeleteInvoice />

              <Button>Mark as Paid</Button>
            </div>
          </div>
          <div className='p-6 space-y-8 md:space-y-5 shadow-sm bg-muted rounded-lg text-muted-foreground'>
            <div className='space-y-7 md:space-y-0 md:flex md:justify-between'>
              <div className='space-y-1'>
                <h4 className='text-sm md:text-md'>
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
            <div className='space-y-8 md:space-y-0 md:flex gap-28'>
              <div className='flex gap-16 md:gap-28'>
                <div className='flex flex-col justify-between'>
                  <div className='space-y-3'>
                    <p className='text-xs'>Invoice Date</p>
                    <h4 className='text-md leading-5 text-foreground'>
                      21 Aug 2021
                    </h4>
                  </div>
                  <div className='space-y-3'>
                    <p className='text-xs'>Payment Due</p>
                    <h4 className='text-md leading-5 text-foreground'>
                      20 Sep 2021
                    </h4>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='space-y-3'>
                    <p className='text-xs'>Bill To</p>
                    <h4 className='text-md leading-5 text-foreground'>
                      Alex Grim
                    </h4>
                  </div>
                  <p className='text-base'>
                    84 Church Way <br /> Brandford <br /> BD1 9PB <br /> United
                    Kingdom
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <p className='text-xs'>Sent to</p>
                <h4 className='text-md leading-5 text-foreground'>
                  alexgrim@mail.com
                </h4>
              </div>
            </div>

            {/* Table */}
            <div className='rounded-md md:mt-[3rem!important] pt-2 md:pt-4 bg-accent text-accent-foreground overflow-hidden'>
              <Table className=''>
                <TableHeader className='hidden md:table-header-group'>
                  <TableRow>
                    <TableHead className='w-[50%] pl-8'>Item Name</TableHead>
                    <TableHead className='text-center'>QTY.</TableHead>
                    <TableHead className='text-right'>Price</TableHead>
                    <TableHead className='text-right pr-8'>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className='text-sm'>
                  <TableRow>
                    <TableCell className='text-foreground pl-4 pb-6 md:pl-8 md:pb-4 relative'>
                      Banner Design
                      <span className='md:hidden absolute bottom-0 text-xs left-4'>
                        1 x $ 150.00
                      </span>
                    </TableCell>
                    <TableCell className='text-center hidden md:table-cell'>
                      1
                    </TableCell>
                    <TableCell className='text-right hidden md:table-cell'>
                      $ 150.00
                    </TableCell>
                    <TableCell className='text-right text-foreground pr-4 pl-0 md:pl-4 md:pr-8'>
                      $150.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='text-foreground pl-4 pb-6 md:pl-8 md:pb-4 relative'>
                      Banner Design
                      <span className='md:hidden absolute bottom-0 text-xs left-4'>
                        1 x $ 150.00
                      </span>
                    </TableCell>
                    <TableCell className='text-center hidden md:table-cell'>
                      1
                    </TableCell>
                    <TableCell className='text-right hidden md:table-cell'>
                      $ 150.00
                    </TableCell>
                    <TableCell className='text-right text-foreground pr-4 pl-0 md:pl-4 md:pr-8'>
                      $150.00
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter className='bg-carbon-blue border-t-[1rem] border-accent dark:bg-[#0C0E16] text-white'>
                  <TableRow>
                    <TableCell className='py-6 pl-4 md:pl-8'>
                      Grand Total
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      className='hidden md:table-cell'
                    ></TableCell>
                    <TableCell className='text-right text-lg leading-8 pr-4 pl-0 md:pl-4 md:pr-8'>
                      $ 250.0
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Page;
