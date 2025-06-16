const schema = {
	email: {
		type: String,
		label: 'Email',
		optional: false
	},
	password: {
		type: String,
		label: 'Senha',
		optional: false
	},
	username: {
		type: String,
		label: 'Nome do usuario',
		optional: false
	},
	dateOfBirth: {
		type: Date,
		label: 'Data de nascimento',
		optional: false
	},
	gender: {
		type: String,
		label: 'Gênero',
		optional: false
	},
	companyWorks: {
		type: String,
		label: 'Empresa onde trabalha',
		optional: false
	},
	profileImage: {
		type: String,
		label: 'Imagem de perfil',
		optional: true
	}
};

export default schema;
