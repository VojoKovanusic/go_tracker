import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {User, Task} from "../../../../models/models";
import {TaskService} from "../../../../services/TaskService";
import {AuthenticationService} from "../../../../auth/AuthenticationService";



@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, {static: true}) pagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) table: MdbTableDirective

  @HostListener('input') oninput() {
    this.searchItems();
  }

  products: Task[]
  previous: any = [];
  searchText: string = '';
  user: User;

  constructor(private service: TaskService, private cdRef: ChangeDetectorRef,
              private location: Location, private router: Router, private authService: AuthenticationService) {
    this.authService.user.subscribe(u => this.user = u)
  }

  ngOnInit() {
    this.getAllAll().then(() => {
      this.table.setDataSource(this.products);
      this.products = this.table.getDataSource();
      this.previous = this.table.getDataSource();
    });
  }

  async getAllAll() {
    this.products = await this.service.getAll().toPromise()
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
      this.products = this.table.getDataSource();
    }
    if (this.searchText) {
      this.products = this.table.searchLocalDataBy(this.searchText);
      this.table.setDataSource(prev);
    }
  }

  back() {
    this.location.back();
  }

  edit(product: Task) {
    console.log("prod ", product)
    this.router.navigate([`/editTask/${product.id}`])
  }

  delete(product: Task) {
    this.service.delete(product).subscribe(data => {
      this.getAll()
    })
  }

  async getAll() {
    this.products = await this.service.getAll().toPromise()
  }

  addTasks() {
    this.router.navigate(['/addTasks'])
  }

  isAdmin() {
    return this.user.role === "ADMIN_ROLE"
  }
}
