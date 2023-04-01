import { Block } from "../../utils/block";
import { chatsTpl } from './chatsTpl'
import "./chats.scss"
import { ChatItem } from "../../components/chats";
import { Form } from "../../components/forms";
import { validProcessing } from "../../utils/validProcessing";

interface ChatProps {}

export class ChatPage extends Block<ChatProps>{
  constructor(props: ChatProps){
    super('div',props)
  }

init() {
  this.children.chatItem = new ChatItem({
    chats:[
     {name:'Андрей', prev:'Изображение', time:'19:46', messageCount: 5 },
     {name:'Петя', prev:'Смотри, что нашел', time:'11:42', messageCount: 10 },
     ]
  })

  this.children.formChat = new Form({
    className:'chat-form',  
    inputs:[{ name : 'message', type : 'text', placeholder:"Сообщение"}],
    submButton:{
      label: 'Отправить',
      className: 'chat__submit',
      type: 'submit',
      name: 'sendMassage'
     },
     pageTpl:'chats',
     events:{
       'submit':(event:Event)=>{validProcessing(event)}
     }
  })
  
}

protected render(): DocumentFragment {
  return this.compile(chatsTpl, this.props);
}

protected componentDidMount(): void {
  console.log('ChatsMount')
  this.children.chatItem.dispatchComponentDidMoun();
  this.children.formChat.dispatchComponentDidMoun();
  } 
}

