import { Component, OnInit } from '@angular/core';
import { BikeService } from '../services/bike.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  bikes: any[] = [];
  filteredBikes: any[] = [];
  term: string = '';

  constructor(private bikeService: BikeService) {}

  ngOnInit() {
    this.bikeService.getBikes().subscribe((data: any) => {
      this.bikes = data;
      this.filteredBikes = this.bikes; 
    });
  }


  searchBikes() {
    if (this.term.trim() === '') {
      this.filteredBikes = this.bikes;
    } else {
      this.filteredBikes = this.bikes.filter(bike => 
        bike.model.toLowerCase().includes(this.term.toLowerCase()) ||
        bike.color.toLowerCase().includes(this.term.toLowerCase())
      );
    }
  }
}
