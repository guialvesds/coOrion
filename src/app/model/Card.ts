export class Card {
    _id?: string;
    code?: number;
    title?: string;
    tag?: string;
    created_at?: Date;
    delivery_date?: Date;
    user?: String;
    description?: string;
    tasks?: [
      {
        title: {
          type: String,
          require: true,
        },
        created_at: {
          type: Date,
        },
        delivery_date: {
          type: Date,
        }, 
        assingTo:{
          type: String
        }, 
        completed: {
          type: Boolean,
          required: true,
          default: false,
        }, 
      }
    ];
    comments?: [{ comment: string; userName?: string; userId: string; idComment: any; created_At: any}];
    members?: [{ member: string; email: string }];
  }
  