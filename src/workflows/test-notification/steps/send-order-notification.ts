import {
	createWorkflow,
	WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
// import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { sendNotificationStep } from "./send-notification";
import { mockOrder } from "../../../modules/resend/emails/order-placed";

type WorkflowInput = {
	id: string;
};

export const sendOrderConfirmationWorkflow = createWorkflow(
	"send-order-confirmation",
	({ id }: WorkflowInput) => {
		// const { data: orders } = useQueryGraphStep({
		// 	entity: "order",
		// 	fields: [
		// 		"id",
		// 		"display_id",
		// 		"email",
		// 		"currency_code",
		// 		"total",
		// 		"items.*",
		// 		"shipping_address.*",
		// 		"billing_address.*",
		// 		"shipping_methods.*",
		// 		"customer.*",
		// 		"total",
		// 		"subtotal",
		// 		"discount_total",
		// 		"shipping_total",
		// 		"tax_total",
		// 		"item_subtotal",
		// 		"item_total",
		// 		"item_tax_total",
		// 	],
		// 	filters: {
		// 		id,
		// 	},
		// });

		const notification = sendNotificationStep([
			{
				to: "kyung.lee@qq.com",
				channel: "email",
				template: "order-placed",
				data: {
					order: mockOrder.order,
				},
			},
		]);

		return new WorkflowResponse(notification);
	}
);
