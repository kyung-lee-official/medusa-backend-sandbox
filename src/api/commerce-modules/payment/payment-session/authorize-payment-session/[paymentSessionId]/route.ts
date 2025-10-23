import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { authorizePaymentSessionsWorkflow } from "../../../../../../workflows/commerce-modules/payment/authorize-payment-session";

type AuthorizePaymentBody = {
	/* additional payment data (card details, etc.) */
	context?: Record<string, any>;
};

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const { paymentSessionId } = req.params;
	const { context = {} } = req.body as AuthorizePaymentBody;
	const { result } = await authorizePaymentSessionsWorkflow(req.scope).run({
		input: {
			id: paymentSessionId,
			context,
		},
	});

	return res.status(200).json(result);
}
