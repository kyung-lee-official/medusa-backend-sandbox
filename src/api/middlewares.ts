import {
	ConfigModule,
	defineMiddlewares,
	MedusaNextFunction,
	MedusaRequest,
	MedusaResponse,
} from "@medusajs/framework";
import { parseCorsOrigins } from "@medusajs/framework/utils";
import cors from "cors";

export default defineMiddlewares({
	routes: [
		{
			matcher: "/hello-world",
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
	],
});
