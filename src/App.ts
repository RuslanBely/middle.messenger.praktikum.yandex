import { LoginPage } from "./pages/login"
import { ProfilePage } from "./pages/profile"
import { ChatPage } from "./pages/chats"
import { SigninPage } from "./pages/signup"
import { ErrPage } from "./pages/errPages"


export const app = () =>{
  switch (window.location.pathname) {
    case '/chats':
      const chatPage = new ChatPage({})
     return chatPage;
    case '/login':
      const loginPage = new LoginPage({})
     return loginPage;
    case '/signin':  
      const signinPage = new SigninPage({})
      return signinPage;
    case '/profile':
      const profilePage = new ProfilePage({})
      return profilePage;
    case '/500':
      const errPage500 = new ErrPage({err: 500, message:"Мы уже фиксим"})
      return errPage500;
    case '/404':
      const errPage400 = new ErrPage({err: 404, message:"Не туда попали"})
      return errPage400;
   
    default:
      const loginPageD = new LoginPage({})
     return loginPageD;
  }
}
