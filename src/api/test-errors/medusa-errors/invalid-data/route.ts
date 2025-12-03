import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.INVALID_DATA,
		"invalid email",
		ErrorCodeSchema.enum.INVALID_DATA_INVALID_EMAIL,
	);
}
