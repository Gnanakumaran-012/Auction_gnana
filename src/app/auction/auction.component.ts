import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AuctionItem {
  id: number;
  title: string;
  description: string;
  currentBid: number;
  startingPrice: number;
  imageUrl: string;
  endTime: Date;
  totalBids: number;
  category: string;
  seller: string;
}

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  auctionItems: AuctionItem[] = [
    {
      id: 1,
      title: 'Vintage Camera Collection',
      description: 'A rare collection of vintage cameras from the 1950s in excellent condition.',
      currentBid: 1250,
      startingPrice: 500,
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      totalBids: 23,
      category: 'Electronics',
      seller: 'John Doe'
    },
    {
      id: 2,
      title: 'Antique Pocket Watch',
      description: '18k gold pocket watch from the early 1900s with intricate engravings.',
      currentBid: 3500,
      startingPrice: 1500,
      imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      totalBids: 45,
      category: 'Jewelry',
      seller: 'Jane Smith'
    },
    {
      id: 3,
      title: 'First Edition Book Collection',
      description: 'Complete set of first edition Harry Potter books in mint condition.',
      currentBid: 8500,
      startingPrice: 5000,
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      totalBids: 67,
      category: 'Books',
      seller: 'Book Collectors Inc.'
    },
    {
      id: 4,
      title: 'Modern Art Painting',
      description: 'Original abstract oil painting by emerging artist. Canvas size 48x36 inches.',
      currentBid: 2800,
      startingPrice: 1000,
      imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalBids: 19,
      category: 'Art',
      seller: 'Art Gallery Pro'
    },
    {
      id: 5,
      title: 'Vintage Guitar',
      description: '1967 Fender Stratocaster in excellent playing condition with original case.',
      currentBid: 15000,
      startingPrice: 10000,
      imageUrl: 'https://images.unsplash.com/photo-1558098329-a11cff621064?w=400',
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      totalBids: 89,
      category: 'Musical Instruments',
      seller: 'Music Store Ltd.'
    },
    {
      id: 6,
      title: 'Rare Stamp Collection',
      description: 'Collection of rare stamps from around the world, dating from 1850-1950.',
      currentBid: 4200,
      startingPrice: 2000,
      imageUrl: 'https://images.unsplash.com/photo-1622222343884-8cf4f5358560?w=400',
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      totalBids: 34,
      category: 'Collectibles',
      seller: 'Stamp Expert'
    }
  ];

  selectedCategory: string = 'all';
  searchTerm: string = '';
  sortBy: string = 'ending-soon';

  get filteredItems(): AuctionItem[] {
    let filtered = this.auctionItems;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Sort items
    switch (this.sortBy) {
      case 'ending-soon':
        filtered.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case 'most-bids':
        filtered.sort((a, b) => b.totalBids - a.totalBids);
        break;
    }

    return filtered;
  }

  get categories(): string[] {
    const cats = [...new Set(this.auctionItems.map(item => item.category))];
    return ['all', ...cats];
  }

  getTimeRemaining(endTime: Date): string {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  placeBid(item: AuctionItem): void {
    // In a real application, this would open a bid dialog or navigate to bid page
    alert(`Place bid for: ${item.title}`);
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
  }

  onSortChange(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value;
  }
}