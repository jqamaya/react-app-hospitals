
export type User = {
	email: string;
	name: string;
	picture?: string;
}

export type GoogleUser = {
  id: string;
  email: string;
  given_name: string;
  name: string;
  locale: string;
  picture: string;
  verified_email: boolean;
}