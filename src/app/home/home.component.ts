import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

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
    private data: DataService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.data.currentMessage.subscribe((message) => (this.message = message));
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

  // changeMessage() {
  //   this.data.changeMessage('Hola mundo');
  // }

  addInternalItem(id: any) {
    const itemIndex = this.Product.findIndex((item: any) => item._id === id);
    this.data.addToCart([this.Product[itemIndex]]);
  }
}
