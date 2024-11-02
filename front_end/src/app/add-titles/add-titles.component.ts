
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-titles',
  templateUrl: './add-titles.component.html',
  styleUrl: './add-titles.component.css'
})
export class AddTitlesComponent {

  excelData: any[] = [];

  constructor(private http: HttpClient) {}

  // Function to handle file upload and parsing
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      
      // Get the first worksheet
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      
      // Parse the Excel file and convert it to JSON format
      this.excelData = XLSX.utils.sheet_to_json(ws);
      console.log('Parsed Excel data', this.excelData);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // Function to upload the parsed data to the backend (and MongoDB)
  uploadToDatabase() {
    if (this.excelData.length === 0) {
      alert('Please upload an Excel file first.');
      return;
    }

    // Send the parsed data to the backend via POST request
    this.http.post('http://localhost:3000/add_title', this.excelData)
      .subscribe(response => {
        console.log('Data successfully uploaded to MongoDB', response);
        alert('Data uploaded successfully!');
      }, error => {
        console.error('Error uploading data', error);
        alert('Failed to upload data.');
      });
  }
}

