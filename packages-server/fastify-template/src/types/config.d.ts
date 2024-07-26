export interface CONF {
  pg: {
    host: string;
    port: number;
    database: string;
    schema: string;
    username: string;
    password: string;
  };
  admin: {
    user_id: string;
    password: string;
    nickname: string;
    email: string;
  };
}
