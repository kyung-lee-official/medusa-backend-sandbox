import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.NOT_FOUND,
		ErrorCodeSchema.Enum.NOT_FOUND_CUSTOMER_NOT_FOUND,
	);
}
