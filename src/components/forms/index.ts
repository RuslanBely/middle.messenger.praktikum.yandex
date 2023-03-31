import { FormTplSign } from "./FormTplSign";
import { FormTplLogin } from "./FormTplLogin";
import { FormPrTplProf } from "./FormTplProf";
import { FormTplChats } from "./FormTplLChats";
import { Block } from "../../utils/block";
import { Button } from "../buttons";
import { Input } from "../inputs";
import { validProcessing } from "../../utils/validProcessing";
import "./st_logSign.scss"
import "./st_profile.scss"
import "./st_chats.scss"

interface FormProps {
  className: string;
  inputs: {name:string, type:string, value?:string, placeholder?:string}[];
  inputsPers?: Object[];
  inputsPass?: Object[];  
  submButton: Record<string, string>;
  pageTpl:string;
  events?:{}
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
      name: this.props.submButton.name
    });

   
    this.props.inputs.forEach( el => {

    this.children[el.name] = new Input({
      className: this.props.className + "__input",
      id:el.name,
      type:el.type,
      name: el.name,
      value: el.value,
      placeholder: el.placeholder,
      events:{
        'blur':(event:Event)=>{validProcessing(event)},
        'focus':(event:Event)=>{validProcessing(event)},
        'input':(event:Event)=>{validProcessing(event)}
      }
    });

  })

      if (this.props.pageTpl==="login"){
        this.props.pageTpl=FormTplLogin;
    } else if (this.props.pageTpl==="signin") {
      this.props.pageTpl=FormTplSign;      
    } else if (this.props.pageTpl==="profile") {
      this.props.pageTpl=FormPrTplProf;      
    } else if (this.props.pageTpl==="chats") {
      this.props.pageTpl=FormTplChats;
    };    
  }
  
  render() {
    return this.compile(this.props.pageTpl!, this.props)
    }

  componentDidMount(): void {
    console.log("FormMount");
           
  }
}
