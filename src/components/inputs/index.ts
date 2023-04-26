import { InputTpl } from './InputTpl';
import { Block } from '../../utils/block';
import { withStore, State } from '../../utils/store';

interface InputProps {
    className?:string;
    id?:string;
    type:string;
    name:string;
    placeholder?: string;
    value?:string;
    readonly?: boolean;
    events?:{};
    user:State['user']
}

class InputBase extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props, 'input');
  }

  protected init(): void {
    const input = this.element as HTMLInputElement;
    if (this.props.className) input.classList.add(this.props.className);
    if (this.props.id)input.id = this.props.id;
    if (this.props.type) input.type = this.props.type;
    if (this.props.name) input.name = this.props.name;
    if (this.props.placeholder) input.placeholder = this.props.placeholder;
    if (this.props.value) input.value = this.props.value;
    input.dataset.reported = 'false';
    if (this.props.readonly) input.readOnly = this.props.readonly;
  }

  protected render(): DocumentFragment {
    return this.compile(InputTpl, this.props);
  }

  componentDidMount(): void {
    console.log('InputMount');
    const input = this.element as HTMLInputElement;
    if (input.name === 'login' && this.props.user.login) input.value = this.props.user.login;
    if (input.name === 'email') input.value = this.props.user.email;
    if (input.name === 'first_name') input.value = this.props.user.first_name;
    if (input.name === 'second_name') input.value = this.props.user.second_name;
    if (input.name === 'phone') input.value = this.props.user.phone;
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }));

export const Input = withUser(InputBase as unknown as typeof Block);
