import { Block } from '../../utils/block';
import { profileTpl } from './profileTpl';
import { Form } from '../../components/forms';
import { validProcessing } from '../../utils/validProcessing';
import arrowImg from "../../static/img/arrov.png";
import avatartImg from "../../static/img/ava.png";
import "./profile.scss";


interface ProfileProps {}

export class ProfilePage extends Block<ProfileProps>{
  constructor(props: ProfileProps){
    super('div',props)
  }

 init(){
  this.props = {
    'arrowImg':arrowImg,
    'avatartImg':avatartImg,
  };

  this.children.formProfile = new Form({
    className:'profile-form',
    inputs: [
      { name : 'email', type : 'email', value : 'pochta@yandex.ru'},
      { name : 'login', type : 'text', value : 'ivanivanov'},
      { name : 'first_name', type : 'text', value : 'Иван'},
      { name : 'second_name', type : 'text', value : 'Иванов'},
      { name : 'display_name', type : 'text', value : 'Иван'},
      { name : 'phone', type : 'phone', value : '7 (909) 967 30 30'},
      { name : 'oldPassword', type : 'password'},
      { name : 'newPassword', type : 'password'},
      { name : 'newPassword2', type : 'password'}   
    ],
    submButton:{
      label: 'Сохранить',
      className: 'profile-form__submit-button',
      type: 'submit',
      name: 'enter'
    },
    pageTpl:'profile',
    events:{
      'submit':(event:Event)=>{validProcessing(event)}
    }
  }
  )
}

render()  {
  return this.compile(profileTpl, this.props);
}

protected componentDidMount(): void {
  console.log('PersMount')
  this.children.formProfile.dispatchComponentDidMoun()
}

}
