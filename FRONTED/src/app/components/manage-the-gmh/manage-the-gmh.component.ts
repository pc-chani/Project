import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { GmhService } from 'src/app/shared/services/gmh.service';
import { User } from 'src/app/shared/models/User.model';
import { UserService } from 'src/app/shared/services/user.service';
import { GMH } from 'src/app/shared/models/Gmh.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-the-gmh',
  templateUrl: './manage-the-gmh.component.html',
  styleUrls: ['./manage-the-gmh.component.css']
})
export class ManageTheGMHComponent implements OnInit {
  currentUser: User
  myGmhim: GMH[]
  currentgmh: GMH = undefined
  open: boolean = false;
  newgmh = false;
  gmhForm: FormGroup;
  constructor(private gmhService: GmhService, private userService: UserService) { }

  ngOnInit(): void {
    this.gmhForm = new FormGroup({
      GmhName: new FormControl(),
      Categories: new FormControl(),
      commits: new FormControl()
    })
    this.currentUser = this.userService.CurrentUser;
    this.getMyGmhim()
    console.log(this.myGmhim)
  }
  getMyGmhim() {
    this.gmhService.getMyGmhim(this.userService.CurrentUser).subscribe(
      res => {
        this.gmhService.setMyGmhim(res); this.myGmhim = res;
        this.myGmhim.forEach(g =>
          this.gmhService.getUser(g).subscribe(
            res => g.User = res
          ))
        console.log(res);
      },
      err => { console.log(err); }

    )
  }
  delete(gmh) {
    this.gmhService.delete(gmh).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
  close() {
    this.open = false;
  }
  edit(g) {
    this.open = true
    this.currentgmh = g;
  }
  saveChange() {
    this.open = false
    this.gmhService.saveChange(this.currentgmh).subscribe(
      res => console.log(res)
    )
  }
  new(){
    this.newgmh=true;
  }
  addGmh() {
    let g = new GMH();
    g.GmhName=this.gmhForm.controls.GmhName.value;
    g.Adress=this.currentUser.Adress;
    g.CategoryName=this.gmhForm.controls.Categories.value;
    g.CategoryCode=5;
    g.Phone=this.currentUser.Phone;
    g.e_mail=this.currentUser.E_mail;
    g.UserCode=this.currentUser.UserCode;
    g.commits=this.gmhForm.controls.commits.value;
    this.gmhService.add(g).subscribe(
      res=>console.log(res)
      
    )
  }
}