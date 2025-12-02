import { z } from "zod";

export const ErrorCodeSchema = z.enum([
	"DB_ERROR_UNKNOWN_DB_ERROR",
	"DUPLICATE_ERROR_EMAIL_EXISTS",
	"NOT_FOUND_ROUTE_NOT_FOUND",
	"NOT_FOUND_CUSTOMER_NOT_FOUND",
	"NOT_FOUND_ORDER_NOT_FOUND",
	"NOT_FOUND_PRODUCT_NOT_FOUND",
]);
export type ErrorCodeType = z.infer<typeof ErrorCodeSchema>;
