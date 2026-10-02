import type { Plan } from "./plan.const";
export interface PaymentGateway { createCheckout(input: { roadcastId: string; successUrl: string; cancelUrl: string }): Promise<{ url: string }>; verifyWebhook(payload: Uint8Array, signature: string): Promise<{ roadcastId: string; plan: Plan }>; }
