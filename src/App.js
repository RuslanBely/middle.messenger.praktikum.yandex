import { login } from "./pages/login"
import { profile } from "./pages/profile"
import { chats } from "./pages/chats"
import { signin } from "./pages/signin"
import { p500 } from "./pages/500"
import { p404 } from "./pages/404"

export const app = () =>{
  switch (window.location.pathname) {
    case '/login':
      return login();
    case '/profile':
      return profile();
    case '/chats':
      return chats();
    case '/signin':
      return signin();
    case '/500':
      return p500();
    case '/404':
      return p404();
    default:
      return '';
  }
}