import { ReceiptStore } from './ReceiptStore';

export function createStores() {
  const receiptStore = new ReceiptStore([]);

  return {
    ['receipt']: receiptStore
  };
}
