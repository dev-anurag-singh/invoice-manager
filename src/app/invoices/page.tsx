"use client";
import EmptyInvoices from "@/components/EmptyInvoices";
import InvoiceCard from "@/components/InvoiceCard";
import CreateInvoice from "@/components/CreateInvoice";
import FilterInvoices from "@/components/FilterInvoices";
import { Suspense } from "react";
import { useInvoice } from "@/components/InvoiceContext";
import { useIsMounted } from "../hooks/useIsMounted";
import Loading from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { TInvoice } from "@/lib/types";

export default function Home() {
  const { invoices } = useInvoice();
  const [isMounted] = useIsMounted();
  const searchParams = useSearchParams();
  const filterParams = searchParams.getAll("filter");

  if (!isMounted || !invoices) return <Loading />;

  let filteredInvoices: TInvoice[] = [];

  if (
    filterParams.includes("paid") ||
    filterParams.includes("pending") ||
    filterParams.includes("draft")
  ) {
    if (filterParams.includes("paid")) {
      const paidInvoices = invoices.filter((i) => i.status === "paid");
      filteredInvoices.push(...paidInvoices);
    }
    if (filterParams.includes("pending")) {
      const pendingInvoices = invoices.filter((i) => i.status === "pending");
      filteredInvoices.push(...pendingInvoices);
    }
    if (filterParams.includes("draft")) {
      const drafts = invoices.filter((i) => i.status === "draft");
      filteredInvoices.push(...drafts);
    }
  } else {
    filteredInvoices = invoices;
  }

  return (
    <div className="container">
      <div className="flex items-center gap-5 py-8 md:py-16">
        <div className="mr-auto flex flex-col">
          <h2 className="text-lg md:text-xl">Invoices</h2>
          <span className="text-xs text-foreground-light">
            {filteredInvoices.length} invoices
          </span>
        </div>
        <Suspense>
          <FilterInvoices />
        </Suspense>
        <CreateInvoice />
      </div>
      {filteredInvoices.length ? (
        <div className="space-y-4 pb-8">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
}
