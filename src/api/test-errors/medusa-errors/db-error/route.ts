import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.DB_ERROR,
		ErrorCodeSchema.Enum.DB_ERROR_UNKNOWN_DB_ERROR,
	);
}
