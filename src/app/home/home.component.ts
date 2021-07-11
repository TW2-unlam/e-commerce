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
  isLogged: boolean = false;

  constructor(
    public restApi: RestApiService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
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

  addInternalItem(id: any) {
    if (this.isLogged) {
      const itemIndex = this.Product.findIndex((item: any) => item._id === id);
      const result = this.data.addToCart([this.Product[itemIndex]]);
      this.data.showToastNotification('success', result);
    } else {
      this.data.showToastNotification(
        'info',
        'Necesita estar logueado para agregar productos al carrito'
      );
      this.router.navigate(['/login']);
    }
  }

  onEvent(event: any) {
    event.stopPropagation();
  }
}
