import {
	createWorkflow,
	WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { authorizePaymentSessionStep } from "@medusajs/medusa/core-flows";

type WorkflowInput = {
	id: string;
};

export const authorizePaymentSessionsWorkflow = createWorkflow(
	"authorize-payment-session",
	function (input: WorkflowInput) {
		const data = authorizePaymentSessionStep({
			id: input.id,
			context: {},
		});
		return new WorkflowResponse(data);
	}
);
