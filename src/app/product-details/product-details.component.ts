import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  gameId: String = '';
  gameDetail: any = {};
  isLogged: boolean = false;

  constructor(
    public restApi: RestApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit() {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['id'];
    });

    this.loadProduct(this.gameId);
  }

  // Get game list
  loadProduct(id: String) {
    return this.restApi.getProduct(id).subscribe((data: {}) => {
      this.gameDetail = data;
    });
  }

  addInternalItem(item: any) {
    if (this.isLogged) {
      const result = this.data.addToCart([item]);
      this.data.showToastNotification('success', result);
    } else {
      this.data.showToastNotification(
        'info',
        'Necesita estar logueado para agregar productos al carrito'
      );
      this.router.navigate(['/login']);
    }
  }
}
