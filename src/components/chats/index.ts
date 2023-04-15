import { ChatItemTpl } from "./ChatItemTpl";
import { Block } from "../../utils/block";
import "./chats.scss"

interface ChatItemProps {
  chats: {
    name: string;
    prev: string;
    time: string;
    messageCount: number; 
  }[];

}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props, 'div');
  }

  init() {
    this.element.classList.add('chats__chats-wrpper');
  }
  
  render() {
    return this.compile(ChatItemTpl, this.props)
    }

  componentDidMount(): void {
    console.log("ChatItemsMount");    
  }
}
