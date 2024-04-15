function Page({ params }: { params: { invoiceId: string } }) {
  return <div>{params.invoiceId}</div>;
}

export default Page;
