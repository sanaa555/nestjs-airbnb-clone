import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Environment } from "src/common/configration/environment.interface";
import  Stripe  from "stripe";


@Injectable()
export class StripeService {

    private stripe :Stripe

    constructor(
    private readonly configService:ConfigService<Environment>
    ){
        const secretKey=this.configService.getOrThrow('stripeSecretKey')
            // stripe client
            this.stripe=new Stripe(secretKey)
    }

    async createCheckoutSession(payment:{
            paymentId: string;
            amount:number;
            currency:string;
           successUrl: string;
           cancelUrl: string;
           guestEmail:string;
    }):Promise<Stripe.Checkout.Session>{

        const session = await this.stripe.checkout.sessions.create({
            mode:'payment',
            line_items:[
                {
                    price_data: {
                     
                        currency:payment.currency.toLowerCase(),
                        unit_amount:Math.round(payment.amount*100),
                         product_data: {
                          name: 'Airbnb Booking Payment'
                    },
                   },
                   quantity:1

                }
            ],
            success_url: payment.successUrl,
            cancel_url: payment.cancelUrl,
            customer_email:payment.guestEmail,
            client_reference_id:payment.paymentId,
            metadata:{
                paymentId:payment.paymentId
            }
        })

            return session;


    }

    constructWebhookEvent(
    payload: Buffer,
    signature: string,
): Stripe.Event {
    const webhookSecret = this.configService.getOrThrow<string>('stripeWebhookSecret');
     
        return this.stripe.webhooks.constructEvent(payload,signature, webhookSecret);

      }
     
    
}

     

