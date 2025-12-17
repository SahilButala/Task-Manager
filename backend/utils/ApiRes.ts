export class ApiRes<T = unknown> {
  public sucess : boolean;
  public message: string;
  public data?: T;

  constructor(
    sucess : boolean = false,
    message: string = "No message",
    data?: T
  ) {
    this.sucess  = sucess ;
    this.message = message;

    if (data !== undefined) {
      this.data = data;
    }
  }
}
