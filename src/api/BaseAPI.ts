import HTTPTransport from '../utils/httpTransport';

export default abstract class BaseAPI {
  protected http:HTTPTransport;

  protected constructor(endpoint:string) {
    this.http = new HTTPTransport(endpoint);
  }

    public abstract create?(data:unknown):Promise<unknown>;

    public abstract read?(idintifier?:unknown):Promise<unknown>;

    public abstract update?(idintifier:unknown):Promise<unknown>;

    public abstract delete?(idintifier:unknown):Promise<unknown>;
}
