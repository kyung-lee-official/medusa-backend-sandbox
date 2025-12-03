import { MedusaError } from "@medusajs/framework/utils";
import { ErrorCodeSchema } from "../../schema";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.UNAUTHORIZED,
		"sign in required to delete user",
		ErrorCodeSchema.enum.UNAUTHORIZED_CANNOT_DELETE_USER,
	);
}
