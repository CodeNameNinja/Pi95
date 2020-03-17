export interface User {
    id: string;
    name: string;
    email: string;
    picture: {
      data: {
        url: string
      }
    };
  
  }
