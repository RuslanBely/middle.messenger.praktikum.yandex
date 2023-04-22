import { Block } from './Block';
import { EventBus } from './EventBus';
import { set } from './helpers';
import { InChatsData, InChatsUsers } from '../api/ChatsApi';

export enum StoreEvents {
  Updated = 'Updated',
}

export interface State {
  user: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  },
   chats: InChatsData[],
   selectedChatID:number,
   chatUsers: InChatsUsers[],
   searchedUsers: InChatsUsers[],
   token:string
   messages:{ chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;}[]|[],
}

class Store extends EventBus {
  private state = {
    messages: [],
  } as State;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => (Component: typeof Block) => class WithStore extends Component {
  constructor(props: any) {
    const mappedState = mapStateToProps(store.getState());
    super({ ...props, ...mappedState });

    store.on(StoreEvents.Updated, (newState) => {
      const newMappedState = mapStateToProps(newState);
      this.setProps(newMappedState);
    });
  }
};

export { store };
