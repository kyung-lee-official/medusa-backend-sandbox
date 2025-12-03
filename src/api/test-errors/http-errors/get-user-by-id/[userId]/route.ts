import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { HttpError } from "../../../errors/src";

const mockDb = {
	users: [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	],
};

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const { userId } = req.params;
	const user = mockDb.users.find((u) => u.id === Number(userId));
	console.log(user);

	if (!user) {
		throw new HttpError(
			"AUTH_FORBIDDEN",
			"This is a custom error message should has status 403",
			{
				foo: "FOO",
			},
		);
	}
	res.status(200).json(user);
}
