import { Tables } from './database.types';

export type Address = Tables<'addresses'>;
export type Item = Tables<'items'>;

export type Invoice = Tables<'invoices'> & {
  items: Item;
  senderAddress: Address;
  clientAddress: Address;
};
