import { Request, RequestHandler, Response, Router } from "express";
import HttpException from "@type/http-exception";

const routeBuilder = {
	get(
		router: Router,
		url: string,
		middlewares: Array<RequestHandler>,
		callback: (req: Request, resp: Response) => void,
	) {
		router.get(
			url,
			...middlewares,
			async function (req: Request, resp: Response) {
				try {
					await callback(req, resp);
				} catch (e) {
					if (e instanceof HttpException) {
						return resp
							.status(e.status)
							.send({ message: e.message });
					} else if (e instanceof Error) {
						return resp.status(500).json({ message: e.message });
					}

					return resp
						.status(500)
						.json({ message: "Erro inesperado" });
				}
			},
		);
	},

	post(
		router: Router,
		url: string,
		middlewares: Array<RequestHandler>,
		callback: (req: Request, resp: Response) => void,
	) {
		router.post(
			url,
			...middlewares,
			async function (req: Request, resp: Response) {
				try {
					await callback(req, resp);
				} catch (e) {
					if (e instanceof HttpException) {
						return resp
							.status(e.status)
							.send({ message: e.message });
					} else if (e instanceof Error) {
						return resp.status(500).json({ message: e.message });
					}

					return resp
						.status(500)
						.json({ message: "Erro inesperado" });
				}
			},
		);
	},

	put(
		router: Router,
		url: string,
		middlewares: Array<RequestHandler>,
		callback: (req: Request, resp: Response) => void,
	) {
		router.put(
			url,
			...middlewares,
			async function (req: Request, resp: Response) {
				try {
					await callback(req, resp);
				} catch (e) {
					if (e instanceof HttpException) {
						return resp
							.status(e.status)
							.send({ message: e.message });
					} else if (e instanceof Error) {
						return resp.status(500).json({ message: e.message });
					}

					return resp
						.status(500)
						.json({ message: "Erro inesperado" });
				}
			},
		);
	},

	delete(
		router: Router,
		url: string,
		middlewares: Array<RequestHandler>,
		callback: (req: Request, resp: Response) => void,
	) {
		router.delete(
			url,
			...middlewares,
			async function (req: Request, resp: Response) {
				try {
					await callback(req, resp);
				} catch (e) {
					if (e instanceof HttpException) {
						return resp
							.status(e.status)
							.send({ message: e.message });
					} else if (e instanceof Error) {
						return resp.status(500).json({ message: e.message });
					}

					return resp
						.status(500)
						.json({ message: "Erro inesperado" });
				}
			},
		);
	},
};

export default routeBuilder;
