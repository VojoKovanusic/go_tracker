import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {TaskService} from "@app/_services/task.service";
import {Product, User} from "../../../../generated/model";
import {AuthenticationService} from "@app/_services/authentication.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})

export class TaskListComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, {static: true}) pagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) table: MdbTableDirective

  @HostListener('input') oninput() {
    this.searchItems();
  }

  products: Product[]
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
      console.log(this.products)
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

  edit(product: Product) {
    console.log("prod ", product)
    this.router.navigate([`/editProduct/${product.id}`])
  }

  delete(product: Product) {
    this.service.delete(product).subscribe(data => {
      this.getAll()
    })
  }

  async getAll() {
    this.products = await this.service.getAll().toPromise()
  }

  addProducts() {
    this.router.navigate(['/addProducts'])
  }

  isAdmin() {
    return this.user.role === "ADMIN_ROLE"
  }
}
