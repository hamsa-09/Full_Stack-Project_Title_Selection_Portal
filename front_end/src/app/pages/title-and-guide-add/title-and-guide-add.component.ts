import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-title-and-guide-add',
  templateUrl: './title-and-guide-add.component.html',
  styleUrls: ['./title-and-guide-add.component.css']
})
export class TitleAndGuideAddComponent implements OnInit {
    titles: any[] = [];
    guides: any[] = [];
    internalTitle: string = '';

    // Add missing properties
    newGuideName: string = '';
    newGuideDepartment: string = '';
    newGuideEmail: string = '';

    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.loadTitles();
      this.loadGuides();
    }

    loadTitles() {
      this.dataService.getTitles().subscribe((data) => {
        this.titles = data;
      });
    }

    loadGuides() {
      this.dataService.getGuides().subscribe((data) => {
        this.guides = data;
      });
    }

    addTitle() {
      if (this.internalTitle.trim()) {
        this.dataService.addTitle({ internalTitle: this.internalTitle }).subscribe(() => {
          this.loadTitles();
          this.internalTitle = '';
        });
      }
    }

    addGuide() {
      if (this.newGuideName.trim() && this.newGuideDepartment.trim() && this.newGuideEmail.trim()) {
        this.dataService
          .addGuide({
            guideName: this.newGuideName,
            department: this.newGuideDepartment,
            email: this.newGuideEmail,
          })
          .subscribe(() => {
            this.loadGuides();
            this.newGuideName = '';
            this.newGuideDepartment = '';
            this.newGuideEmail = '';
          });
      }
    }
    deleteTitle(id: string) {
        this.dataService.deleteTitle(id).subscribe(() => {
          this.loadTitles(); // Refresh the title list after deletion
        });
      }
      deleteGuide(id: string) {
        this.dataService.deleteGuide(id).subscribe(() => {
          this.loadGuides(); // Refresh the guide list after deletion
        });
      }

  }
