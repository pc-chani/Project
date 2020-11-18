import { Component, OnInit } from '@angular/core';
import { GmhService } from 'src/app/shared/services/gmh.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { CategoryGMH } from 'src/app/shared/models/CategoryGMH.model';
import { GMH } from 'src/app/shared/models/Gmh.model';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { map, startWith } from 'rxjs/operators';
import getBrowserFingerprint from 'get-browser-fingerprint';

@Component({
  selector: 'app-search-gmh',
  templateUrl: './search-gmh.component.html',
  styleUrls: ['./search-gmh.component.css'],
})
export class SearchGMHComponent implements OnInit {
  searchForm: FormGroup;
  categories: CategoryGMH[];
  masterCategory: CategoryGMH;
  tatC: CategoryGMH;
  tatCategories: CategoryGMH[];
  gmhs: GMH[];
  filteredProducts: Observable<Product[]>;
  products: Array<Product>
  formData;
  currLat;
  currLng;
  adress;
  openGmhDetails;
  constructor(private userService: UserService, private productsService: ProductsService, private router: Router, private gmhService: GmhService) { }
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      textSearch: new FormControl(''),
      category: new FormControl(''),
      tatCategory: new FormControl({ value: '' }),
      location: new FormControl(''),
    });
    this.getCategoryGmh();
    this.productsService.getProducts().subscribe(
      res => {
        this.products = res,
          console.log(res),
          this.filter()
      },
      err => console.log(err),
    );
  }
  filter() {
    this.filteredProducts = this.searchForm.controls.textSearch.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.ProductName),
        map(name => name ? this._filter(name) : this.products.slice())
      );
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.products.filter(c => c.Productname.toLowerCase().indexOf(filterValue) === 0);
  }
  getCategoryGmh() {
    this.gmhService.getCategoryGmach().subscribe(res => {
      this.categories = res;
      console.log(res);
      err => { console.log(err); }
    });
  }
  handleDestinationChange(a: Address) {
    this.adress = a;
    console.log(a)
  }
  getCategoriesForGmach() {
    this.searchForm.controls['tatCategory'].enable();
    console.log(this.searchForm.controls.category.value);
    this.categories.forEach(element => {
      if (element.CategoryName == this.searchForm.controls.category.value)
        this.masterCategory = element;
    });
    this.gmhService.getCategoriesForGmach(this.masterCategory).subscribe(res => {
      this.tatCategories = res;
      console.log(res);
      err => { console.log(err); }
    });
  }
  search() {
    const fingerprint = getBrowserFingerprint();
    console.log(fingerprint);
    this.openGmhDetails = null
    this.formData = new FormData();
    if (this.searchForm.controls.textSearch.value != null)
      this.formData.append('text', this.searchForm.controls.textSearch.value.Productname)
    else this.formData.append('text', "")
    if (this.searchForm.controls.category.value != "")
      this.formData.append('category', this.masterCategory.CategoryCode)
    else this.formData.append('category', 0)
    if (this.searchForm.controls.tatCategory.value.value != "") {
      this.tatCategories.forEach(element => { if (element.CategoryName == this.searchForm.controls.tatCategory.value) this.tatC = element; });
      this.formData.append('tatCategory', this.tatC.CategoryCode)
    }
    else this.formData.append('tatCategory', 0);
    if (this.adress == undefined) {
       this.formData.append('CurrentLocation1', this.currLat); 
       this.formData.append('CurrentLocation2', this.currLng)
       this.formData.append('location', "")
      }
    else {
      this.formData.append('location', this.adress.formatted_address);
      this.formData.append('CurrentLocation1', 0); 
      this.formData.append('CurrentLocation2', 0)
    }
      this.gmhService.search(this.formData).subscribe(res => {
        this.gmhs = res;
        this.gmhs.forEach(e => {
          this.gmhService.getUser(e).subscribe(res => {
            e.User = res;
            err => { console.log(err); }
          });
        });
        console.log(res);
        err => { console.log(err); }
      });
  }
  showGMHS(a) {
    console.log(a);
    this.router.navigate(['/gmh', this.gmhs]);
  }
  displayFn(c: Product): string {
    return c && c.Productname ? c.Productname : '';
  }
}