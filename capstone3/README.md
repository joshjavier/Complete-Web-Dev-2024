# Capstone 3: Blog Web App

## Project Description

The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. The application will allow users to create and view blog posts. Posts will not persist between sessions as no database will be used in this version of the application. Styling will be an important aspect of this project to ensure a good user experience.

Example: http://www.paulgraham.com/articles.html

## Deliverables

- One Node project for the function of the website
- Including at least one EJS file for the structure of the website
- Including at least one CSS file for the styling of the website

## Features

1. **Post Creation:** Users should be able to create new posts.
2. **Post Viewing:** The home page should allow the user to view all their posts.
3. **Post Update/Delete:** Users should be edit and delete posts as needed.
4. **Styling:** The application should be well-styled and responsive, ensuring a good user experience on both desktop and mobile devices.

## Technical Requirements

1. **Node.js & Express.js:** The application will be a web server built using Node.js and Express.js. Express.js will handle routing and middleware.
2. **EJS:** EJS will be used as the templating engine to generate dynamic HTML based on the application's state.

## Timeline

### Hour 0: Planning

- Gather content and design ideas, create wireframes and mockups. Plan out how the application will work, which routes might be necessary and which pages need to be made.

### Hour 1:  Setup

- Set up the project repository, initialize the Node.js application, and install necessary dependencies (Express.js, EJS).
- Create the application structure, including routes, views, and static files.
- Set up the Express.js server and define the necessary routes.

### Hour 2-3: Implementing Features

- Implement the post creation feature. This includes creating the form on the home page and handling the form submission in the server.
- Implement the post viewing feature. This includes displaying all the posts on the home page.
- Implement the post edit feature. This includes using a form to load the existing blog post and allowing the user to edit and save the post.
- Implement the delete feature. This allows the user to click a button and remove the post from the home page.
- Test the application to ensure that post creation and viewing are working correctly.

### Hour 4-5: Styling and Polishing

- Style the application. This includes creating a CSS file, linking it to your EJS templates, and writing CSS or using Bootstrap/Flexbox/Grid to style the application.
- Test the application on different devices and browsers to ensure the styling works correctly.
- Fix any bugs or issues that came up during testing.

## Development

Since I'm using a build step for the CSS, I open two terminals when developing: one for the Express server and another to automatically rerun the CSS build step when a CSS file is changed.

```sh
# Run the Express server in dev mode
npm run dev

# Bundle CSS files to public/style.css when a change is detected in the `/css` directory (run this in a another terminal)
npx chokidar-cli "css/**/*.css" -c "npm run build:css"
```

I haven't set up HMR so I need to manually reload the browser to reflect the changes.

## Deployment

This app is deployed using Fly.io and can be accessed at https://capstone3.fly.dev/

Here are the steps for making your own deployment (make sure your machine has `flyctl` installed):

1. Inside the `capstone3` directory, launch a new Fly app but don't deploy yet:

```sh
cd capstone3
fly launch --no-deploy
```

2. Update the Dockerfile and add these lines under `COPY . .`:

```dockerfile
# Bundle CSS
RUN npm run build:css
# Prune dev packages from node_modules
RUN npm prune
```

3. (Optional) Adjust the `NODE_VERSION` in the Dockerfile

```dockerfile
ARG NODE_VERSION=lts-bookworm
```

4. Deploy the app.

```sh
fly deploy
```

## Tools and Acknowledgments

- [DummyJSON](https://dummyjson.com/) for dummy posts
- [Source Serif 4](https://fonts.adobe.com/fonts/source-serif-4) for the typeface
- [Utopia](https://utopia.fyi/) for fluid type and space
- [LightningCSS](https://lightningcss.dev/) for CSS bundling
- [Every Layout](https://every-layout.dev/) utility classes
- [WireFramer Figma library](https://www.figma.com/community/file/1101637212272928503/wireframer-quick-wireframing-library) for wireframing and icons
- "[Wind in the Willows - Vintage Illustration (1908)](https://www.flickr.com/photos/39527581@N07/36956003566)" by [BudCat14/Ross](https://www.flickr.com/photos/39527581@N07) licensed under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/?ref=openverse) for the background image
