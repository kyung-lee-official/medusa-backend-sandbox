import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { CreateProductWorkflowInputDTO } from "@medusajs/framework/types";
import { MedusaError, Modules } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const { result } = await createProductsWorkflow(req.scope).run({
		input: {
			products: req.body as CreateProductWorkflowInputDTO[],
		},
	});
	return res.status(200).json(result);
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const productModuleService = req.scope.resolve(Modules.PRODUCT);
	const data = await productModuleService.listProducts();

	if (!data) {
		throw new MedusaError(MedusaError.Types.NOT_FOUND, "No products found");
	}
	return res.status(200).json(data);
}
