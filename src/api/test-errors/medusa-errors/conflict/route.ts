import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.CONFLICT,
		"resource conflict occurred",
		ErrorCodeSchema.enum.CONFLICT_RESOURCE_CONFLICT_OCCURRED,
	);
}
