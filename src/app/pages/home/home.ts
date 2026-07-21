import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router,RouterLink,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductCard } from '../../pages/product-list/components/product-card/product-card';
import { ProductService } from '../../shared/services/products-services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

  private router = inject(Router);
  private productService = inject(ProductService);

  products = this.productService.products;

  featured = computed(() => this.products().slice(0, 8));


 
  readonly categories = [
  {
    key: 'electronics',
    label: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'
  },
  {
    key: 'jewelery',
    label: 'Jewellery',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'
  },
  {
    key: "men's clothing",
    label: "Men's Fashion",
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600'
  },
  {
    key: "women's clothing",
    label: "Women's Fashion",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600'
  },
  {
    key: 'kids',
    label: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600'
  }
];

  stats = [
    { value: '500+', label: 'Products' },
    { value: '12K+', label: 'Happy Customers' },
    { value: '5', label: 'Categories' },
    { value: '$50', label: 'Free Shipping Over' }
  ];

  services = [
    {
      title: 'Free Shipping',
      desc: 'On all orders over $50'
    },
    {
      title: 'Secure Payment',
      desc: '100% encrypted transactions'
    },
    {
      title: 'Best Price',
      desc: 'Price match guarantee'
    }
  ];

  navigate(url: string) {
    this.router.navigate([url]);
  }

}