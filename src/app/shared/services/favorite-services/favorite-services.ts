import { Injectable, inject, signal,PLATFORM_ID } from '@angular/core';
import { ICart } from '../../interface/product.interface';
import { IProduct } from '../../interface/product.interface';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class FavoriteServices{
    favorite=signal<IProduct[]>([]);
    private platformId = inject(PLATFORM_ID);

    constructor(
      private auth:AuthService,
    ){
        if(isPlatformBrowser(this.platformId)){
          const key =this.getCartKey();
          if(key){
            const savedFavorite=localStorage.getItem('favorite');

                if(savedFavorite){
                    this.favorite.set(JSON.parse(savedFavorite))
                }
            }
          }
    }
    private getCartKey(){

    const user = this.auth.getuser();

    return user 
      ? `cart_${user.id}`
      : null;

  }
    toggleFavorite(product:IProduct){

        const exists = this.favorite()
        .some(item => item.id === product.id);

        if(exists){
        this.favorite.update(items =>
            items.filter(item => item.id !== product.id)
        );
        }
        else{
        this.favorite.update(items => [
            ...items,
            product
        ]);
        }
        this.save();

    }

    removeFromfavorite(id:number){
     this.favorite.update(items =>
        items.filter(item=>item.id !== id));
        this.save();
    }

    clearfavorite(){
      this.favorite.set([]);
      this.save();
    }

    private save(){
      if(isPlatformBrowser(this.platformId)){
        const key=this.getCartKey();
        if(key){
              localStorage.setItem(
                  'favorite',
                  JSON.stringify(this.favorite())
            );
        }
      }
    }

    removeFavorite(id:number){

      this.favorite.update(items =>
        items.filter(item => item.id !== id)
      );

      this.save();

    }
  
    isFavorite(id:number): boolean {
    return this.favorite()
    .some(item => item.id === id);
    }


}