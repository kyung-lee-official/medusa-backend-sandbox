import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError, Modules } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const cartModuleService = req.scope.resolve(Modules.CART);
	const regionModuleService = req.scope.resolve(Modules.REGION);

	const { cartId } = req.params;
	const cart = await cartModuleService.retrieveCart(cartId);

	if (!cart) {
		throw new MedusaError(MedusaError.Types.NOT_FOUND, "Cart not found");
	}

	/* get cart region */
	const region = cart.region_id
		? await regionModuleService.retrieveRegion(cart.region_id)
		: null;

	/* add region name to each cart */
	const cartWithRegionName = {
		...cart,
		region_name: region ? region.name : null,
	};

	return res.status(200).json(cartWithRegionName);
}
