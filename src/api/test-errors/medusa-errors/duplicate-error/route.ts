import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.DUPLICATE_ERROR,
		"email already exists",
		"DUPLICATE_ERROR_EMAIL_EXISTS",
	);
}
