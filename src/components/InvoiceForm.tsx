import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon, Trash } from 'lucide-react';
import { Calendar } from './ui/calendar';
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';

const formSchema = z.object({
  from: z.object({
    street: z.string().min(1, { message: `can't be empty` }),
    city: z.string().min(1, { message: `can't be empty` }),
    post: z.string().min(1, { message: `can't be empty` }),
    country: z.string().min(1, { message: `can't be empty` }),
  }),
  to: z.object({
    street: z.string().min(1, { message: `can't be empty` }),
    city: z.string().min(1, { message: `can't be empty` }),
    post: z.string().min(1, { message: `can't be empty` }),
    country: z.string().min(1, { message: `can't be empty` }),
  }),
  clientName: z.string().min(3, { message: 'Invalid name' }),
  clientEmail: z.string().email({ message: 'Invalid email' }),
  invoiceDate: z.date({
    invalid_type_error: 'Invalid date',
  }),
  paymentTerm: z.enum(['1', '7', '14', '30'], {
    message: 'Invalid Term',
  }),
  description: z.string().min(1, { message: `can't be empty` }),
  items: z
    .object({
      name: z.string().min(1, { message: 'Required' }),
      quantity: z.coerce.number().min(1),
      price: z.coerce.number().min(1),
    })
    .array()
    .min(1, { message: 'An item must be added' }),
});

interface InvoiceFormProps {
  onClose: () => void;
}

function InvoiceForm({ onClose }: InvoiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: { street: '', city: '', post: '', country: '' },
      to: { street: '', city: '', post: '', country: '' },
      clientName: '',
      clientEmail: '',
      description: '',
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const watchQtyAndPrice = form.watch('items');

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleDraft = () => {
    console.log(form.getValues());
  };

  return (
    <Form {...form}>
      <form
        className='overflow-hidden basis-full flex flex-col'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ScrollArea className='basis-full mr-2 md:mr-6'>
          <div className='space-y-10 pl-6 pr-4 md:pl-14 md:pr-8 pb-8'>
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 grid-row-3 gap-6 md:grid-cols-2 md:grid-rows-2'>
              <FormField
                control={form.control}
                name='invoiceDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Invoice Date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className='rounded-md bg-transparent hover:bg-transparent hover:text-foreground text-foreground flex justify-between items-center w-full h-12'
                          >
                            {field.value ? (
                              moment(field.value).format('D MMM YYYY')
                            ) : (
                              <span>Pick a Date</span>
                            )}
                            <CalendarIcon className='h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='paymentTerm'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Payment Term</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='h-12 px-6 pt-[18px] pb-[15px] bg-transparent text-foreground'>
                          <SelectValue placeholder='Select Payment Term' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='1'>Net 1 Day</SelectItem>
                        <SelectSeparator />
                        <SelectItem value='7'>Net 7 Days</SelectItem>
                        <SelectSeparator />
                        <SelectItem value='14'>Net 14 Days</SelectItem>
                        <SelectSeparator />
                        <SelectItem value='30'>Net 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-5'>
              <h4 className='text-[1.125rem] leading-8 font-bold text-[#777F98]'>
                Item List
              </h4>
              <div className='space-y-12'>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className='flex flex-col gap-6 md:flex-row'
                  >
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem className=''>
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder='' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex gap-4'>
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className=''>
                            <FormLabel>QTY.</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                className='w-16'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem className=''>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                className='w-[6.25rem]'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className='space-y-2 md:w-[4.5rem] overflow-clip text-muted-foreground'>
                        <label className='text-xs'>Total</label>
                        <p className='h-12 text-sm grid items-center'>
                          {(watchQtyAndPrice.at(index)?.price || 0) *
                            (watchQtyAndPrice.at(index)?.quantity || 0)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(index)}
                        className='grid place-content-center ml-auto mt-7 mr-2 md:mr-0'
                      >
                        <Trash className='fill-[#888EB0] stroke-[#888EB0]' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type='button'
                onClick={() => append({ name: '', price: 100, quantity: 1 })}
                variant={'secondary'}
                className='w-full'
              >
                + Add New Item
              </Button>
              {form.formState.errors.items && (
                <p className='text-sm font-semibold text-destructive mt-4'>
                  {form.formState.errors.items.message}
                </p>
              )}
            </div>
          </div>
        </ScrollArea>
        <div className='p-6 md:px-14 md:py-8 border-t flex gap-2 justify-end'>
          <div className='mr-auto hidden sm:block'>
            <Button type='button' onClick={onClose} variant={'secondary'}>
              Discard
            </Button>
          </div>
          <Button type='button' onClick={handleDraft} variant={'tertiary'}>
            Save as draft
          </Button>
          <Button>Save & Send</Button>
        </div>
      </form>
    </Form>
  );
}

export default InvoiceForm;
