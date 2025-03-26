class ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data?: T;
  
    constructor(status: "success" | "error", message: string, data?: T) {
      this.status = status;
      this.message = message;
      if (data !== undefined) {
        this.data = data;
      }
    }
  }

export default ApiResponse