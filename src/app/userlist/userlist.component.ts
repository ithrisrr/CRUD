import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  public user_name : any
  public user_email : any
  public user_role : any
  public selectedId : any

  public userList : any = []
  public editingUser : any; 

  public authToken: string | null = localStorage.getItem('authToken');
  public decodedToken : any

  public email_id : any
  // public access_level : any

  constructor(private crudService : CrudService, private modalService: NgbModal, private router : Router, private toastr : ToastrService) { 

    if (this.authToken) {
      this.decodedToken = jwt_decode(this.authToken);
      this.email_id = this.decodedToken.email; // Adjust the property name based on your token structure
      // this.access_level = this.decodedToken.access_level
    }

    crudService.getuserList().subscribe(
      response => {
         this.userList = response
         console.log(this.userList)
      }
    )
  }

  ngOnInit(): void {
  }

  editUser(user:any){
     // Set the values to the modal input fields
    this.selectedId = user._id
    this.user_name = user.user_name;
    this.user_email = user.user_email;
    this.user_role = user.user_role;

  }

  updateUser(){
   this.crudService.updateUser({id : this.selectedId,user_name : this.user_name, user_email : this.user_email,user_role : this.user_role}).subscribe(
    (response:any) =>{
       this.userList = response
       this.toastr.success('Updated Successfully')
    }
   )
  }

  clearInputs(){
    this.user_name = ''
     this.user_email = ''
     this.user_role = ''
  }

  deleteUser(id:any){
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if(confirmation){
      this.crudService.deleteUser({rowId : id}).subscribe(
        response => this.userList = response
      )
    }
  }

  addUser(){
    this.crudService.addUser({user_name : this.user_name, user_email : this.user_email,user_role : this.user_role}).subscribe(
      (response: any) => {
        console.log(response)
        this.userList = response;
        this.toastr.success('User Added Successfully  ');
        this.clearInputs();
      },
      (error: any) => {
        this.toastr.error('Error adding user');
        console.error('Error adding user:', error);
      }
    )
  }

  closeModal(){
    this.modalService.dismissAll();
    this.user_name,this.user_email,this.user_role = ''

  }

  logout(){
    localStorage.removeItem('authToken')
    this.router.navigate(['/login']);

  }

}
