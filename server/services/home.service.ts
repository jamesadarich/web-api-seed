import { Controller, Get } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { Request, Response } from "express";

export enum UserRole {
  This,
  That,
  TheOther
}

export function Authorize(...roles: Array<UserRole>) {
    return (target: any,
                           decoratedPropertyKey: string,
                           descriptor: TypedPropertyDescriptor<(request: Request, response: Response) => any>) => {
    const originalService = descriptor.value;

    descriptor.value = (request: Request, response: Response) => {
      console.log("authorizing...");

      if (new Date().getTime() % 2) {
        response.status(401);

        return "get out of here";
      }

      return originalService.call(target, request, response);
    };
};
}

@injectable()
@Controller('/')
export class HomeService {

  @Get('/')
  @Authorize(UserRole.This)
  public get(): string {
    console.log(this);
    return 'Home sweet home';
  }
}