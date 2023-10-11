import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Env } from "src/app/environment";
import { ManagepostService } from "../managepost.service";
import { Address } from "ng-google-places-autocomplete";

@Component({
  selector: "app-createpost",
  templateUrl: "./createpost.component.html",
  styleUrls: ["./createpost.component.css"],
})
export class CreatepostComponent implements OnInit {
  baseURL = Env.baseAPi;

  constructor(
    public api: ManagepostService,
    public router: Router,
    public route: ActivatedRoute
  ) { }
  id: any;
  ProductNotFound: any = true;
  ngOnInit(): void {
    this.cet_category();
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      if (this.id != null) {
        this.getpostDetails(this.id);
        this.ProductNotFound = false;
      }
    });
  }

  validator_remove(arr: any, value: any, type: Boolean) {
    console.log(arr)
    arr.forEach((element: any) => {
      this.postForm.get(element).setValue(null)
      if (type) {
        this.postForm.get(element).setErrors({ incorrect: true })
      }
      else {
        this.postForm.get(element).setErrors(null)
      }
    });
  }
  persentage: any = true;
  submited: any = false;
  prewview_post: any = false;
  open_pop() {
    this.submited = true;
    if (this.postForm.get('booking_charge').value == 'Customize') {
      if (this.postForm.get('booking_percentage').value <= 100 && this.postForm.get('booking_percentage').value > 0) {
        this.persentage = true;
      }
      else {
        this.persentage = false;
      }
    }
    if (this.postForm.valid && !this.minLosterr && !this.IncreMentLosterr && this.persentage && !this.price_def) {
      if (this.id == null) {
        this.prewview_post = true;
      }
      else {
        this.create_post();
      }
    }
    else {
      this.prewview_post = false;
    }

  }
  get_object_to_preview(control: any, obj: any, value: any) {

    console.log(value, 9087656789)

  }

  create_post() {
    if (this.postForm.get('booking_charge').value == 'Customize') {
      if (this.postForm.get('booking_percentage').value <= 100 && this.postForm.get('booking_percentage').value > 0) {
        this.persentage = true;
      }
      else {
        this.persentage = false;
      }
    }
    if (this.postForm.valid && !this.minLosterr && !this.IncreMentLosterr && this.persentage && !this.price_def) {
      let formData: any = new FormData();
      let values: any = this.postForm.value;
      Object.entries(values).forEach((entry: any) => {
        const [key, value] = entry;
        console.log(key, value)
        if ((key == 'define_QTY' || key == 'afterStreaming' || key == 'booking_percentage' || key == 'minLots' || key == 'incrementalLots' || key == 'marketPlace' || key == 'offerPrice' || key == 'quantity' || key == 'postLiveStreamingPirce') && value == null) {
          formData.append(key, 0);
        }
        else {
          formData.append(key, value);
        }
      })

      const files: Array<File> = this.selected_image;
      for (let i = 0; i < files.length; i++) {
        formData.append("galleryImages", files[i], files[i]["name"]);
      }
      if (this.id == null) {
        this.api.create_post(formData).subscribe((res: any) => {
          let video = new FormData();
          if (this.selected_video != null) {
            video.append("teaser", this.selected_video);
            this.api.create_post_teaser(video, res._id).subscribe((res: any) => {
              console.log(res);
              this.router.navigateByUrl("/dashboard/post");
            });
          }
          else {
            this.router.navigateByUrl("/dashboard/post");
          }
        });
      } else {
        this.api.update_one_post(this.id, formData).subscribe((res: any) => {
          if (this.selected_video != null) {
            let video = new FormData();
            video.append("teaser", this.selected_video);
            this.api
              .create_post_teaser(video, res._id)
              .subscribe((res: any) => {
                console.log(res);
                this.router.navigateByUrl("/dashboard/post");
              });
          } else {
            this.router.navigateByUrl("/dashboard/post");
          }
        });
      }
    }
  }
  selected_image: any = [];
  selected_image_view: any = [];
  selected_video_view: any;
  selected_video: any;
  maxlimit: any = false;
  change_image(event: any) {
    console.log(event.target.files);
    if (event.target.files.length > 5) {
      this.maxlimit = true;
    } else {
      this.maxlimit = false;
    }
    this.selected_image = [];
    this.selected_image_view = [];
    if (event.target.files.length != 0 && !this.maxlimit) {
      var filesAmount = event.target.files.length;
      let element: any = event.target.files;
      for (let i = 0; i < filesAmount; i++) {
        if (
          element[i].type == "image/png" ||
          element[i].type == "image/jpg" ||
          element[i].type == "image/jpeg" ||
          element[i].type == "image/webp"
        ) {
          this.selected_image.push(element[i]);
          const filereader = new FileReader();
          filereader.onload = (e: any) => {
            this.selected_image_view.push(e.target.result);
          };
          filereader.readAsDataURL(element[i]);
        } else {
          this.selected_image = [];
          this.selected_image_view = [];
        }
      }
    }
  }
  change_video(event: any) {
    console.log(event.target.files);
    this.selected_video = null;
    if (event.target.files.length != 0) {
      if (event.target.files[0].type == "video/mp4") {
        console.log(event.target.files[0].size)
        let limit = 40 * 1024 * 1024;
        if (event.target.files[0].size < limit) {
          console.log(true)

          this.selected_video = event.target.files[0];
          const filereader = new FileReader();
          filereader.onload = (e: any) => {
            this.selected_video_view = e.target.result;
          };

          filereader.readAsDataURL(this.selected_video);
        }
        else {
          this.selected_video_view = null;
          this.selected_video = "Video Limmit 40mb Only"
        }
      } else {
        this.selected_video_view = null;
        this.selected_video = "invalid video Format";
      }
    }
  }

  removeImageshop(url: any, index: any) {
    this.selected_image.splice(index, 1);
    this.selected_image_view = this.selected_image_view.filter(
      (img: any) => img != url
    );
    if (this.selected_image_view.length == 0) {
      this.selected_image = [];
    }
    console.log(this.selected_image);
  }
  remove_video() {
    this.selected_video = null;
    this.selected_video_view = null;
  }

  category_list: any;
  cet_category() {
    this.api.get_categorys().subscribe((res: any) => {
      console.log(res);
      this.category_list = res;
    });
  }
  change_cate(event: any) {
    this.get_products(event.target.value);
  }
  previous: any;
  autofill_post() {
    if (this.previous != null) {
      this.postForm.patchValue({
        // quantity: this.previous.quantity,
        marketPlace: this.previous.marketPlace,
        offerPrice: this.previous.offerPrice,
        postLiveStreamingPirce: this.previous.postLiveStreamingPirce,
        minLots: this.previous.minLots,
        incrementalLots: this.previous.incrementalLots,
        discription: this.previous.discription,
        afterStreaming: this.previous.afterStreaming,
        bookingAmount: this.previous.bookingAmount,
        unit: this.previous.unit,
        transaction: this.previous.transaction,
        pack_discription: this.previous.pack_discription,
        // dispatchPincode: this.previous.dispatchPincode,
        define_QTY: this.previous.define_QTY,
        define_UNIT: this.previous.define_UNIT,
        booking_charge: this.previous.booking_charge,
        booking_percentage: this.previous.booking_percentage,
        old_post: this.previous._id,
        old_accept: true,
        dispatchLocation: this.previous.dispatchLocation,
        latitude: this.previous.latitude,
        longitude: this.previous.longitude,
        max_purchase_value: this.previous.max_purchase_value,
        purchase_limit: this.previous.purchase_limit,
        pruductreturnble: this.previous.pruductreturnble,
        return_policy: this.previous.return_policy
      })
    }
    this.autofill_popup = false;
    this.oldDetails = this.previous;
  }
  already_exist_product: any = false;
  open_new_pop() {
    this.submited = true;
    if (this.postForm.get('booking_charge').value == 'Customize') {
      if (this.postForm.get('booking_percentage').value <= 100 && this.postForm.get('booking_percentage').value > 0) {
        this.persentage = true;
      }
      else {
        this.persentage = false;
      }
    }
    if (this.postForm.valid && !this.minLosterr && !this.IncreMentLosterr && this.persentage && !this.price_def) {
      if (this.id == null) {
        if (this.oldDetails != null) {
          console.log("adsasad")
          if (this.oldDetails.quantity == this.postForm.get('quantity').value && this.oldDetails.unit == this.postForm.get('unit').value) {
            this.already_exist_product = true;
          }
          else {
            this.prewview_post = true;
          }
        }
        else {
          this.create_post();
        }
      }
      else {
        this.create_post();
      }
    }
    else {
      this.already_exist_product = false;
    }
  }
  select_product(event: any) {
    this.api.get_old_post(event.target.value).subscribe((res: any) => {
      console.log(res)
      this.previous = res;
      this.postForm.patchValue({
        old_post: null,
        old_accept: false,
      })
      this.oldDetails = null;
      if (res != null) {
        this.autofill_popup = true;
      }
    })
  }
  productList: any;
  get_products(id: any) {
    this.api.get_product_by_cat(id).subscribe((res: any) => {
      this.productList = res;
      console.log(res);
    });
  }
  postForm: any = new FormGroup({
    // product Type
    productId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),

    // product details
    quantity: new FormControl(null, Validators.required),
    unit: new FormControl(null, Validators.required),
    define_QTY: new FormControl(null, Validators.required),
    define_UNIT: new FormControl(null, Validators.required),
    // dispatchPincode: new FormControl(null, Validators.required),
    pack_discription: new FormControl(null, Validators.required),
    // transactions
    transaction: new FormControl(null, Validators.required),
    marketPlace: new FormControl(null, Validators.required),
    offerPrice: new FormControl(null, Validators.required),
    postLiveStreamingPirce: new FormControl(null, Validators.required),
    minLots: new FormControl(null, Validators.required),
    incrementalLots: new FormControl(null, Validators.required),
    discription: new FormControl(null, Validators.required),
    afterStreaming: new FormControl(null, Validators.required),
    bookingAmount: new FormControl(null, Validators.required),
    booking_charge: new FormControl(null, Validators.required),
    booking_percentage: new FormControl(null, Validators.required),
    old_post: new FormControl(null),
    old_accept: new FormControl(false),
    dispatchLocation: new FormControl(null, Validators.required),
    purchase_limit: new FormControl(null, Validators.required),
    max_purchase_value: new FormControl(null, Validators.required),
    pruductreturnble: new FormControl(null, Validators.required),
    return_policy: new FormControl(null, Validators.required),
    latitude: new FormControl(null),
    longitude: new FormControl(null),
  });
  oldDetails: any;

  getpostDetails(id: any) {
    this.api.get_one_post(id).subscribe((res: any) => {
      this.get_products(res.categoryId);
      this.oldDetails = res;
      this.postForm.patchValue({
        productId: res.productId,
        categoryId: res.categoryId,
        quantity: res.quantity,
        marketPlace: res.marketPlace,
        offerPrice: res.offerPrice,
        postLiveStreamingPirce: res.postLiveStreamingPirce,
        minLots: res.minLots,
        incrementalLots: res.incrementalLots,
        // location: res.location,
        discription: res.discription,
        afterStreaming: res.afterStreaming,
        bookingAmount: res.bookingAmount,
        unit: res.unit,
        transaction: res.transaction,
        pack_discription: res.pack_discription,
        // dispatchPincode: res.dispatchPincode,
        define_QTY: res.define_QTY,
        define_UNIT: res.define_UNIT,
        booking_charge: res.booking_charge,
        booking_percentage: res.booking_percentage,
        dispatchLocation: res.dispatchLocation,
        latitude: res.latitude,
        longitude: res.longitude,
        max_purchase_value: res.max_purchase_value,
        purchase_limit: res.purchase_limit,
        pruductreturnble: res.pruductreturnble,
        return_policy: res.return_policy
      });
      this.minLost = this.postForm.get("minLots").value;
      this.IncLost = this.postForm.get("incrementalLots").value;
      this.Qty = this.postForm.get("quantity").value;
      if (this.postForm.get("afterStreaming")?.value == "yes") {
        this.postForm
          .get("postLiveStreamingPirce")
          ?.setErrors({ incorrect: true });
      } else {
        this.postForm.get("postLiveStreamingPirce")?.setErrors(null);
      }
    });
  }
  onPaste(event: ClipboardEvent, element: any, key: any) {
    let clipboardData: any = event.clipboardData || window.Clipboard;
    let pastedText = clipboardData.getData('text');
    this.postForm.get(key).setValue(this.postForm.get(key).valid ? this.postForm.get(key).value.substring(0, 250) : '')
  }
  afterStreaming(event: any) {
    let value = event.target.value;
    this.postForm.get("postLiveStreamingPirce")?.setValue(null);
    if (value == "yes") {
      this.postForm
        .get("postLiveStreamingPirce")
        ?.setErrors({ incorrect: true });
    }

    else {
      this.postForm.get("postLiveStreamingPirce")?.setErrors(null);
    }
  }
  maxlengths(element: any, maxvalue: any, key: any) {
    var q = element.target.value.length + 1;
    element.target.value = element.target.value.substring(0, 250);
    this.postForm.get(key).setValue(this.postForm.get(key).valid ? this.postForm.get(key).value.substring(0, 250) : '')
    if (q > maxvalue) {

      return false;
    } else {
      return true;
    }
  }
  latitude: any;
  longtitude: any;
  zoom: any = 2;
  handleAddressChange(address: Address) {
    const myAddres = address.formatted_address;
    this.postForm.patchValue({
      dispatchLocation: myAddres
    })
    const latitude = address.geometry.location.lat();
    const longtitude = address.geometry.location.lng();
    this.zoom = 12
    this.postForm.patchValue({
      latitude: latitude,
      longitude: longtitude
    })
  }
  draggEnded(event: any) {
    // getAddress
    const latitude = event.latLng.lat()
    const longtitude = event.latLng.lng();
    this.api.getAddress(latitude, longtitude).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.postForm.patchValue({
          dispatchLocation: res[0].formatted_address,
          latitude: latitude,
          longitude: longtitude
        })
      }
    })
  }
  options: any = {
    componentRestrictions: { country: 'IN' }
  }
  // customer Add Product
  addPopup: any = false;
  enablePopup() {
    this.addPopup = true;
  }
  autofill_popup: any = false;
  disablePopup() {
    this.autofill_popup = false;
    this.addPopup = false;
    this.AddProductForm.reset();
    this.productSubmit = false;
    this.prewview_post = false;
    this.already_exist_product = false;
  }

  AddProductForm: any = new FormGroup({
    category: new FormControl(null, Validators.required),
    subcategory: new FormControl(null),
    productName: new FormControl(null, Validators.required),
    brandName: new FormControl(null),
  });

  productSubmit: any = false;
  submitProduct() {
    this.productSubmit = true;
    if (this.AddProductForm.valid) {
      this.api
        .customerRequestProduct(this.AddProductForm.value)
        .subscribe((e: any) => {
          this.disablePopup();
        });
    }
  }

  Qty: any;
  minLost: any;
  IncLost: any;
  minLosterr: any = false;
  IncreMentLosterr: any = false;

  price_def: any = false;

  change_qty(event: any, type: any) {
    console.log(56789, event.target.value)
    let quantity = this.postForm.get('quantity').value;
    let minlot = this.postForm.get('minLots').value;
    let incrementalLot = this.postForm.get('incrementalLots').value;
    let offerPrice = this.postForm.get('offerPrice').value;
    let marketPlace = this.postForm.get('marketPlace').value;
    console.log(type, event.target.value)
    if (type == 'quantity') {
      quantity = event.target.value;
    }
    if (type == 'minLots') {
      minlot = event.target.value;
    }
    if (type == 'incrementalLots') {
      incrementalLot = event.target.value;
    }
    if (type == 'offerPrice') {
      offerPrice = event.target.value;
    }
    if (type == 'marketPlace') {
      marketPlace = event.target.value;
    }
    quantity = quantity == null || quantity == '' ? 0 : parseInt(quantity)
    minlot = minlot == null || minlot == '' ? 0 : parseInt(minlot)
    incrementalLot = incrementalLot == null || incrementalLot == '' ? 0 : parseInt(incrementalLot)
    offerPrice = offerPrice == null || offerPrice == '' ? 0 : parseInt(offerPrice)
    marketPlace = marketPlace == null || marketPlace == '' ? 0 : parseInt(marketPlace)
    if (quantity < minlot) {
      this.minLosterr = true;
    }
    else {
      this.minLosterr = false;
    }
    if (quantity - minlot < incrementalLot && !this.minLosterr) {
      this.IncreMentLosterr = true;
    }
    else {
      this.IncreMentLosterr = false;
    }

    if (offerPrice > marketPlace) {
      this.price_def = true
    }
    else {
      this.price_def = false;
    }
    console.log(quantity, minlot, incrementalLot)
  }

  // qtyChange(event: any) {
  //   // console.log(event.target.value);
  //   // this.Qty = parseInt(event.target.value);
  // }

  // minLostChange(event: any) {
  //   if (this.ProductNotFound) {
  //     let val = parseInt(event.target.value);
  //     if (val > this.Qty) {
  //       this.minLosterr = true;
  //     } else {
  //       this.minLost = val;
  //       this.minLosterr = false;
  //     }
  //   } else {
  //     let val = this.postForm.get("minLots").value;
  //     // this.minLost = this.postForm.get("minLots").value;
  //     // this.IncLost = this.postForm.get("incrementalLots").value;
  //     console.log(val, this.Qty);
  //     if (val > this.Qty) {
  //       this.minLosterr = true;
  //       console.log(val, "else");
  //     } else {
  //       this.minLost = val;
  //       this.minLosterr = false;
  //     }
  //   }
  // }

  // IncreMentLost(event: any) {
  //   let val = parseInt(event.target.value);
  //   let equalChwck = this.minLost === this.Qty;
  //   console.log(equalChwck);
  //   if (equalChwck || val > this.minLost) {
  //     this.IncreMentLosterr = true;
  //     console.log(this.minLost, "min lost");
  //   } else {
  //     this.IncreMentLosterr = false;
  //     if (this.minLost <= val) {
  //       this.IncLost = val;
  //       console.log("new cont");
  //       this.IncreMentLosterr = false;
  //     }
  //   }
  //   if (!val) {
  //     this.IncreMentLosterr = false;
  //     console.log("null");
  //   }
  // }
}







@Pipe({
  name: 'get_value'
})
export class get_obj_value implements PipeTransform {
  transform(value: any, array: any, find: any, key: any): any {
    if (array != null) {
      let index = array.findIndex((a: any) => a[key] == value);
      if (index != -1) {
        return array[index][find]
      }
    }
    return "";
  }
}




@Pipe({
  name: 'discount'
})
export class discount_calculate implements PipeTransform {
  transform(marketprice: any, salesprice: any): any {

    marketprice = marketprice == null ? 0 : marketprice
    salesprice = salesprice == null ? 0 : salesprice

    let dif = (marketprice - salesprice) * 100;
    return Math.round(dif / marketprice) + "%";

    // return "";
  }
}

