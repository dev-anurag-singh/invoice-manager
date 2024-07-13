import { TInvoice } from "@/lib/types";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import data from "@/data.json";
import Loading from "./Loading";

interface ContextType {
  invoices: TInvoice[] | null;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

const InvoiceContext = createContext<ContextType>({} as ContextType);

function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue, removeValue] = useLocalStorage<TInvoice[] | null>(
    "invoices",
    null,
  );

  useEffect(() => {
    if (!value) {
      setValue(data);
    }
  }, [setValue, value]);

  // FUNCTION TO ADD A NEW INVOICE

  // FUNTION TO DELETE AN INVOICE
  function deleteInvoice(id: string) {
    if (!value) return;
    const filteredInvoices = value.filter((invoice) => invoice.id !== id);
    setValue(filteredInvoices);
  }

  // FUNCTION TO UPDATE AN INVOICE
  function markAsPaid(id: string) {
    if (!value) return;

    const filteredInvoices = value.filter((invoice) => invoice.id !== id);
    const invoiceToUpdate = value.find((invoice) => invoice.id === id);

    if (!invoiceToUpdate) return;

    setValue([{ ...invoiceToUpdate, status: "paid" }, ...filteredInvoices]);
  }

  return (
    <InvoiceContext.Provider
      value={{ invoices: value, deleteInvoice, markAsPaid }}
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
