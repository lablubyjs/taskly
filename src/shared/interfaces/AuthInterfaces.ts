interface ICredentials {
  email: string
  password: string
}

export interface IRegister extends ICredentials {
  name: string
}

export interface ILogin extends ICredentials {}
