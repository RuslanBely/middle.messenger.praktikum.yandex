import { Block } from "./block";

export class Route {
  private _pathname:string;

  private _blockClass: typeof Block;

  private _block: Block|null;

  private _props;

  constructor(pathname:string, view : typeof Block, props: {rootQuery:string}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
      this._block = null;
    }
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props, 'div');
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.getContent();
  }
}

function isEqual(lhs:string, rhs:string) {
  return lhs === rhs;
}

function render(query :string, block: Block) {
  const root = document.querySelector(query);
    root!.append(block.element);
    if (block) block.dispatchComponentDidMoun();
    return root;
}
