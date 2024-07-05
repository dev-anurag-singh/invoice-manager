"use client";
import EmptyInvoices from "@/components/EmptyInvoices";
import InvoiceCard from "@/components/InvoiceCard";
import CreateInvoice from "@/components/CreateInvoice";
import FilterInvoices from "@/components/FilterInvoices";
import { Suspense } from "react";
import { useInvoice } from "@/components/InvoiceContext";

export default function Home() {
  const { invoices } = useInvoice();
  return (
    <div className="container">
      <div className="flex items-center gap-5 py-8 md:py-16">
        <div className="mr-auto flex flex-col">
          <h2 className="text-lg md:text-xl">Invoices</h2>
          <span className="text-xs text-foreground-light">
            {invoices.length} invoices
          </span>
        </div>
        <Suspense>
          <FilterInvoices />
        </Suspense>
        <CreateInvoice />
      </div>
      {invoices.length ? (
        <div className="space-y-4 pb-8">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
}
