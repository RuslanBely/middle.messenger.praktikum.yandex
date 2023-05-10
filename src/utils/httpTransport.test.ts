
import HTTPTransport from "./httpTransport";
import sinon from 'sinon'
import { expect } from "chai";

describe('HTTPTransport class', () =>{

    const requests :sinon.SinonFakeXMLHttpRequest[]=[];
    const XHR = sinon.useFakeXMLHttpRequest();

    //@ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = function(xhr) {
        requests.push(xhr)
    }

    afterEach(()=>{
        requests.length=0;
    })

    it('should call xhr with GET method', () =>{
        const transport = new HTTPTransport('/auth');

        transport.get();

        expect(requests[0].method).to.eq('Get');
    
    })

    it('should call xhr with POST method', () =>{
        const transport = new HTTPTransport('/auth');

        transport.post('/signin', {a:'a'});

        expect(requests[0].method).to.eq('Post');
    })

    it('should call xhr with PUT method', () =>{
        const transport = new HTTPTransport('/chats/');

        transport.put('/users', { users:[], chatId:0});

        expect(requests[0].method).to.eq('Put');
    })

    it('should call xhr with DELETE method', () =>{
        const transport = new HTTPTransport('/chats/');

        transport.delete('/users', { users:[], chatId:0});

        expect(requests[0].method).to.eq('Delete');
    })

})
