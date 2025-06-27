// import Queue, { Job, DoneCallback } from "bee-queue";
// import moment from "moment";
// const redis = require("redis");
// const model = require("@heart/model");

// let client = null;

// if (process.env.REDIS_USERNAME && process.env.REDIS_PASSWORD) {
// 	client = redis.createClient({
// 		url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
// 		tls: {},
// 	});
// } else {
// 	client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
// }

// const sharedConfig = {
// 	redis: client,
// 	removeOnSuccess: true,
// 	activateDelayedJobs: true,
// };

// export const defaultQueue = new Queue("NOME_DA_FILA", sharedConfig);

// defaultQueue.process(async function (job: Job<any>, done: DoneCallback<null>) {
// 	return done(null, null);
// });
