import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @Input() phone;
  isLoading = false;
  otp: string;
  //for 6 digits of otp and you can find more about this in npm
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };
  form: any;

  constructor(
    public modalCtrl:ModalController,
    public loadingctrl: LoadingController,
    public toastctrl: ToastController,
    private auth: AuthService
    ) { }

  ngOnInit() {}

  showLoader(msg){
    if(!this.isLoading)this.isLoading = true;
    return this.loadingctrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() =>{
        if(!this.isLoading){
         res.dismiss().then(() =>{
          console.log('about presenting');
         }) ;
        }
      })
    })
    .catch(e => {
      this.isLoading
      console.log(e);
    })
  }
  hideLoader(){
    if(this.isLoading) this.isLoading = false;
    return this.loadingctrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

  joinOtpArray(otp){
    if(!otp || otp == '') return 0;
    const otpNew = otp.join('');
    return otpNew;
  }
  onOtpChange(event) {
    this.otp = event;
    console.log(this.otp);
  } 
  async resend(){
    try{
      const response = await this.auth.signInWithPhoneNumber('+91' + this.phone);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
  async verifyOtp(){
    try{
      const response = await this.auth.verifyOtp(this.otp);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
  
}
