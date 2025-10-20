import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
	ContainerRegistrationKeys,
	MedusaError,
} from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const { inventoryId } = req.params;
	if (!inventoryId) {
		throw new MedusaError(
			MedusaError.Types.INVALID_DATA,
			"Missing inventory ID"
		);
	}

	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
	const { data: inventoryItems } = await query.graph({
		entity: "inventory_item",
		fields: ["*"],
		filters: { id: inventoryId },
	});

	return res.status(200).json(inventoryItems[0]);
}
