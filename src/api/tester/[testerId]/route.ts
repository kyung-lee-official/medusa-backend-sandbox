import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { TESTER_MODULE } from "../../../modules/tester";

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
	const { testerId } = req.params;

	if (!testerId) {
		return res.status(400).json({ error: "Missing tester ID" });
	}

	const testerModuleService = req.scope.resolve(TESTER_MODULE);
	await testerModuleService.deleteTesters(testerId);

	return res.status(204).send();
}
