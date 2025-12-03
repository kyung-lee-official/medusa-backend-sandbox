import { z } from "zod";

export const ErrorCodeSchema = z.enum([
	// Auth
	"AUTH.UNAUTHORIZED",
	"AUTH.FORBIDDEN",
	"AUTH.SESSION_EXPIRED",
	"AUTH.INVALID_TOKEN",

	// User
	"USER.NOT_FOUND",
	"USER.ALREADY_EXISTS",
	"USER.EMAIL_TAKEN",
	"USER.INVALID_PASSWORD",

	// Business logic
	"ORDER.INSUFFICIENT_BALANCE",
	"ORDER.ALREADY_SHIPPED",
	"ORDER.INVALID_STATE_TRANSITION",
	"ORDER.ITEM_OUT_OF_STOCK",

	// Validation
	"VALIDATION.INVALID_INPUT",
	"VALIDATION.MISSING_FIELD",

	// System
	"SYSTEM.INTERNAL_ERROR",
	"SYSTEM.DATABASE_TIMEOUT",
	"SYSTEM.RATE_LIMITED",
	"SYSTEM.SERVICE_UNAVAILABLE",

	// Network / fallback
	"NETWORK.ERROR",
] as const);
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ERROR_CODE_TO_STATUS: Record<ErrorCode, number> = {
	// 4xx
	"AUTH.UNAUTHORIZED": 401,
	"AUTH.FORBIDDEN": 403,
	"AUTH.SESSION_EXPIRED": 401,
	"AUTH.INVALID_TOKEN": 401,

	"USER.NOT_FOUND": 404,
	"USER.ALREADY_EXISTS": 409,
	"USER.EMAIL_TAKEN": 409,
	"USER.INVALID_PASSWORD": 400,

	"ORDER.INSUFFICIENT_BALANCE": 400,
	"ORDER.ALREADY_SHIPPED": 409,
	"ORDER.INVALID_STATE_TRANSITION": 409,
	"ORDER.ITEM_OUT_OF_STOCK": 400,

	"VALIDATION.INVALID_INPUT": 400,
	"VALIDATION.MISSING_FIELD": 400,

	"SYSTEM.RATE_LIMITED": 429,

	// 5xx
	"SYSTEM.INTERNAL_ERROR": 500,
	"SYSTEM.DATABASE_TIMEOUT": 503,
	"SYSTEM.SERVICE_UNAVAILABLE": 503,

	// Special
	"NETWORK.ERROR": 0,
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
