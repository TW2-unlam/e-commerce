import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Product: any = [];

  constructor(public restApi: RestApiService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
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
}
