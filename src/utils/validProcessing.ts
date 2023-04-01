import { validation } from "./validationForm";

export function validProcessing (event:Event){
    
    const elem = event.target as HTMLElement
    if (elem.nodeName==='INPUT' && event.type === 'blur'){

        const input = elem as HTMLInputElement

        const checkOb: Record<string, string> = {};
            checkOb[input.name] = input.value;
            
            let validResult = validation(checkOb);
            if (!validResult.isValid && input.dataset.reported === "false") {
                input.setCustomValidity(validResult.errorList[input.name]);
                input.dataset.reported="true";
                input.reportValidity();
             } 
             
             else if (validResult.isValid)  {
                input.setCustomValidity("");
            }
    } 
    else if (elem.nodeName==='INPUT' && event.type === 'focus'){

        const input = elem as HTMLInputElement

        const checkOb: Record<string, string> = {};
        checkOb[input.name] = input.value;

        let validResult = validation(checkOb);
        if (!validResult.isValid) {
            input.setCustomValidity(validResult.errorList[input.name]);
        }
    }
    else if (elem.nodeName==='INPUT' && event.type === 'input'){

        if (elem.dataset.reported === "true") elem.dataset.reported="false"
    }

    if (elem.nodeName==='FORM' && event.type === 'submit'){
        event.preventDefault();
        const form = elem as HTMLFormElement

        const formData = new FormData(form);
        const dataEntries = formData.entries();
        const dataFormatted = Object.fromEntries(dataEntries);

        const validResult = validation(dataFormatted as Record<string, string>);
        if (!validResult.isValid) {
            
            for (let item in validResult.errorList){
            form[item].setCustomValidity(item.valueOf)
            form[item].reportValidity();
            }
      }
        else{console.log(dataFormatted)}
    }
}

