import { Schema, model, Types, Document } from 'mongoose';

// user interface
export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount?: number;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match valid email address.'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(this: IUser) {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);
export default User;