import 'reflect-metadata'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function bodyValidator(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) return res.status(422).send('Invalid request')

        for (const key of keys) {
            if (!req.body[key]) {
                return res.status(422).send(`Missing Property: ${key}`)
            }
        }

        next()
    }
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance()
        for (const key in target.prototype) {
            const routeHandler = target.prototype[key]

            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []
            const bodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

            const validator = bodyValidator(bodyProps)

            if (path) router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
        }
    }
}
