import { Block } from '../../utils/block';
import { pErrTpl } from './errTpl';
import './errStyle.scss';
import { Link } from '../../components/links';
import router  from '../../utils/router';

interface ErrPageProps{
  err:number,
  message:string
}

export class ErrPage extends Block<ErrPageProps> {
  constructor(props: ErrPageProps) {
    super(props, 'div');
  }

  protected init(): void {
    this.children.link = new Link({
      label: 'Назад к чатам',
      className: "p-err__link",
      href: '',
      events: {
        click: (Event:Event) => {
          Event.preventDefault();
          router.go('/messenger');
          }
        },
    });
  }

  render() {
    return this.compile(pErrTpl, this.props);
  }
}
