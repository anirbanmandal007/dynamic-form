import { Component, ElementRef } from '@angular/core';
import { AppService } from './app.service';
import { element } from 'protractor';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rows: any;
  deletedRowId: string;
  data: any[];
  addedRowId: any[] = [];

  constructor(
    private _appService: AppService,
    private _el: ElementRef
    ) { }

  ngOnInit() {
    this.getData();
  }

  sortData() {
    this.data = this.data.sort(function (a, b) {
      return a.rowId.localeCompare(b.rowId);
    });
  }

  addRow() {
    let newRowId;
    if( this.data[this.data.length - 1] ){
      newRowId = parseInt(this.data[this.data.length - 1].rowId) + 1 +"";
    } else {
      newRowId = "1";
    }
    this.addedRowId.push(newRowId);
    this.data.push({"id":newRowId, "rowId": newRowId, "colId1": "", "colId2": ""});
    console.log(this.data);
  }

  deleteRow(e:any) {
    this.deletedRowId = e.currentTarget.parentElement.parentElement.getAttribute("rowId");
    this._appService.deleteData(this.deletedRowId).subscribe(data=> {
      Swal.fire('Success!', 'Row has been deleted successfully!', 'success')
      this.getData();
    });
  }

  // updateRowId() {
  //   let updatedData = [];
  //   this.data.forEach(element=> {
  //     if(element.rowId < this.deletedRowId) {
  //       updatedData.push(element);
  //     } else {
  //       element.rowId = (parseInt(element.rowId) - 1) + "";
  //       element.id = (parseInt(element.id) - 1) + "";
  //       updatedData.push(element);
  //     }
  //   });
  //   this.data = updatedData;
  //   console.log(updatedData);
  // }

  updateData(e:any) {
    const rowId = e.currentTarget.parentElement.parentElement.getAttribute("rowId");
    if(e.currentTarget.getAttribute("class").indexOf("column-1") >= 0) {
      this.data.find(x => x.id == rowId).colId1 = e.currentTarget.value;
    }
    if(e.currentTarget.getAttribute("class").indexOf("column-2") >= 0) {
      this.data.find(x => x.id == rowId).colId2 = e.currentTarget.value;
    }
    console.log(this.data);
  }

  getData() {
    this._appService.getData().subscribe(data=> {
      this.data = data;
      this.sortData();
    })
  }

  updateEntry() {

  }

  saveData(e) {
    const rowId = e.currentTarget.parentElement.parentElement.getAttribute("rowId");
    if(this.addedRowId.indexOf(rowId) >= 0) {
      let payLoad = this.data.find(x => x.id == rowId);
      this._appService.addData(payLoad).subscribe(data=> {
        Swal.fire('Success!', 'Your data has been saved successfully!', 'success');
        this.addedRowId.splice(this.addedRowId.indexOf(rowId), 1 );
      });
    } else {
      let payLoad = this.data.find(x => x.id == rowId);
      this._appService.saveData(payLoad, rowId).subscribe(data=> {
        // alert("Your data has been saved successfully!")
        Swal.fire('Success!', 'Your data has been saved successfully!', 'success');
      });
    }
  }
 
  clearAll() {
    this._el.nativeElement.querySelectorAll('.ui-table-tbody input.ui-inputtext').forEach(element=> {
      element.value='';
    })
  }

}