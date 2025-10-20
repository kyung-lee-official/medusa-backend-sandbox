import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
	ContainerRegistrationKeys,
	MedusaError,
	Modules,
} from "@medusajs/framework/utils";
import { deleteProductsWorkflow } from "@medusajs/medusa/core-flows";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const { productId } = req.params;
	if (!productId) {
		throw new MedusaError(
			MedusaError.Types.INVALID_DATA,
			"Missing product ID"
		);
	}

	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
	const { data } = await query.graph({
		entity: "product",
		fields: ["*", "variants.*", "variants.prices.*"],
		filters: {
			id: productId,
		},
	});

	if (!data) {
		throw new MedusaError(MedusaError.Types.NOT_FOUND, "No products found");
	}
	return res.status(200).json(data[0]);
}

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
