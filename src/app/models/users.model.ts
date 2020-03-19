export interface User {
    id?: string;
    name?: string;
    email?: string;
    picture?: {
      data: {
        url: string
      }
    };
    ship?: boolean;
    vacation?: boolean;
    friends?: {
      data: [
        {
          name: string;
          picture: {
            data: {
              height: number;
              is_silhouette: boolean;
              url: string;
              width: number
            }
          }
          ship?: {
            name: string
          }
          vacation?: boolean
        }
      ]
    };


  }
