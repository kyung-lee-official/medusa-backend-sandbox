import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.DUPLICATE_ERROR,
		ErrorCodeSchema.Enum.DUPLICATE_ERROR_EMAIL_EXISTS,
	);
}
