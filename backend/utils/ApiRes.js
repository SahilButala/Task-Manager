export class ApiRes {
  constructor(sucess = false, message = "No message", data = [] || {}) {
    this.message = message;
    this.sucess  =  sucess 
    if (data) this.data = data;
  }
}
