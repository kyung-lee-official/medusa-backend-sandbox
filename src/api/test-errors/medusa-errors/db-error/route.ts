import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.DB_ERROR,
		"unknown database error",
		"DB_ERROR_UNKNOWN_DB_ERROR",
	);
}
