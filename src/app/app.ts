import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuctionComponent } from './auction/auction.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuctionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Auction');
}
