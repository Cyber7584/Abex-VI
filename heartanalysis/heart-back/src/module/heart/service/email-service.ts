const { createTransport } = require("nodemailer");

const emailService = {
	enviarEmail: async (email: string, assunto: string, corpo: string) => {
		if (process.env.NODE_ENV === "development") {
			console.log(
				"Email enviado para " +
					email +
					" com o assunto " +
					assunto +
					" e o corpo " +
					corpo,
			);
			return;
		}

		const transporter = createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: process.env.EMAIL_SSL === "true",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: assunto,
			html: corpo,
		});
	},
};

export default emailService;
