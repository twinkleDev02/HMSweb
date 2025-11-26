import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api-service';
import { ApiEndpoints } from '../../../../../shared/constants/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Appointment {
  private api = inject(ApiService);

   getAllAppointment(): Observable<any> {
      return this.api.get(ApiEndpoints.APPOINTMENT.GET);
    }
}
