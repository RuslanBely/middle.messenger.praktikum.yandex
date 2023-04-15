import { FormTplModal } from "./FormTplModal";
import { Block } from "../../utils/block";
import { Button } from "../buttons";
import { Input } from "../inputs";


interface FormModalProps {
  className: string;
  submButton?: Record<string, string>;
  pageTpl?:string;
  fileName: string;
  onChange: (e:Event) => void;
  events?:{}
}

 export class FormModal extends Block<FormModalProps> {
  constructor(props: FormModalProps) {
    super(props, "form");
  }

  init() {
    this.element.classList.add(this.props.className)
    this.children.button = new Button({
      label: 'Поменять',
      className: 'modal__submit-button',
      type: 'submit',
    
    });
    
    this.children.input = new Input({
        type: 'file',
        name: 'file',
       events: {
        change: this.props.onChange,
      },
    });

  }
  
  render() {
    return this.compile(FormTplModal, this.props)
    }

  componentDidMount(): void {
    console.log("FormModalMount");
  
    for (const [, value] of Object.entries(this.children)){
      value.dispatchComponentDidMoun()
    }
  }
}

