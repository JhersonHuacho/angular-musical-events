import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Concert } from '../shared/models/concert.model';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailService } from './services/event-detail.service';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { VoucherDialogComponent } from '../shared/components/voucher-dialog/voucher-dialog.component';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    SimpleHeaderComponent,
    FooterComponent,
    EventCardComponent,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  eventId = '';
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  eventDetailService = inject(EventDetailService);
  matDialog = inject(MatDialog);
  authService = inject(AuthService);

  data$ = new Observable<Concert>();

  concertData: Concert | undefined;

  notifications = inject(NotificationsService);

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.data$ = this.eventDetailService.getData(this.eventId).pipe(
      map((response) => {
        console.log("EventDetailComponent => this.data$", response.data);
        this.concertData = response.data;
        return response.data;
      })
    );
    console.log('EventDetailComponent => ngOnInit()', this.concertData, new Date());
  }

  openDialog() {
    if (!this.authService.loggedIn()) {
      this.notifications.warn(
        'Inicia sesión',
        'Debes iniciar sesión para comprar entradas'
      );
      this.router.navigate(['/login']);
      return;
    }
    if (this.authService.isAdministrator()) {
      this.notifications.warn(
        'No autorizado',
        'No puedes comprar entradas siendo administrador'
      );
      return;
    }
    const buyDialogRef = this.matDialog.open(BuyDialogComponent, {
      data: this.concertData,
    });
    buyDialogRef.afterClosed().subscribe((saleId) => {
      if (saleId) {
        this.notifications.success('Compra exitosa!', 'Voucher generado');
        const voucherDialogRef = this.matDialog.open(VoucherDialogComponent, {
          data: { saleId },
        });
        voucherDialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      }
    });
  }
}
