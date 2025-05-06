import { Schema, model, Types, Document } from 'mongoose';

// reaction interface
interface IReaction {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date | string;
}

//thought interface
export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date | string;
    username: string;
    reactions: IReaction[];
    reactionCount?: number;
}

// date formatter
const formatDate = (timestamp: Date): string =>
    timestamp.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });


const reactionSchema = new Schema<IReaction> (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        _id: false,
        toJSON: { getters: true },
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;