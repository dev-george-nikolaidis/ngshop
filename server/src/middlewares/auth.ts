import { verify } from "jsonwebtoken";

export default (req: any, res: any, next: any) => {
	const token = req.headers.access_token as string;
	console.log(token);

	if (!token) {
		res.status(401).send("No token");
	}

	try {
		const decodedUser = verify(token, process.env.JWT_SECRET!);
		req.user = decodedUser;
	} catch (error) {
		res.status(404).send("Unauthorized");
	}

	return next();
};
