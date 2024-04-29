'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  from: z.object({
    street: z
      .string()
      .min(4, { message: 'Street address must be at-least 4 characters' }),
    city: z.string().min(1, { message: 'City cannot be empty' }),
    post: z.string().min(1, { message: 'Post code cannot be empty' }),
    country: z.string().min(1, { message: 'Country cannot be empty' }),
  }),
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
        <div className='space-y-6'>
          <h4 className='text-sm text-primary '>Bill From</h4>
          <FormField
            control={form.control}
            name='from.street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default InvoiceForm;
