import { LoginPage } from "./pages/login"
import { ProfilePage } from "./pages/profile"
import { chats } from "./pages/chats"
import { SigninPage } from "./pages/signin"
import { p500 } from "./pages/500"
import { p404 } from "./pages/404"
import { Button } from "../src/components/buttons";


export const app = () =>{
  switch (window.location.pathname) {
    case '/login':
      const loginPage = new LoginPage({})
     return loginPage;
    case '/signin':  
    const signinPage = new SigninPage({})
    return signinPage;
    case '/profile':
      const profilePage = new ProfilePage({})
      return profilePage;
   /* case '/chats':
      return chats();
    
      return signin();
    case '/500':
      return p500();
    case '/404':
      return p404();*/
    default:
      const loginPageD = new LoginPage({})
     return loginPageD;
  }
}
