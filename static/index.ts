import router from '../src/utils/router';
import { LoginPage } from '../src/pages/login';
import { ChatPage } from '../src/pages/chats';
import { SigninPage } from '../src/pages/signup';
import { ProfilePage } from '../src/pages/profile';
import { ErrPage } from '../src/pages/errPages';
import authController from '../src/controllers/AuthController';
import './style.scss';


window.addEventListener('DOMContentLoaded', async () => {
    enum Routes {
        Index = '/',
        SignUp = '/sign-up',
        Profile = '/settings',
        Chats = '/messenger',
        E500 = '/500',
        E400 = '/404'

      }

    router
      .use(Routes.Index, LoginPage)
      .use(Routes.Chats, ChatPage)
      .use(Routes.Profile, ProfilePage)
      .use(Routes.E500, ErrPage, { err: 500, message: 'Мы уже фиксим' })
      .use(Routes.E400, ErrPage, { err: 404, message: 'Не туда попали' })
      .use(Routes.SignUp, SigninPage);

    let isProtectedRoute = true;

    let isRealPath = false;

    switch (window.location.pathname) {
      case Routes.Index:
      case Routes.SignUp:
        isProtectedRoute = false;
        break;
      }

     
   Object.values(Routes).forEach(val =>{
     
     if (val === window.location.pathname){
       isRealPath = true;
       return;
     }
   })

    if (!isRealPath) router.go(Routes.E400)

    try {
      await authController.fetchUser();

      router.start();

      if (!isProtectedRoute) {
        router.go(Routes.Chats);
      }
    } catch (e) {
      router.start();

      if (isProtectedRoute) {
        router.go(Routes.Index);
      }
    }
});
