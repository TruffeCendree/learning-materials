import { Component } from '@angular/core';
import { PostalAddress } from '../../shared/postal-address-input/postal-address-input.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  postalAddress: PostalAddress | null = null
}
