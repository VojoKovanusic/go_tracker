import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../../models/models";
import {AuthenticationService} from "../../../auth/AuthenticationService";
import {UserService} from "../../../services/UserService";
import {Role} from "../../../auth/role";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, {static: true}) pagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) table: MdbTableDirective

  @HostListener('input') oninput() {
    this.searchItems();
  }

  users: User[]
  previous: any = [];
  searchText: string = '';
  usr: User;

  constructor(private service: UserService, private cdRef: ChangeDetectorRef, private location: Location, private router: Router, private authService: AuthenticationService) {
    this.authService.user.subscribe(u => this.usr=u)
  }

  ngOnInit() {
    this.getAllAll().then(() => {
      this.table.setDataSource(this.users);
      this.users = this.table.getDataSource();
      this.previous = this.table.getDataSource();
    });

  }

  async getAllAll() {
    this.users = await this.service.getAll().toPromise()
  }

  ngAfterViewInit() {
    this.pagination.setMaxVisibleItemsNumberTo(15);
    this.pagination.calculateFirstItemIndex();
    this.pagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.table.getDataSource();
    if (!this.searchText) {
      this.table.setDataSource(this.previous);
      this.users = this.table.getDataSource();
    }
    if (this.searchText) {
      this.users = this.table.searchLocalDataBy(this.searchText);
      this.table.setDataSource(prev);
    }
  }

  back() {
    this.location.back();
  }

  edit(user: User) {
    this.router.navigate([`/editUser/${user.username}`])
  }

  delete(user: User) {
    this.service.delete(user).subscribe(data => {
      this.getAll()
    })
  }

  async getAll() {
    this.users = await this.service.getAll().toPromise()
  }

  addUser() {
    this.router.navigate(['/addUser'])
  }

  isAdmin() {
    console.log("this.usr.role ==", this.usr.role)
    return this.usr.role == "ADMIN_ROLE"
  }

  apropriateUserRole(role: string) {
    if(role==Role.ADMIN_ROLE){
      return "MENAGER"
    }

    if(role==Role.USER_ROLE){
      return "RADNIK"
    }

  }

  getMsisdn(msisdn: string) {
    return '0'+msisdn
  }
}
