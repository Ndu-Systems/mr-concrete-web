import { SYSTEM_ROLES } from './../../../_shared/roles.enum';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Supplier, UserModel, Placeholder, UserQueryModel } from 'src/app/_models';
import { SupplierService, AccountService, UserService, NotificationService } from 'src/app/_services';
import { ActionButton, Actions } from '../shared/constants/actions';
import { Router } from '@angular/router';
import { PARTNERS_CONSTANTS } from '../shared';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  heading = 'Partners';
  subheading = 'Set up your various partner types';
  partnerActions: Actions[];
  position: string;
  queryUserModel: UserQueryModel;
  suppliers: UserModel[] = [];
  customers: UserModel[] = [];
  customerCount: string;
  roles = SYSTEM_ROLES;
  selectedList: UserModel[];
  actionButton: ActionButton = {
    link: '/dashboard/add-partner',
    label: 'add partner'
  };

  @Output() messages: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  msgs: Message[] = [];
  currentUser: UserModel;

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/supplier.svg',
    message: 'There are no suppliers at the moment',
    link: '/dashboard/add-partner',
    linkLabel: 'Add a supplier'
  };
  constructor(
    private routeTo: Router,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private accountService: AccountService,
    private messageService: NotificationService,

  ) { }

  ngOnInit() {
    this.partnerActions = PARTNERS_CONSTANTS;
    this.currentUser = this.accountService.CurrentUserValue;
    this.queryUserModel = {
      StatusId: '1',
      TypeOfUser: 'All'
    };
    this.userService.getAllUsers(this.queryUserModel).subscribe(data => {
      if (data.length > 0) {
        const partnerList = data;
        partnerList.forEach(item => {
          this.switchPartners(item);
        });
        this.partnerActions[0].count = `${this.customers.length} total customer(s)`;
        this.partnerActions[0].id = '5';
        this.partnerActions[1].count = `${this.suppliers.length} total supplier(s)`;
        this.partnerActions[1].id = '3';
      }
    });
  }

  switchPartners(item: UserModel) {
    switch (item.RoleId) {
      case '3':
        this.suppliers.push(item);
        break;
      case '5':
        this.customers.push(item);
        break;
      default:
        break;
    }
  }


  onSelectAction(event) {
    this.selectedList = [];
    if (event === '3') { this.selectedList = this.suppliers; } else {
      this.selectedList = this.customers;
    }
  }
  updatePartner(supplier: Supplier) {

  }

  archivePartner(supplier: Supplier) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        supplier.StatusId = '2';
        supplier.ModifyUserId = this.currentUser.UserId;
        this.msgs = [{ severity: 'warn', summary: 'Archived', detail: 'Supplier successfully archived.' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Have rejected the archive action' }];
      }
    });
  }



}
