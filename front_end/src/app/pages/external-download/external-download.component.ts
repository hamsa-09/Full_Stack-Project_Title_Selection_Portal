import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-external-download',
  templateUrl: './external-download.component.html',
  styleUrl: './external-download.component.css'
})
export class ExternalDownloadComponent implements OnInit {
  approvedData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApprovedData();
  }

  fetchApprovedData(): void {
    this.http.get<any[]>('http://localhost:9000/project/approvedExternal').subscribe(
      (data) => {
        this.approvedData = data;
        console.log('Approved submissions:', data); // Log to check data
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching approved submissions:', error);
      }
    );
  }

  downloadData(): void {
    // Prepare the data with only the required fields
    const filteredData = this.approvedData.map((item, index) => ({
        'S.no': index + 1,
        'Team Size': item.teamSize,
        'Cluster': item.cluster,
        'Team Name': item.teamName,
        'Guide': item.guideName,
        'Leader Name': item.leaderName,
        'Roll no 1': item.leaderRoll,
        'Email 1': item.email1,
        'Dept 1': item.department1,
        'Member 2': item.member2Name,
        'Roll no 2': item.member2Roll,
        'Email 2': item.email2,
        'Dept 2': item.department2,
        'Member 3': item.member3Name,
        'Roll no 3': item.member3Roll,
        'Email 3': item.email3,
        'Dept 3': item.department3,
        'Type': item.type,
        'Status': item.status
    }));

    // Convert the filtered data to a worksheet and save as an Excel file
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'ApprovedSubmissions.xlsx');
}
}
