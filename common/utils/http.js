const BASE_URL = 'https://dj.quanyi.xyz/dj'; // 测试

export default {
	request(url, data = {}, method = 'POST', header) {
		const params = url !== '/login' ? { ...data, userid: uni.getStorageSync('userid') || '' } : data;
		return new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				method,
				data: params,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if(res.statusCode === 200) {
						resolve(res.data);
					}else {
						uni.showToast({ title: '服务器错误，请稍后重试！', icon: 'none' });
					}
				},
				fail: err => {
					reject(err);
				}
			})
		})
	}
}