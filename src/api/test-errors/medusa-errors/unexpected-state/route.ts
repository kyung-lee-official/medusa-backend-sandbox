import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.UNEXPECTED_STATE,
		"unexpected state encountered",
		ErrorCodeSchema.enum.UNEXPECTED_STATE,
	);
}
