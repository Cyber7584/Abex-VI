import { Request, Response, Router } from "express";
const router = Router();
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// import { v4 as uuidv4 } from "uuid";

// import aws from "aws-sdk";
// import securityHelper from "@helper/security-helper";

// function getCredencials() {
	// const spacesEndpoint = new aws.Endpoint(
	// 	String(process.env.DO_SPACE_ENDPOINT),
	// );
	// const s3 = new aws.S3({
	// 	endpoint: spacesEndpoint,
	// 	accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
	// 	secretAccessKey: process.env.DO_SPACE_SECRET,
	// });
	//
	// return s3;
// }

// const upload = multer({
// 	storage: multerS3({
// 		s3: getCredencials(),
// 		bucket: process.env.DO_SPACE_BUCKET,
// 		acl: "public-read",
// 		key: async function (req: any, file: any, cb: any) {
// 			const randomUuid = uuidv4();
// 			const extension = file.originalname.split(".").pop();
// 			const filePath = `${process.env.DO_SPACE_BASE_PATH}/${randomUuid}.${extension}`;
// 			cb(null, filePath);
// 		},
// 		contentType: multerS3.AUTO_CONTENT_TYPE,
// 	}),
// }).array("file");
//
// router.post(
// 	process.env.BASE_URL + "/api/v1/rpc/upload-file",
// 	securityHelper.verifyJWT,
// 	async function (req: Request, resp: Response) {
// 		await upload(req, resp, async function (err: any) {
// 			if (err) {
// 				return resp.status(500).json({ error: err.message });
// 			}
// 			// get link to file uploaded
// 			if (!req.files) {
// 				return resp.status(500).json({ error: "Arquivo não enviado" });
// 			}
// 			const fileLink = (req.files[0] as any).location;
// 			return resp.status(200).send({
// 				message: "Arquivo enviado com sucesso",
// 				link: fileLink,
// 			});
// 		});
// 	},
// );

module.exports = router;
