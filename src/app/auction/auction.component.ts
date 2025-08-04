import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuctionItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentBid: number;
  timeRemaining: string;
}

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  items: AuctionItem[] = [
    {
      id: 1,
      title: 'Vintage Clock',
      description: 'Beautiful antique wall clock.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Vintage+Clock',
      startingPrice: 50,
      currentBid: 75,
      timeRemaining: '02:15:20'
    },
    {
      id: 2,
      title: 'Landscape Painting',
      description: 'Oil painting by a renowned artist.',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Landscape+Painting',
      startingPrice: 200,
      currentBid: 350,
      timeRemaining: '01:05:43'
    }
  ];

  bidAmounts: { [key: number]: number } = {};

  placeBid(item: AuctionItem) {
    const bid = this.bidAmounts[item.id];
    if (!bid || bid <= item.currentBid) {
      alert('Bid must be higher than current bid.');
      return;
    }
    item.currentBid = bid;
    this.bidAmounts[item.id] = 0;
    alert('Your bid has been placed!');
  }
}