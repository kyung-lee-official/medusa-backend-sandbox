import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.INVALID_ARGUMENT,
		"invalid data provided",
		ErrorCodeSchema.enum.INVALID_ARGUMENT_INVALID_DATA,
	);
}
