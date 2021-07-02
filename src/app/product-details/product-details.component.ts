import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  gameId: String = '';
  gameDetail: any = {};

  constructor(
    public restApi: RestApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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
}
