export default {
	first_name: 'Nome',
	last_name: 'Sobrenome',
	full_name: 'Nome Sobrenome',
	email: 'email@example.com',
	phone: '31 3123123',
	password: '*****',
	preferences: []
}

export function cleanUser(){
	return {
		first_name: '',
		last_name: '',
		full_name: '',
		email: '',
		phone: '',
		password: '*****',
		preferences: []
	}
}