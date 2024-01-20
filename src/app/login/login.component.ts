import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showPage = 'login'
  public email_id : any
  public pass_word : any
  public new_email : any
  public new_password : any
  public confirm_newpassword : any
  public password_mismatch : any

  public duplicateEmail : boolean =  false
  public incorrect_password : boolean = false
  public password_error : any

  public authToken: string | null = localStorage.getItem('authToken');
  public decodedToken: any;

  constructor(private router : Router, private crudService : CrudService, private toastr : ToastrService) {
    this.showPage = 'login'
    this.password_mismatch = false
    
   }

  ngOnInit(): void {
  }

  navigatetoRegister(){
   this.showPage = 'register'
  }

  backtoLgin(){
    this.showPage = 'login'
  }

  validateEmail(){
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(this.email_id.match(mailformat)){
        return true;
      }
      else{
        alert("Invalid email address.");
        this.email_id=''
        return false;
      }
  }

  validateNewEmail(){
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(this.new_email.match(mailformat)){
      this.crudService.checkEmail({email_id: this.new_email}).subscribe(
        (response:any) => {
          console.log(response)
          if(response.exists === true){
              this.duplicateEmail= true
          }
          else{
            this.duplicateEmail = false
          }
        }
      )
    }
    else{
      alert('Invalid Mail Format')
    }
  }

  checkPassword(){
    this.new_password != this.confirm_newpassword ? this.password_mismatch = true : this.password_mismatch = false
  }

  showPassword(event:any){
    const x : any = document.getElementById("myInput");
    if (event.target.checked) {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  showNewPassword(event:any){
    console.log(event.target.checked)
    const x : any = document.getElementById("newPassword");
    const y : any = document.getElementById("confirmNewPassword")

    if (event.target.checked) {
      x.type = 'text';
      y.type = 'text'
    } else {
      x.type = 'password';
      y.type = 'password';
    }
  }

  login(){
    this.crudService.loginUser({email_id : this.email_id,pwd : this.pass_word}).subscribe(
      (response: any) => {
        this.password_error = response.message
        if (response.message === 'Login successful') {
          
          // Handle successful authentication (e.g., store tokens, navigate to the next page)
          const receivedToken = response.token;
  
          // Store the token in localStorage
          localStorage.setItem('authToken', receivedToken);
          this.router.navigate(['/userlist']);
          this.incorrect_password = false

        }
        else {
          console.log(response.message)
          // Handle login failure
          this.incorrect_password = true;
          this.password_error = response.message; // Display detailed error message
        }
      },
      (error) => {
        // Handle authentication error (e.g., display an error message)
        this.password_error = 'Authentication failed'
      }
    )
    // this.router.navigateByUrl('/userlist');
  }

  signupUser(){
    const data = {email_id : this.new_email, new_password : this.confirm_newpassword}
    if(this.email_id != ''&& this.email_id != undefined ||
    this.new_password != '' && this.new_password != undefined || this.confirm_newpassword != '' && this.confirm_newpassword != undefined && this.password_mismatch){
    
    
      this.crudService.signupUser(data).subscribe(
        (response:any) => {
          this.new_email = '',this.new_password = '', this.confirm_newpassword = ''
          this.toastr.success('User Successfully Registered')
        },
        (error) => {
          // console.error('Error during registration:', error);
          this.toastr.error('Error during registration:', error)
        }
      )
    }

    else{

      alert('Fields must not be empty')

    }
  }

}
