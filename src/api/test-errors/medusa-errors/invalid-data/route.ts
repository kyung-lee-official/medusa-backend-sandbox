import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.INVALID_DATA,
		"invalid email",
		"INVALID_DATA_INVALID_EMAIL",
	);
}
