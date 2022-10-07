export interface Application {
  id: string;
  name: string;
  secret: string;
  lang: string;
  version: string;
}

export interface ApplicationError {
  details: string;
  status: string;
}
