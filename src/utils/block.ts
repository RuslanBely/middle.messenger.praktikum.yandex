import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './eventBus';
import { isEqual } from './helpers';

export class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  private _meta: {tagName: string; props: unknown};

  private eventBus : () => EventBus;

  protected props: P;

  public children: Record<string, Block| Block[]>;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     * @returns {void}
     */
  constructor(propsWithChildren:P, tagName = 'div') {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props: props as P,
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(ChildrenAndProps: P):{props: P, children: Record<string, Block|Block[]>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block| Block[]> = {};

    Object.entries(ChildrenAndProps).forEach(([key, value]) => {
      if (
        Array.isArray(value)
        && value.length > 0
        && value.every((v) => v instanceof Block)
      ) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });
    return { props: props as P, children };
  }

  private _addEvents() {
    const { events = {} } = this.props as P & {events: Record<string, ()=>void>};
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(oldProps:P) {
    const { events = {} } = oldProps;
    if (!events) return;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMoun() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._removeEvents(oldProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return (!isEqual(oldProps, newProps));
  }

  setProps = (nextProps : unknown) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element as HTMLElement;
  }

  private _render() {
    const fragment = this.render();

    this._element!.innerHTML = '';
    this._element!.append(fragment);

    this._addEvents();
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component
          .map((block) => `<div data-id="${block.id}"></div>`)
          .join('\n');
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const tpl = Handlebars.compile(template);

    const html = tpl(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const children = Array.isArray(component) ? component : [component];
      children.forEach((child) => {
        const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
        if (!stub) {
          return;
        }
        child.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(child.getContent()!);
      });
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  public remove() {
    this.getContent()!.remove();
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }

  public show() {
    this.getContent()!.style.display = 'block';
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },

    });
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }
}
