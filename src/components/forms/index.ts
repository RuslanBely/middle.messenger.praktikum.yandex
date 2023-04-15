import { FormTplSign } from "./FormTplSign";
import { FormTplLogin } from "./FormTplLogin";
import { FormPrTplProf } from "./FormTplProf";
import { FormTplChats } from "./FormTplLChats";
import { FormPrTplProfPass } from "./FormTplProfPass";
import { Block } from "../../utils/block";
import { Button } from "../buttons";
import { Input } from "../inputs";
import { validProcessing } from "../../utils/validProcessing";
import { Link,LinkProps } from "../links";
import "./st_logSign.scss"
import "./st_profile.scss"
import "./st_chats.scss"
import { withStore } from "../../utils/store";

interface FormProps {
  className: string;
  display?: string;
  inputs: {name:string, type:string, value?:string, placeholder?:string}[];
  inputsPers?: Object[];
  inputsPass?: Object[];  
  submButton: Record<string, string>;
  pageTpl:string;
  linkChange?:LinkProps;
  linkChangePass?:LinkProps;
  linkExit?:LinkProps;
  events?:{}
}

 class FormBase extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props, "form");
  }

  init() {
    if (this.props.className) this.element.classList.add(this.props.className);
    if (this.props.display) this.element.style.display=this.props.display;

    this.children.submButton = new Button({
      label: this.props.submButton.label,
      className: this.props.submButton.className,
      type: this.props.submButton.type,
      name: this.props.submButton.name
    });
    this.children.submButtonPass = new Button({
      label: this.props.submButton.label,
      className: this.props.submButton.className,
      type: this.props.submButton.type,
      name: this.props.submButton.name
    });
    
    if (this.props.linkChange) this.children.linkChange = new Link({...this.props.linkChange})
    if (this.props.linkChangePass)  this.children.linkChangePass = new Link({...this.props.linkChangePass})
    if (this.props.linkExit) this.children.linkExit = new Link({...this.props.linkExit})
    
    this.props.inputs.forEach( el => {
      this.children[el.name] = new Input({
        className: this.props.className + "__input",
        id:el.name,
        type:el.type,
        name: el.name,
        placeholder: el.placeholder,
        events:{
          'blur':(event:Event)=>{validProcessing(event)},
          'focus':(event:Event)=>{validProcessing(event)},
          'input':(event:Event)=>{validProcessing(event)}
        }
      });
    });


  if (this.props.pageTpl==="login"){
        this.props.pageTpl=FormTplLogin;
   } else if (this.props.pageTpl==="signup") {
       this.props.pageTpl=FormTplSign;      
   } else if (this.props.pageTpl==="profile") {
       this.props.pageTpl=FormPrTplProf;      
   } else if (this.props.pageTpl==="profilePass") {
       this.props.pageTpl=FormPrTplProfPass;     
   } else if (this.props.pageTpl==="chats") {
      this.props.pageTpl=FormTplChats;
    };    
  }
  
  render() {
    return this.compile(this.props.pageTpl!, this.props)
    }

  componentDidMount(): void {
    console.log("FormMount");
  
    for (const [, value] of Object.entries(this.children)){
      value.dispatchComponentDidMoun()
    }
      
           
  }
}
 const WithUser = withStore((state) =>({ user: {...state.user} }));

 export const Form = WithUser(FormBase  as unknown as typeof Block);
