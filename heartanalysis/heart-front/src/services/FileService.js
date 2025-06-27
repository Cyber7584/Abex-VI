import fetch from 'auth/FetchInterceptor';

const fileService = {};

fileService.delete = async (filePath) => {
	return fetch({
		url: `/v1/rest/file-manager/delete?filepath=${filePath}`,
		method: 'delete',
		data: {
			filePath
		}
	});
};

fileService.get = async filePath => {
	return fetch({
		url: `/v1/rest/file-manager/download?filepath=${filePath}`,
		method: 'get',
	});
};

export default fileService;
