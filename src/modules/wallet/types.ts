export interface WalletTxnInput {
  userId: string;
  assetCode: string;
  amount: number;
  idempotencyKey: string;
  description?: string;
}
