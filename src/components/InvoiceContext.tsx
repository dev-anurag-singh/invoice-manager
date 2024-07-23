import { TInvoice } from "@/lib/types";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import data from "@/data.json";
import { generateId } from "@/lib/generateId";
import { TFormSchema as InvoiceFormSchema } from "./InvoiceForm";
import moment from "moment";

interface ContextType {
  invoices: TInvoice[] | null;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
  createInvoice: (data: InvoiceFormSchema) => TInvoice;
  updateInvoice: (id: string, data: InvoiceFormSchema) => TInvoice;
}

const InvoiceContext = createContext<ContextType>({} as ContextType);

function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useLocalStorage<TInvoice[] | null>(
    "invoices",
    null,
  );

  useEffect(() => {
    if (!value) {
      // @ts-ignore
      setValue(data);
    }
  }, [setValue, value]);

  // FUNCTION TO ADD A NEW INVOICE
  function createInvoice(data: InvoiceFormSchema) {
    const id = generateId();
    const invoiceDate = moment(data.invoiceDate).format().split("T")[0];
    const paymentDue = moment(data.invoiceDate)
      .add(data.paymentTerm, "days")
      .format()
      .split("T")[0];
    let invoiceTotal = 0;

    const items = data.items.map(({ name, price, quantity }) => {
      const total = price * quantity;

      invoiceTotal = invoiceTotal + total;

      return {
        name,
        price: Number(price),
        quantity: Number(quantity),
        total,
      };
    });

    const invoice = {
      id,
      senderAddress: data.from,
      clientAddress: data.to,
      clientEmail: data.clientEmail,
      clientName: data.clientName,
      description: data.description,
      invoiceDate,
      paymentDue,
      items,
      paymentTerm: data.paymentTerm,
      status: data.status,
      total: invoiceTotal,
    };

    setValue([invoice, ...value!]);

    return invoice;
  }

  // FUNCTION TO UPDATE AN INVOICE
  function updateInvoice(id: string, data: InvoiceFormSchema) {
    const invoices = value?.filter((i) => i.id !== id) || [];

    const invoiceDate = moment(data.invoiceDate).format().split("T")[0];
    const paymentDue = moment(data.invoiceDate)
      .add(data.paymentTerm, "days")
      .format()
      .split("T")[0];
    let invoiceTotal = 0;

    const items = data.items.map(({ name, price, quantity }) => {
      const total = price * quantity;

      invoiceTotal = invoiceTotal + total;

      return {
        name,
        price: Number(price),
        quantity: Number(quantity),
        total,
      };
    });

    const invoice = {
      id,
      senderAddress: data.from,
      clientAddress: data.to,
      clientEmail: data.clientEmail,
      clientName: data.clientName,
      description: data.description,
      invoiceDate,
      paymentDue,
      items,
      paymentTerm: data.paymentTerm,
      status: data.status,
      total: invoiceTotal,
    };

    setValue([invoice, ...invoices]);

    return invoice;
  }

  // FUNTION TO DELETE AN INVOICE
  function deleteInvoice(id: string) {
    if (!value) return;
    const filteredInvoices = value.filter((invoice) => invoice.id !== id);
    setTimeout(() => {
      setValue(filteredInvoices);
    }, 2000);
  }

  // FUNCTION TO MARK AN INVOICE AS PAID
  function markAsPaid(id: string) {
    if (!value) return;

    const filteredInvoices = value.filter((invoice) => invoice.id !== id);
    const invoiceToUpdate = value.find((invoice) => invoice.id === id);

    if (!invoiceToUpdate) return;

    setValue([{ ...invoiceToUpdate, status: "paid" }, ...filteredInvoices]);
  }

  return (
    <InvoiceContext.Provider
      value={{
        invoices: value,
        deleteInvoice,
        markAsPaid,
        createInvoice,
        updateInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  return context;
}

export default InvoiceProvider;
