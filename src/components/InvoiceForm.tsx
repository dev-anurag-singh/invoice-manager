import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useInvoice } from "./InvoiceContext";
import { useToast } from "./ui/use-toast";
import { TInvoice } from "@/lib/types";

const formSchema = z.object({
  from: z.object({
    street: z.string().min(1, { message: `can't be empty` }),
    city: z.string().min(1, { message: `can't be empty` }),
    postCode: z.string().min(1, { message: `can't be empty` }),
    country: z.string().min(1, { message: `can't be empty` }),
  }),
  to: z.object({
    street: z.string().min(1, { message: `can't be empty` }),
    city: z.string().min(1, { message: `can't be empty` }),
    postCode: z.string().min(1, { message: `can't be empty` }),
    country: z.string().min(1, { message: `can't be empty` }),
  }),
  clientName: z.string().min(3, { message: "Invalid name" }),
  clientEmail: z.string().email({ message: "Invalid email" }),
  invoiceDate: z.date({
    invalid_type_error: "Invalid date",
  }),
  paymentTerm: z.enum(["1", "7", "14", "30"], {
    message: "Invalid Term",
  }),
  description: z.string().min(1, { message: `can't be empty` }),
  status: z.enum(["draft", "pending", "paid"]),
  items: z
    .object({
      name: z.string().min(1, { message: "Required" }),
      quantity: z.coerce.number().min(1),
      price: z.coerce.number().min(1),
    })
    .array()
    .min(1, { message: "An item must be added" }),
});

interface InvoiceFormProps {
  onClose: () => void;
  data?: TInvoice;
}

export type TFormSchema = z.infer<typeof formSchema>;

function InvoiceForm({ onClose, data }: InvoiceFormProps) {
  const { createInvoice, updateInvoice } = useInvoice();
  const { toast } = useToast();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: data?.senderAddress || {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      to: data?.clientAddress || {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: data?.clientName || "",
      clientEmail: data?.clientEmail || "",
      description: data?.description || "",
      invoiceDate: data?.invoiceDate && new Date(data?.invoiceDate) || new Date(),
      paymentTerm: data?.paymentTerm || "7",
      status: data?.status || "draft",
      items: data?.items || [],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchQtyAndPrice = form.watch("items");

  const handleSubmit = (values: TFormSchema) => {
    const status = form.formState.isSubmitting ? "pending" : "draft";
    // CREATE AN INVOICE
    if (!data) {
      const { id } = createInvoice({ ...values, status });

      toast({
        title: `Invoice #${id} created successfully`,
        duration: 2000,
      });
    } else {
      const { id } = updateInvoice(data.id, { ...values, status });

      toast({
        title: `Invoice #${id} updated successfully`,
        duration: 2000,
      });
    }

    // CLOSE THE MODAL
    onClose();
  };

  return (
    <Form {...form}>
      <form
        className="flex basis-full flex-col overflow-hidden"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="custom-scrollbar mr-2 basis-full overflow-y-auto">
          <div className="space-y-10 pb-8 pl-6 pr-4 md:pl-14 md:pr-8">
            <div className="space-y-6">
              <h4 className="text-sm text-primary">Bill From</h4>
              <div className="grid grid-cols-2 grid-rows-3 gap-6">
                <FormField
                  control={form.control}
                  name="from.street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Code</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="from.country"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm text-primary">Bill To</h4>
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client&apos;s name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client&apos;s Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 grid-rows-3 gap-6">
                <FormField
                  control={form.control}
                  name="to.street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to.postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Code</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to.country"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid-row-3 grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
              <FormField
                control={form.control}
                name="invoiceDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Invoice Date</FormLabel>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="flex h-12 w-full items-center justify-between rounded-md bg-transparent text-foreground hover:bg-transparent hover:text-foreground"
                          >
                            {field.value ? (
                              moment(field.value).format("D MMM YYYY")
                            ) : (
                              <span>Pick a Date</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
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
                name="paymentTerm"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Term</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-transparent px-6 pb-[15px] pt-[18px] text-foreground">
                          <SelectValue placeholder="Select Payment Term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Net 1 Day</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="7">Net 7 Days</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="14">Net 14 Days</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="30">Net 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-5">
              <h4 className="text-[1.125rem] font-bold leading-8 text-[#777F98]">
                Item List
              </h4>
              <div className="space-y-12">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-6 md:flex-row"
                  >
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>QTY.</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="w-16"
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
                          <FormItem className="">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="w-[6.25rem]"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2 overflow-clip text-muted-foreground md:w-[4.5rem]">
                        <label className="text-xs">Total</label>
                        <p className="grid h-12 items-center text-sm">
                          {(watchQtyAndPrice.at(index)?.price || 0) *
                            (watchQtyAndPrice.at(index)?.quantity || 0)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(index)}
                        className="ml-auto mr-2 mt-7 grid place-content-center md:mr-0"
                      >
                        <Trash2 className="stroke-[#888EB0]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => append({ name: "", price: 100, quantity: 1 })}
                variant={"secondary"}
                className="w-full"
              >
                + Add New Item
              </Button>
              {form.formState.errors.items && (
                <p className="mt-4 text-sm font-semibold text-destructive">
                  {form.formState.errors.items.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t p-6 md:px-14 md:py-8">
          {!data ? (
            <>
              <div className="mr-auto hidden sm:block">
                <Button type="button" onClick={onClose} variant={"secondary"}>
                  Discard
                </Button>
              </div>

              <Button
                type="button"
                onClick={() => handleSubmit(form.getValues())}
                variant={"tertiary"}
              >
                Save as draft
              </Button>
            </>
          ) : (
            <Button type="button" onClick={onClose} variant={"secondary"}>
              Cancel
            </Button>
          )}
          <Button>{data ? "Save Changes" : "Save & Send"}</Button>
        </div>
      </form>
    </Form>
  );
}

export default InvoiceForm;
