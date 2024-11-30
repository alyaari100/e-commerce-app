import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 999.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['6.7" Display', '256GB Storage', '5G Compatible']
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1499.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68', 
      specifications: ['16GB RAM', '512GB SSD', 'Intel i7']
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['Bluetooth 5.0', '20 Hours Playtime', 'Active Noise Cancelling']
    },
    {
      id: 4,
      name: 'Smartwatch 2.0',
      description: 'Feature-packed smartwatch for health and fitness',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['Heart Rate Monitor', 'GPS', '1 Week Battery Life']
    },
    {
      id: 5,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable buttons',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['16,000 DPI Sensor', 'RGB Lighting', '7 Programmable Buttons']
    },
    {
      id: 6,
      name: '4K Smart TV',
      description: 'Large 4K Ultra HD Smart TV with streaming apps',
      price: 1199.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['65" Display', 'HDR10+', 'Voice Control']
    },
    {
      id: 7,
      name: 'Bluetooth Speaker',
      description: 'Portable speaker with deep bass and clear sound',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['12 Hours Battery Life', 'Waterproof', '360° Sound']
    },
    {
      id: 8,
      name: 'Tablet Pro',
      description: 'Lightweight tablet with high resolution display',
      price: 699.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['10.5" Display', '128GB Storage', '4G LTE']
    },
    {
      id: 9,
      name: 'Wireless Earbuds',
      description: 'Compact wireless earbuds with great sound quality',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['Bluetooth 5.2', 'Noise Isolation', '6 Hours Playtime']
    },
    {
      id: 10,
      name: 'External SSD',
      description: 'Portable high-speed SSD for data transfer',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68',  
      specifications: ['1TB Storage', 'USB-C', 'Shock Resistant']
    }
  ];
  

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}