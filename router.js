const _ = require('lodash');
const path = require('node:path');
const importDir = require('directory-import');
const server = require('./server');

const schemas = importDir({directoryPath: './schemas'});
const routesDir = "./routes";

importDir({directoryPath: routesDir}, (routeName, routePath, routeMethods)=>{
    // console.log({ routeName, routePath, routeMethods });

    const isModule = path.extname(routePath) === '.js';

    if(!isModule) console.error(`File ${routePath} is not a route`);
    if(_.isObject(routeMethods)) return console.warn('Expected an object in the file ', routePath);

    const cleanUPadPath =  routeName === 'index'
        ? routePath.slice(routesDir.length, routePath - 'index.js'.length)
        : routePath.slice(routesDir.length, routePath - '.js'.length);

    _.forEach(routeMethods, (methodArgs, methodName) => {
        const schema = _.has(schemas, `${routeName}.${methodName}`)
            ? schemas[routeName][methodName]
            : {};

        if(_.isFunction(methodArgs)) server[methodName](cleanUPadPath, { schema }, routeMethods);

        else if(_.isArray) {
            const [options] = methodArgs;

            if (!options.schema) options.schema = schema;

            server[methodName](cleanUPadPath, ...methodArgs);
        }

        else return console.error(`Route ${routePath} has invalid arguments`);

    })

})
