export async function signIn(email: string, password: string): Promise<any> {
	const data = {
		identifier: email,
		password: password,
	};
	console.log(data);
	const response = await fetch('http://localhost:1337/auth/local', {
		method: 'POST',
		headers: [['Content-Type', 'application/json']],
		body: JSON.stringify(data),
	}).catch((error) => {
		console.error('Error:', error);
	});
	return response;
}

export async function signInWithGoogle(): Promise<any> {
	const redirectUrl = 'http://localhost:1337/';
	let response = fetch(`http://localhost:1337/auth/google/callback?${redirectUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).catch((error) => {
		console.error('Error:', error);
	});
	return response;
}

export async function signUp(username: string, email: string, password: string): Promise<any> {
	const data = {
		username: username,
		email: email,
		password: password,
	};
	console.log(data);
	const response = await fetch('http://localhost:1337/auth/local/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).catch((error) => {
		console.error('Error:', error);
	});
	return response;
}
