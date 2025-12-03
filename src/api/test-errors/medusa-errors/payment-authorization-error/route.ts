import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
		"payment authorization failed",
		"PAYMENT_AUTHORIZATION_ERROR_PAYMENT_AUTHORIZATION_FAILED",
	);
}
