import { expect } from "chai";
import router from "./router";
import { LoginPage } from "../pages/login";
import { Route } from "./route";

describe('router', () => {


    it('method go() should create record in history', ()=>{
        const prevHistLen = window.history.length;
        router.go('profile');

        expect(window.history.length).eq(prevHistLen + 1);    
    });

    it('check page transition to signup',  () => {

        router.go('/signup'); 
        
        expect(window.location.pathname).eq('/signup')        
        
    })

    it('check use() and getRoute() methods',  () => {
        
       router.use('/', LoginPage)
       const currRoute = router.getRoute('/');
        
       expect(currRoute).instanceOf(Route)   
    })


});
