import { set } from "./helpers";
import {expect} from 'chai';


describe('util set', () =>  {
    it('should return firt param if it is non-object', () => {
        const result = set(null,'', '123');
        
        expect(result).to.eq(null);
    });

    it('should throw error if path type is not string', () => {
        const func = () => set({},null,'123');

        expect(func).to.throw(Error);
    });

    it('should return the same object as it passed', () => {
        const obj={ a:1, b:2};
        const path = 'a';
        const value = 3

        const result = set(obj,path,value);

        expect(result).to.eq(obj);
    });
});
