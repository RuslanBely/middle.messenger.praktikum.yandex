import { expect } from "chai";
import { Link } from ".";

describe('Link component', () => {
    it('should render', ()=>{
        const link = new Link({ label : 'test', href : '',});

        expect(link).exist;
    });

    it('should render label as it passed', ()=>{
        const label = 'login';
        const link= new Link({ label : label, href : '',});

        expect(link.element.textContent!.replace(/[\n\s]/g,'')).to.eq(label);    
    });
});
