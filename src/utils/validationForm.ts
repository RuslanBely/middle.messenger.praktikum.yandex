export function validation(checkData: Record<string,string>, event?:Event) {

    interface Iresult{
        isValid: boolean;
        errorList: Record<string,string>
    }
    const result:Iresult = {
        isValid : true,
        errorList:{}
    }
    
    for (let item in checkData) {               
        if (item === 'login'){
            if (!/^(?=[^A-Za-z]*[A-Za-z])[a-zA-Z\-\_0-9]{3,20}$/.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]= `${item} не соответсвует требованиям: От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`;   
            };

        }else if (item === 'password' || item === 'password2' || item === 'oldPassword' || item === 'newPassword') {

            if (!/^(?=[^A-ZА-Я]*[A-ZА-Я])(?=\D*\d).{8,40}$/.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]= `${item} не соответсвует требованиям: От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра`;   
            };
        }else if (item === 'newPassword2' && event!.type=='blur') {
            const target=event!.target as HTMLInputElement
            let prevPassInput=target!.parentElement!.previousElementSibling!.children[1]  as HTMLInputElement
                     
            if ( prevPassInput.value !== checkData[item]){
                result.isValid = false;
                result.errorList[item]= `Новые пароли не совпадают`;   
            };

        }else if (item === 'first_name' || item ==='second_name'){

            if (!/^[A-ZА-Я]{1}[A-z\-А-я]*$/.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]=`${item} не соответсвует требованиям: Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).`;   
            };
        
        }else if (item === 'email'){

            if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]=`${item} не соответсвует требованиям: Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.`;   
            };
        
        }else if (item === 'phone'){

            if (!/^\+?\d{8,15}$/i.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]=`${item} не соответсвует требованиям: От 10 до 15 символов, состоит из цифр, может начинается с плюса.`;   
            };
        
        }else if (item === 'message'){

            if (!/^.+$/i.test(checkData[item])){
                result.isValid = false;
                result.errorList[item]=`${item} не должно быть пустым`;   
            };
        }
         
    }
    
    return (result)
}
