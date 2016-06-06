/* jshint esnext: true */
/* jslint node: true */

module.exports = (logger)=> {
    return {
        action: {
            jsonResult: (req,res,data)=> {
                res.status(200).jsonp(data);
            },
            forbiddenResult: (req,res)=> {
                logger.warn('Forbidden at [%s]',req.url);
                res.status(403).jsonp({ message: '403 - Forbidden' });
            },
            notfoundResult: (req,res)=> {
                logger.warn('Error 404 at [%s]',req.url);
                res.status(404).jsonp({ message: '404 - Not found' });
            },
            errorResult: (err,req,res)=> {
                logger.error('Error 500 at [%s] details [%s]',req.url,err);
                res.status(500).jsonp({ message: '500 - Server error' });
            },
            okResult: (req,res)=> {
                res.sendStatus(200);
            }
        },
        string: {
            bodyProcess: (text)=> {
                const regexp = /@[a-z0-9]*/ig;
                const matches = text.match(regexp);
                if(matches) {
                    var result = text;
                    matches.forEach((element)=>{
                    const textref = '<a href="/#/info/'+element.substring(1)+'">'+element+'</a>';
                    result = result.replace(element,textref);
                    });
                    return result;
                }
                else {
                    return text;
                }
            }
        }
    };
};
