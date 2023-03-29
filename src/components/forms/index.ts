import { FormTplLogSign } from "./FormTplLS";
import { FormPrTplProf } from "./FormTplProf";
import { Block } from "../../utils/block";
import { Button } from "../buttons";
import { validation } from "../../utils/validationForm";
import "./logSign.scss"
import "./profile.scss"


interface FormProps {
  className: string;
  inputs?: Object[];
  inputsPers?: Object[];
  inputsPass?: Object[];  
  submButton: Record<string, string>;
  Tpl?:string;
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super("form", props);
  }

  init() {
    if (this.props.className) this.element.classList.add(this.props.className);

    this.children.submButton = new Button({
      label: this.props.submButton.label,
      className: this.props.submButton.className,
      type: this.props.submButton.type,
      name: this.props.submButton.name,
    });
    if (this.props.className==="login-signin-form"){
        this.props.Tpl=FormTplLogSign;
    } else if (this.props.className==="profile-form") {
      this.props.Tpl=FormPrTplProf;
    };    
  }

  
  render() {
    return this.compile(this.props.Tpl!, this.props)
    }

  componentDidMount(): void {
    console.log("FormMount");

    this.element.querySelectorAll("input").forEach((el) => {
      el.addEventListener("blur", () => {
        const checkOb: Record<string, string> = {};
        checkOb[el.name] = el.value;
        
        let validResult = validation(checkOb);
        if (!validResult.isValid && el.dataset.reported === "false") {
          el.setCustomValidity(validResult.errorList[el.name]);
          el.dataset.reported="true";
          el.reportValidity();
         } else if (validResult.isValid)  {
          el.setCustomValidity("");
        }
      });
      el.addEventListener("focus", () => {
        const checkOb: Record<string, string> = {};
        checkOb[el.name] = el.value;

        let validResult = validation(checkOb);
        if (!validResult.isValid) {
          el.setCustomValidity(validResult.errorList[el.name]);
        }
      });

      el.addEventListener("input", () => {  
        if (el.dataset.reported === "true") el.dataset.reported="false"
            }
      );


    });

    
    const form = this.element as HTMLFormElement;

    form.addEventListener("submit", (SubmEvent) => {
      SubmEvent.preventDefault();

      const formData = new FormData(form);
      const dataEntries = formData.entries();
      const dataFormatted = Object.fromEntries(dataEntries);

      console.log(dataFormatted);

      const validResult = validation(dataFormatted as Record<string, string>);
      if (!validResult.isValid) {
        
        for (let item in validResult.errorList){
          form[item].setCustomValidity(item.valueOf)
          form[item].reportValidity();
                  }
        
      }
    });
  }
}
