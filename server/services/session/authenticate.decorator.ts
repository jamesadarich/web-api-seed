import { Request, Response } from "express";

export function Authenticate() {
    return (target: any,
            decoratedPropertyKey: string,
            descriptor: TypedPropertyDescriptor<(request: Request, response: Response) => any>) => {
        const originalService = descriptor.value;

        descriptor.value = (request: Request, response: Response) => {
            console.log("authorizing...");

            if (!request.user) {
                response.status(401);
                return "get out of here";
            }

            return originalService.call(target, request, response);
        };
    };
}