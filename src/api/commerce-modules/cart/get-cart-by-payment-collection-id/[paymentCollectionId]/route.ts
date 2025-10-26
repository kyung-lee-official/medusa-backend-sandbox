import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
	ContainerRegistrationKeys,
	MedusaError,
} from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const { paymentCollectionId } = req.params;
	if (!paymentCollectionId) {
		throw new MedusaError(
			MedusaError.Types.INVALID_DATA,
			"Payment collection ID is required"
		);
	}

	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
	const { data: paymentCollections } = await query.graph({
		entity: "payment_collection",
		fields: ["cart.*", "cart.region.*", "cart.sales_channel.*"],
		filters: {
			id: paymentCollectionId,
		},
	});
	return res.status(200).json(paymentCollections[0]);
}
