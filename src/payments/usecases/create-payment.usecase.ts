import { Injectable } from "@nestjs/common";
import { BookingsService } from "src/bookings/bookings.service";
import { PaymentRepository } from "../repositories/payment-repository";
import { NotFoundException } from "src/common/errors-handling/custom-exceptions/not-found.exception";
import { Principale } from "src/auth/decorators/current-account.decorator";
import { ForbiddenException } from "src/common/errors-handling/custom-exceptions/forbidden.exception";
import { BookingStatus } from "src/bookings/enums/BookingStatus.enum";
import { BadRequestException } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { PaymentStatus } from "../enums/payment-status.enum";
import { PaymentResponseDto } from "../dtos/payment-response.dto";
import { plainToInstance } from "class-transformer";
import { StripeService } from "../services/stripe.service";
import { ConfigService } from "@nestjs/config";
import { Environment } from "src/common/configration/environment.interface";

@Injectable()

export class CreatePaymentUsecase{
    constructor(
                private readonly bookingsService: BookingsService,
                private readonly paymentRepository:PaymentRepository,
                    private readonly stripeService: StripeService,
                    private readonly configService:ConfigService<Environment>


    ){}

    async excute(bookingId: string,principale: Principale ):Promise<PaymentResponseDto>{
        //1- get booking
       
        const booking= await this.bookingsService.findById(bookingId,principale)
          if(!booking) throw new NotFoundException('booking not found')

            //2- check  the current user is the guest
            // const guestId = (booking.guest as any)._id;
            const guest = booking.guest as any;
            const guestId = guest._id;

            if(guestId.toString() !== principale.user._id.toString()) throw new ForbiddenException('Only the guest can pay for this booking')

          //3-check booking status
          if(booking.status !== BookingStatus.CONFIRMED) throw new BadRequestException('Booking must be confirmed before payment');

          //4- create payment 

       const payment=   await this.paymentRepository.create({
            booking:booking._id,
            guest: guestId.toString(),
            amount:booking.totalAmount,
            status:PaymentStatus.PENDING
          }) 
                  // 5- Create Stripe Checkout Session

          
           const baseUrl=this.configService.getOrThrow<string>('baseUrl')

           const session = await this.stripeService.createCheckoutSession({
            paymentId: payment._id.toString(),
            amount: payment.amount,
            currency: payment.currency,
            guestEmail: guest.email,
            successUrl: `${baseUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${baseUrl}/payments/cancel`,
        });

             if (!session.url) {
                throw new BadRequestException('Failed to create checkout URL');
}
                     // 6- Save Stripe Session ID

              payment.stripeSessionId=session.id
               await payment.save();

                return plainToInstance(PaymentResponseDto,{... payment.toObject(),checkoutUrl:session.url});


            
    }
}