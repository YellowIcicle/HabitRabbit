/*
 * message-list.component.ts Copyright (c) 2020 by the MessageRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MessageService} from '../service/message.service';

export interface MessageListItem {
  id: number;
  message: string;
  title: string;
  type: number;
}

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<MessageListItem>;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'message', 'id'];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getAll().subscribe((res) => {
      // @ts-ignore
      this.paginator.length = res.length;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}

