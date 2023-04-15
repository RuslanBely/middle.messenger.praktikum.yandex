import {Block} from './Block';
import { EventBus } from './EventBus';
import { set } from './helpers';

export enum StoreEvents {
  Updated = 'Updated',
}

export type State = {
  user: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  }
}


class Store extends EventBus {
  private state = {} as State;

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
     
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });
  
        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    }
  }
}

export { store };
