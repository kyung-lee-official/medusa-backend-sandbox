import { z } from "zod";

const NormalizedErrorSchema = z.object({
	code: z.string(), // Error code from Medusa, e.g., "PRODUCT_NOT_FOUND"
	message: z.string(), // Human-readable message
	details: z.any().optional(), // optional, framework-specific details (e.g. Zod errors)
	timestamp: z.iso.datetime(), // ISO timestamp of when the error occurred
});

export const ErrorCodeSchema = z.enum([
	"DB_ERROR_UNKNOWN_DB_ERROR",
	"DUPLICATE_ERROR_EMAIL_EXISTS",
	"INVALID_ARGUMENT_INVALID_DATA",
	"UNEXPECTED_STATE",
	"NOT_FOUND_ROUTE_NOT_FOUND",
	"NOT_FOUND_CUSTOMER_NOT_FOUND",
	"NOT_FOUND_ORDER_NOT_FOUND",
	"NOT_FOUND_PRODUCT_NOT_FOUND",
	"INVALID_DATA_INVALID_EMAIL",
	"UNAUTHORIZED_CANNOT_DELETE_USER",
	"CONFLICT_RESOURCE_CONFLICT_OCCURRED",
	"PAYMENT_AUTHORIZATION_ERROR_PAYMENT_AUTHORIZATION_FAILED",
]);
export type ErrorCodeType = z.infer<typeof ErrorCodeSchema>;
