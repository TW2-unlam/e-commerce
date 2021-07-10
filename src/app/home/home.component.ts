import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Product: any = [];
  message: string = '';

  constructor(
    public restApi: RestApiService,
    private router: Router,
    private data: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  showToastNotification(type: string, message: string) {
    // Passed to ToastrService.success/error/warning/info/show()
    switch (type) {
      case 'success': {
        this.toastr.success(message, 'Success');
        break;
      }
      case 'error': {
        this.toastr.error(message, 'Error');
        break;
      }
      case 'warning': {
        this.toastr.warning(message, 'Warning');
        break;
      }
      case 'info': {
        this.toastr.info(message, 'Info');
        break;
      }
      case 'show': {
        this.toastr.show(message, 'Info');
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  // Get game list
  loadProducts() {
    return this.restApi.getProducts().subscribe((data: {}) => {
      this.Product = data;
    });
  }

  openProductDetails(id: string): void {
    this.router.navigate(['/productDetails', id]);
  }

  addInternalItem(id: any) {
    const itemIndex = this.Product.findIndex((item: any) => item._id === id);
    const result = this.data.addToCart([this.Product[itemIndex]]);
    this.showToastNotification('success', result);
  }

  onEvent(event: any) {
    event.stopPropagation();
  }
}
