import { Block } from "../../utils/block";
import { pErrTpl } from './errTpl'
import "./errStyle.scss"

interface ErrPageProps{
  err:number,
  message:string
}

export class ErrPage extends Block<ErrPageProps>{
  constructor(props: ErrPageProps) {
    super (props, 'div')
  }

   render() {
    return this.compile(pErrTpl, this.props);
  }

}
