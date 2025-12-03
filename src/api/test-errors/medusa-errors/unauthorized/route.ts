import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.UNAUTHORIZED,
		"sign in required to delete user",
		"UNAUTHORIZED_CANNOT_DELETE_USER",
	);
}
