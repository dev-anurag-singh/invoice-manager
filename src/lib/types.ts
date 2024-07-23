type address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export interface TInvoice {
  id: string;
  invoiceDate: string;
  paymentDue: string;
  description: string;
  paymentTerm: "1" | "7" | "14" | "30";
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: address;
  clientAddress: address;
  items: item[] | [];
  total: number;
}
