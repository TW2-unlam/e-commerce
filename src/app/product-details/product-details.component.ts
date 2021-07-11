import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

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
    private data: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['id'];
    });

    this.loadProduct(this.gameId);
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
  loadProduct(id: String) {
    return this.restApi.getProduct(id).subscribe((data: {}) => {
      this.gameDetail = data;
    });
  }

  addInternalItem(item: any) {
    if (this.isLogged) {
      const result = this.data.addToCart([item]);
      this.showToastNotification('success', result);
    } else {
      this.showToastNotification(
        'info',
        'Necesita estar logueado para agregar productos al carrito'
      );
      this.router.navigate(['/login']);
    }
  }
}
