import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ModalOptions, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { OtpComponent } from './otp/otp.component';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  form : FormGroup;
  

  constructor(
    private modalctrl: ModalController,
    private auth: AuthService
    //public navCtrl: NavController, public modalCtrl: ModalController
  ) { }

  //openstart() {
  //  let startModal = this.modalCtrl.create(SigninPage).then(modal => {
    //  modal.present({ enableBackdropDismiss: false });
   // })
    
  
  

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null,{
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
  });
  }

  async signIn() {
    try{
      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      console.log(this.form.value);

      const response = await this.auth.signInWithPhoneNumber('+91' + this.form.value.phone);
      console.log(response);

      const options: ModalOptions = {
        component: OtpComponent,
        componentProps: {
          phone: this.form.value.phone
        },
        //for iphone 
        //swipeToClose: true
      };
      const modal = this.modalctrl.create(options);
      //to show the number
      (await modal).present();
      //if want see some data when you dissmiss
      const data: any = (await modal).onWillDismiss();
      console.log(data);
    }catch(e){
      console.log(e);
    }
  } 

}
