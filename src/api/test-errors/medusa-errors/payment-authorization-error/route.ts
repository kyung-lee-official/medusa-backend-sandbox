import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
		"payment authorization failed",
		ErrorCodeSchema.enum
			.PAYMENT_AUTHORIZATION_ERROR_PAYMENT_AUTHORIZATION_FAILED,
	);
}
