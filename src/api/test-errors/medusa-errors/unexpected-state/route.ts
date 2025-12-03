import { MedusaError } from "@medusajs/framework/utils";

export async function GET() {
	throw new MedusaError(
		MedusaError.Types.UNEXPECTED_STATE,
		"unexpected state encountered",
		"UNEXPECTED_STATE",
	);
}
