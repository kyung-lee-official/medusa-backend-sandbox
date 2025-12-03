import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.NOT_FOUND,
		"cannot find customer",
		"NOT_FOUND_CUSTOMER_NOT_FOUND",
	);
}
