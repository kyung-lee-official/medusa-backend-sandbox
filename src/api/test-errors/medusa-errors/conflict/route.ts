import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.CONFLICT,
		"resource conflict occurred",
		"CONFLICT_RESOURCE_CONFLICT_OCCURRED",
	);
}
