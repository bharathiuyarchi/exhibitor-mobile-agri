import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';
import { ManageplaneService } from '../manageplane.service';

@Component({
  selector: 'app-plan-views',
  templateUrl: './plan-views.component.html',
  styleUrls: ['./plan-views.component.css']
})
export class PlanViewsComponent {
  constructor(public route: ActivatedRoute, public api: ManageplaneService, public winRef: WindowRefServiceModule, public router: Router) { }
  id: any;
  stream: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.plan;
      this.stream = params.stream;
      this.getPlanDetails(this.id);
    })
  }
  plan_details: any;
  getPlanDetails(id: any) {
    this.api.get_one_plans(id).subscribe((res: any) => {
      console.log(res)
      this.plan_details = res;
    })

  }
  pay_now() {
    this.api.razorpay_paynow(this.plan_details.salesPrice).subscribe((res: any) => {
      this.payWithRazor(res.orderId, 100, '')
    })
  }

  payWithRazor(orderID: any, amount: any, order: any) {
    console.log(amount)
    const options: any = {
      key: 'rzp_test_D0FyQwd0lixiEd',
      amount: this.plan_details.salesPrice * 100,
      currency: 'INR',
      name: '',
      description: '',
      image: '/assets/image/favicon.jpg',
      order_id: orderID,
      modal: {
        escape: false,
      },
      notes: {
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      if (this.stream == null) {
        this.success_payemnt(response)
      }
      else {
        this.success_payemnt_addon(response)

      }
    });
    options.modal.ondismiss = ((res: any) => {
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      // console.log(response)
    })
    rzp.open();
  }


  success_payemnt(res: any) {
    this.api.confirm_order_payment({ PaymentDatails: res, plan: this.id }).subscribe((res: any) => {
      this.router.navigateByUrl('/dashboard/plan')

    })
  }

  success_payemnt_addon(res: any) {
    console.log(res)
    this.api.confirm_order_payment_addon({ PaymentDatails: res, plan: this.id, streamId: this.stream }).subscribe((res: any) => {
      window.location.href = "/dashboard/livestream";

    })
  }
}
