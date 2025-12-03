import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.INVALID_ARGUMENT,
		"invalid data provided",
		"INVALID_ARGUMENT_INVALID_DATA",
	);
}
