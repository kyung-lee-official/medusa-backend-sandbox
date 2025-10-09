import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { MedusaError, Modules } from "@medusajs/framework/utils";

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
	const { customerId } = req.params;

	if (!customerId) {
		return res.status(400).json({ error: "Missing customer ID" });
	}

	const customerModuleService = req.scope.resolve(Modules.CUSTOMER);
	const authModuleService = req.scope.resolve(Modules.AUTH);
	const customer = await customerModuleService.retrieveCustomer(customerId);
	if (!customer) {
		throw new MedusaError(
			MedusaError.Types.NOT_FOUND,
			"Customer with the given ID does not exist"
		);
	}

	const providerIdentity = await authModuleService.listProviderIdentities({
		entity_id: customer.email,
	});
	if (!providerIdentity.length) {
		throw new MedusaError(
			MedusaError.Types.NOT_FOUND,
			"Customer not found in provider identities"
		);
	}
	await authModuleService.deleteProviderIdentities([providerIdentity[0].id]);
	await authModuleService.deleteAuthIdentities([
		providerIdentity[0].auth_identity_id!,
	]);
	await customerModuleService.deleteCustomers([customerId]);

	return res.status(204).send();
}
