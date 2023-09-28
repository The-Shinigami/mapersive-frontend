import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import ResponseHandler from 'src/app/shared/model/response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationsService: NotificationsService) { }

   showError(res:ResponseHandler) {
 
    const title = res.payload;
    
    res.errors.forEach((error:string) => {

      this.notificationsService.error(title,error,{
        timeOut:8000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        theClass:"error"
       }) 
    });
   
  }

  showSuccess(res:ResponseHandler) {
    const title = res.payload;
    const details = "";
    this.notificationsService.success(title,details,{
  timeOut:8000,
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true,
  theClass:"error"
 }) 
  }

   formatResponse(response:ResponseHandler) {
    let formattedMessage = '';
  
    if (response.errors && response.errors.length > 0) {
      formattedMessage += '\nErrors:\n';
      response.errors.forEach(error => {
        formattedMessage += `${error}\n\n\n`;
      });
    }
  
    return formattedMessage;
  }

}
