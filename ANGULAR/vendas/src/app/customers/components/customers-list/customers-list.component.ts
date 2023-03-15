import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[] = [];
  @Output() delete: EventEmitter<number> = new EventEmitter(false);
  @Output() edit: EventEmitter<number> = new EventEmitter(false);

  columnsToDisplay = ['id', 'nome', 'cpf', 'telefone', 'email', 'action'];

  dataSource = new MatTableDataSource(this.customers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if (this.customers.length > 0) {
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {}

  deleteClick(id: number) {
    this.delete.emit(id);
  }

  editClick(id: number) {
    this.edit.emit(id);
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
}
