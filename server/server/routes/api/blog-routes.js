const mongoose = require("mongoose");
const router = require("express").Router();
const BlogPost = mongoose.model("BlogPost");

// Get post by id.
router.param("id", async function (req, res, next, id) {
    try {
        return BlogPost.findById(id, (err_1, blogpost) => {
            if (err_1) {
                return res.sendStatus(404);
            }
            else if (blogpost) {
                req.blogpost = blogpost;
                return next();
            }
        });
    }
    catch (err) {
        return next(err);
    }
});

// Add a new post.
router.post("/new", function (req, res, next) {
    const body = req.body;
    const newPost = new BlogPost(body);
    return newPost.save()
        .then(() => res.status(200).json({ blogpost: newPost.toJSON() }))
        .catch(next);
});

// Update the specified post.
// TODO: Consider making this a PUT route?
router.post("/update/:id", function (req, res, next) {
    const blogpost = req.blogpost;
    const body = req.body;

    blogpost.title = body.title;
    blogpost.author = body.author;
    blogpost.body = body.body;
    return blogpost.save()
        .then(() => res.status(200).json({ blogpost: blogpost.toJSON() }))
        .catch(next);
});

// Retrieve a list of all blog posts in descending order.
router.get("/", async function (req, res, next) {
    try {
        const blogposts = await BlogPost.find()
            .sort({ createdAt: "descending" });
        return res.json({ blogposts: blogposts.map(blogpost => blogpost.toJSON()) });
    }
    catch (err) {
        return next(err);
    }
});

// Retrieve a blog post by id.
router.get("/:id", function (req, res, next) {
    return res.json({
        blogpost: req.blogpost.toJSON(),
    });
});

module.exports = router;