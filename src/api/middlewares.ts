import {
	authenticate,
	type ConfigModule,
	defineMiddlewares,
	errorHandler,
	type MedusaNextFunction,
	type MedusaRequest,
	type MedusaResponse,
} from "@medusajs/framework";
import { type MedusaError, parseCorsOrigins } from "@medusajs/framework/utils";
import cors from "cors";

const originalErrorHandler = errorHandler();

export default defineMiddlewares({
	routes: [
		{
			matcher: "*",
			middlewares: [
				(req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
					const configModule: ConfigModule = req.scope.resolve("configModule");

					return cors({
						origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
						credentials: true,
					})(req, res, next);
				},
			],
		},
		{
			method: ["POST"],
			matcher: "/commerce-modules/customer/create-customer",
			middlewares: [
				authenticate("customer", ["bearer"], {
					allowUnregistered: true,
				}),
			],
		},
		{
			method: ["POST"],
			matcher: "/commerce-modules/user/create-user",
			middlewares: [
				authenticate("user", ["bearer"], {
					allowUnregistered: true,
				}),
			],
		},
		{
			method: ["POST"],
			matcher: "/tester",
			middlewares: [
				authenticate("tester", ["bearer"], {
					allowUnregistered: true,
				}),
			],
		},
	],
	errorHandler: (
		error: MedusaError | any,
		req: MedusaRequest,
		res: MedusaResponse,
		next: MedusaNextFunction,
	) => {
		return originalErrorHandler(error, req, res, next);
	},
});
