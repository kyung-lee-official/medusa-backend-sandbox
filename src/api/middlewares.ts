import {
	ConfigModule,
	defineMiddlewares,
	MedusaNextFunction,
	MedusaRequest,
	MedusaResponse,
} from "@medusajs/framework";
import { parseCorsOrigins } from "@medusajs/framework/utils";
import cors from "cors";
import { authenticate } from "@medusajs/framework";

export default defineMiddlewares({
	routes: [
		{
			matcher: "*",
			middlewares: [
				(
					req: MedusaRequest,
					res: MedusaResponse,
					next: MedusaNextFunction
				) => {
					const configModule: ConfigModule =
						req.scope.resolve("configModule");

					return cors({
						origin: parseCorsOrigins(
							configModule.projectConfig.http.storeCors
						),
						credentials: true,
					})(req, res, next);
				},
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
});
