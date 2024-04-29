'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  from: z.object({
    street: z.string().min(1, { message: 'Required' }),
    city: z.string().min(1, { message: 'Required' }),
    post: z.string().min(1, { message: 'Required' }),
    country: z.string().min(1, { message: 'Required' }),
  }),
  to: z.object({
    street: z.string().min(1, { message: 'Required' }),
    city: z.string().min(1, { message: 'Required' }),
    post: z.string().min(1, { message: 'Required' }),
    country: z.string().min(1, { message: 'Required' }),
  }),
  clientName: z.string().min(3, { message: 'Enter a valid name' }),
  clientEmail: z.string().email({ message: 'Enter a valid email' }),
  invoiceDate: z
    .date({
      required_error: 'Enter a valid date',
    })
    .min(new Date(), { message: 'Too old' }),
  paymentTerm: z
    .number()
    .gte(1, { message: 'Invalid' })
    .int({ message: 'Invalid' }),
  description: z.string({ required_error: 'Enter a description' }),
});

function InvoiceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-10'>
          <div className='space-y-6'>
            <h4 className='text-sm text-primary '>Bill From</h4>
            <div className='grid grid-cols-2 grid-rows-3 gap-6'>
              <FormField
                control={form.control}
                name='from.street'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='from.city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='from.post'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='from.country'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='space-y-6'>
            <h4 className='text-sm text-primary'>Bill To</h4>
            <FormField
              control={form.control}
              name='clientName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client&apos;s name</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='clientEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client&apos;s Email</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 grid-rows-3 gap-6'>
              <FormField
                control={form.control}
                name='to.street'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='to.city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='to.post'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='to.country'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            {/* change input to date picker */}
            <FormField
              control={form.control}
              name='invoiceDate'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default InvoiceForm;
