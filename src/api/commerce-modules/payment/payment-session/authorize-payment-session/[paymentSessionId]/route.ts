import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { authorizePaymentSessionsWorkflow } from "../../../../../../workflows/commerce-modules/payment/authorize-payment-session";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const { paymentSessionId } = req.params;

	const { result } = await authorizePaymentSessionsWorkflow(req.scope).run({
		input: {
			id: paymentSessionId,
		},
	});

	return res.status(200).json(result);
}
