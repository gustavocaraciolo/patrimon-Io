import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { endOfDay, endOfMonth, format, getDaysInMonth, isSameDay, isSameMonth, parseISO, startOfDay, startOfMonth } from 'date-fns';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Account } from '../../core/user/account.model';
import { AccountService } from '../../core/auth/account.service';
import { APagarService } from 'app/entities/a-pagar/a-pagar.service';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#008000',
    secondary: '#C3FDB8',
  },
};

@Component({
  selector: 'jhi-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['page-one.component.scss'],
})
export class PageOneComponent implements OnInit, OnDestroy {
  modalRef!: NgbModalRef;
  isCollapsed = true;

  view = 'month';

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  eventSubscriber!: Subscription;

  actions: CalendarEventAction[] = [
    {
      label: '✏️',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('edit', event);
      },
    },
    {
      label: '❌',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('delete', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  account$?: Observable<Account | null>;

  constructor(
    private accountService: AccountService,
    private aPagar: APagarService,
    private router: Router,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.account$ = this.accountService.identity();
    this.populateCalendar();
    this.registerForChanges();
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSubscriber);
  }

  registerForChanges(): void {
    this.eventSubscriber = this.eventManager.subscribe('pointsListModification', () => this.reset());
    this.eventSubscriber = this.eventManager.subscribe('bloodPressureListModification', () => this.reset());
    this.eventSubscriber = this.eventManager.subscribe('weightListModification', () => this.reset());
  }

  reset(): void {
    this.events = [];
    this.populateCalendar();
  }

  viewDateChanged(): void {
    this.reset();
  }

  populateCalendar(): void {
    const monthEnd = endOfMonth(this.viewDate);
    const month = format(monthEnd, 'yyyy-MM');

    this.aPagar.byMonth(month).subscribe((response: any) => {
      response.body.aPagars.forEach(item => {
        const value = item.valor;
        this.events.push({
          start: startOfDay(parseISO(item.dtVencimento)),
          end: endOfDay(parseISO(item.dtVencimento)),
          title: 'A Pagar',
          color: colors.green,
          draggable: false,
          actions: this.actions,
          meta: {
            id: item.id,
            entity: 'aPagars',
            value,
            notes: item.moeda ? item.moeda : '',
          },
        });
      });
      this.refresh.next();
    });
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      cell['dayPoints'] = cell.events.filter(e => e.meta['entity'] === 'aPagars');
      cell['weekPoints'] = cell.events.filter(e => e.meta['entity'] === 'totalPoints');
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
        // if no events, clicking on day brings up add points
        if (events.length === 0) {
          this.router.navigateByUrl('/points/new?date=' + format(date, 'yyyy-MM-dd'));
        }
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    action = action === 'Clicked' ? 'edit' : action;
    this.modalData = { event, action };
    let url = this.router.createUrlTree(['/', { outlets: { popup: event.meta.entity + '/' + event.meta.id + '/' + action } }]);
    if (action === 'edit') {
      url = this.router.createUrlTree(['/' + event.meta.entity, event.meta.id, 'edit']);
    }
    this.router.navigateByUrl(url.toString());
  }
}
