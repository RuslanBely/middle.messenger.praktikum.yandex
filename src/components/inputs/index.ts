import { InputTpl } from "./InputTpl";
import { Block } from "../../utils/block";

interface InputProps {
    className:string;
    id:string;
    type:string;
    name:string;
    placeholder?: string;
    value?:string;
    events?:{};
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps){
        super('input', props)
    }

    protected init(): void {
        const input =this.element as HTMLInputElement
        input.classList.add(this.props.className);
        input.id=this.props.id
        input.type=this.props.type
        input.name=this.props.name
        if (this.props.value) input.value=this.props.value
        if (this.props.placeholder) input.placeholder=this.props.placeholder
        input.dataset.reported="false"
    }

    protected render(): DocumentFragment {
        return this.compile(InputTpl, this.props)
    }

}
