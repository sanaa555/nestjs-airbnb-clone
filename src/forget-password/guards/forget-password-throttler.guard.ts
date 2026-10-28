import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { TooManyRequestsException } from "src/common/errors-handling/custom-exceptions/too-many-requests.exception";

@Injectable()
export class ForgetPasswordThrottlerGuard extends ThrottlerGuard{


   protected async getTracker( req: Record<string, any>):Promise<string>{

    const email=req.body?.email
        if (typeof email === 'string' && email.trim()) {
      return email.trim().toLowerCase();
    }
     
    return req.ip?? 'unknown-ip'
   }

     protected async throwThrottlingException(
    context: ExecutionContext,
  ): Promise<void> {
    throw new TooManyRequestsException(
      'Too many OTP requests. Please try again later.',
    );

  }
}