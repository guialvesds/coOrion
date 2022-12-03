export class Card {
    id?: string;
    code?: number;
    title?: string;
    list?: string;
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
    comments?: [{ text: string; username?: string }];
    members?: [{ username: string; email: string }];
  }
  