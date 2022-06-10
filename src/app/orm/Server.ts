export class Server {
  id!: number;
  host!: string;
  userName!: string;
  password!: String;
  type!: string;
  path!: String;
  name!: String;
  clientName!: String;
  user!: any;

}
export class  AppUser{
 
  id!: number;
  firstName!: String
  lastName!: String
  email!: String;
  password!: String;
  appUserRole!: String;
  locked!: boolean;
  enabled!: boolean;
  username!: String;
  accountNonLocked!: boolean;
  authorities!: [
    {
      authority: String
    }
  ];
  accountNonExpired!: boolean;
  credentialsNonExpired!: boolean
}
