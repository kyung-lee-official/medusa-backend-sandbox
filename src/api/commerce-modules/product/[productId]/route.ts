import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { MedusaError, Modules } from "@medusajs/framework/utils";
import { deleteProductsWorkflow } from "@medusajs/medusa/core-flows";

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
	const { productId } = req.params;

	if (!productId) {
		return res.status(400).json({ error: "Missing product ID" });
	}

	const productModuleService = req.scope.resolve(Modules.PRODUCT);
	const product = await productModuleService.retrieveProduct(productId);
	if (!product) {
		throw new MedusaError(
			MedusaError.Types.NOT_FOUND,
			"Product with the given ID does not exist"
		);
	}

	await deleteProductsWorkflow(req.scope).run({
		input: {
			ids: [productId],
		},
	});

	return res.status(204).send({
		message: "Product deleted successfully",
	});
}
