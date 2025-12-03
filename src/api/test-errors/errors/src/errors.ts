import { z } from "zod";

export const ErrorCodeSchema = z.enum([
	// Auth
	"AUTH_UNAUTHORIZED",
	"AUTH_FORBIDDEN",
	"AUTH_SESSION_EXPIRED",
	"AUTH_INVALID_TOKEN",

	// User
	"USER_NOT_FOUND",
	"USER_ALREADY_EXISTS",
	"USER_EMAIL_TAKEN",
	"USER_INVALID_PASSWORD",

	// Business logic
	"ORDER_INSUFFICIENT_BALANCE",
	"ORDER_ALREADY_SHIPPED",
	"ORDER_INVALID_STATE_TRANSITION",
	"ORDER_ITEM_OUT_OF_STOCK",

	// Validation
	"VALIDATION_INVALID_INPUT",
	"VALIDATION_MISSING_FIELD",

	// System
	"SYSTEM_INTERNAL_ERROR",
	"SYSTEM_DATABASE_TIMEOUT",
	"SYSTEM_RATE_LIMITED",
	"SYSTEM_SERVICE_UNAVAILABLE",

	// Network / fallback
	"NETWORK_ERROR",
] as const);
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ERROR_CODE_TO_STATUS: Record<ErrorCode, number> = {
	// 4xx
	AUTH_UNAUTHORIZED: 401,
	AUTH_FORBIDDEN: 403,
	AUTH_SESSION_EXPIRED: 401,
	AUTH_INVALID_TOKEN: 401,

	USER_NOT_FOUND: 404,
	USER_ALREADY_EXISTS: 409,
	USER_EMAIL_TAKEN: 409,
	USER_INVALID_PASSWORD: 400,

	ORDER_INSUFFICIENT_BALANCE: 400,
	ORDER_ALREADY_SHIPPED: 409,
	ORDER_INVALID_STATE_TRANSITION: 409,
	ORDER_ITEM_OUT_OF_STOCK: 400,

	VALIDATION_INVALID_INPUT: 400,
	VALIDATION_MISSING_FIELD: 400,

	SYSTEM_RATE_LIMITED: 429,

	// 5xx
	SYSTEM_INTERNAL_ERROR: 500,
	SYSTEM_DATABASE_TIMEOUT: 503,
	SYSTEM_SERVICE_UNAVAILABLE: 503,

	// Special
	NETWORK_ERROR: 0,
} as const;
export type ErrorStatusCode = (typeof ERROR_CODE_TO_STATUS)[ErrorCode];

export const ApiErrorResponseSchema = z.object({
	error: z.object({
		code: ErrorCodeSchema,
		message: z.string().optional(),
		details: z.any().optional(),
	}),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
