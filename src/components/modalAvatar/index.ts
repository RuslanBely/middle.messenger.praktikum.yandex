import { ModalAvatarTpl } from "./ModalAvatarTpl";
import { Block } from "../../utils/block";
import { FormModal } from "../modalForm";
import './modalAvatar.scss'

interface ModalAvatarProps{
  className?:string;
  type?:string;
  events?: {
    click: (e: Event) => void;       
  },
  title: string;
  fileName: string;
  isOpen: boolean;
  onSubmit: (e: Event) => void;
  onChange: (e: Event) => void;
}

export class ModalAvatar  extends Block<ModalAvatarProps>{
  constructor(props: ModalAvatarProps){
    super(props)
  }

  init() {

    console.log(this.props)
    this.children.form = new FormModal({
      className:'modal-form',
      fileName: this.props.fileName,
      onChange: this.props.onChange,
      events: {
        submit: this.props.onSubmit,
      },
    });
  }

  public setFileNamePropsToForm(fileName: string) {
    (this.children.form as FormModal).setProps({ fileName });
  }


  render()  {
    return this.compile(ModalAvatarTpl, this.props);
  }

};
