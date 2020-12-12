# Platen Template

This project provides a temporary transitional template for the adoption of Platen until the theme is properly published as a plugin for Gatsby.

To use this theme, first [create a new project using this template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).
Clone the repository down locally and open the folder in your preferred text editor.

You will want to edit (at least) the following files:

- `gatsby-config.js`: update the `siteMetadata` key to update the name, description, and author of the site
- `content/admin/header-links.mdx` to update any header links and add new links to the `Books` section
- `content/authors` to replace the default author with your own and add any additional team members
- `csv` to add any data files for tables you want to include as automatically-rollable tables;
can do do in subfolders if desired
- `content/books/template` to rename this per your own work, add new chapters in numbered subfolders, update the metadata in `content/books/template.mdx` to reflect your work, and replace `feature.jpg` with the appropriate cover image.
- `content/pages` to update the index, contact, and books files per your own needs and/or add new files/remove some entirely.

## Local Development Workflow

For right now, you'll want to follow [Gatsby's own documentation](https://www.gatsbyjs.com/tutorial/part-zero/) for setting up your development environment - though instead of creating a new site, you'll just run the commands from within the template you cloned down.

## Deploying to Netlify

Luckily, [Netlify also has docs to help us with this step](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/).
