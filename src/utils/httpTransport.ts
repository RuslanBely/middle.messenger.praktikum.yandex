
function queryStringify(data: Record<string,any>) {
   return "?" + Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
}

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
} 

type tOptions = {
    method?: METHODS;
    headers?: Record<string, string>;
    timeout?: number;
    data?: Record<string,any>;
};


export class HTTPTransport {

     
    url:string;
    
       
    public get = (url:string, options = {}) => {
				 
        return this.request(url, {...options, method: METHODS.GET});
        };

    public POST = (url:string, options = {}) => {
			 
        return this.request(url, {...options, method: METHODS.POST, data: {}});
        };
    
    public PUT = (url:string, options = {}) => {
			 
        return this.request(url, {...options, method: METHODS.PUT, data: {}});
        };
    
    public  DELETE = (url:string, options = {}) => {
			 
        return this.request(url, {...options, method: METHODS.DELETE, data: {}});
        };
    
  
    private request = (url:string, options:tOptions) => {
             

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (options.method === "GET" && typeof (options.data) !== 'undefined'){
            const fullUrl = url + queryStringify(options.data)
            xhr.open(options.method, fullUrl);
            } else {
            xhr.open(options.method!, url);   
            }

            xhr.onload = function() {
                resolve(xhr);
                };
        
        
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            
            if (options.method === "GET") {
              xhr.send();
            } else {
              xhr.send(options.data as Document | XMLHttpRequestBodyInit);
            }
        });
            
    }
}
