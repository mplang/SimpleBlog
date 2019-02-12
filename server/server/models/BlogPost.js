/**
 * @file
 * BlogPost database schema.
 *
 * @author Michael P. Lang.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: String,
    body: String,
    author: String,
}, { timestamps: true });

// Can probably use the lean option for queries instead,
// since we're not doing anything special, but this
// allows for a bit of flexibility in experimentation.
blogSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        title: this.title,
        body: this.body,
        author: this.author,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

mongoose.model("BlogPost", blogSchema, "blogPosts");
