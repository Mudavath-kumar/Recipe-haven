# Welcome to recipe sharing  project

## Project info

**URL**: https://recipes-sharing-platform.netlify.app/

## How can I edit this code?

There are several ways of editing your application.



**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?



# Recipe Sharing Platform

## Introduction

Welcome to the Recipe Sharing Platform! This web application is designed to bring food enthusiasts together, allowing users to share and discover new recipes. Whether you're a seasoned chef or a culinary novice, this platform offers a vibrant community where you can explore, create, and enjoy a wide variety of dishes.

## Features

- **User Accounts**: Create your own profile to save your favorite recipes and track your cooking journey.
- **Recipe Upload**: Share your cherished recipes with the community, complete with detailed instructions and vibrant images.
- **Search Functionality**: Easily find recipes by ingredients, categories, or dietary preferences.
- **Favorites & Bookmarks**: Save recipes you want to try later and organize them for quick access.
- **Social Interaction**: Follow fellow food lovers, leave comments, and rate recipes to engage with the community.
- **Recipe Management**: Edit or delete your own recipes as needed.

## Technologies Used

- **Frontend**: React.js for a responsive and interactive user interface.
- **Backend**: Node.js to handle server-side operations and API routes.
- **Database**: MongoDB for storing user data and recipes efficiently.
- **Authentication**: JWT (JSON Web Tokens) to securely manage user sessions.
- **Hosting**: Deployed on Heroku for reliable and scalable web hosting.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (preferably the latest LTS version).
- **npm**: Comes bundled with Node.js; used for package management.
- **MongoDB**: Local installation or a cloud-based instance for database operations.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/recipe-sharing-platform.git
   cd recipe-sharing-platform
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up MongoDB**:

   - If using a local MongoDB instance, ensure it's running.
   - Update the database connection string in the environment variables.

4. **Configure Environment Variables**:

   Create a `.env` file in the root directory with the following:

   ```env
   DB_URI=mongodb://localhost:27017/your_database_name
   PORT=3000
   SECRET_KEY=your_secret_key_here
   ```

5. **Run the Application**:

   ```bash
   npm start
   ```

6. **Access the Platform**:

   Open your web browser and navigate to `http://localhost:3000`.

## Usage

### Creating an Account

1. **Sign Up**: Click on the "Sign Up" link and fill in the registration form with your details.
2. **Verify Email**: After registering, check your email for a verification link to activate your account.

### Uploading a Recipe

1. **Login**: Enter your credentials to access your account.
2. **Create Recipe**: Navigate to the "Add Recipe" section.
3. **Fill Details**: Provide the recipe name, ingredients, instructions, and upload an image.
4. **Submit**: Click "Share Recipe" to post it to the community.

### Searching for Recipes

1. **Search Bar**: Use the search bar to find recipes by name, ingredient, or category.
2. **Filters**: Apply filters based on dietary preferences, meal type, or difficulty level.
3. **Browse Categories**: Explore the predefined categories to discover new recipes.

### Managing Your Profile

1. **View Profile**: Click on your profile picture or username to view your profile.
2. **My Recipes**: See a list of all the recipes you've shared.
3. **Favorites**: Access and manage your saved recipes.
4. **Account Settings**: Update your profile information or change your password.

## Contributing

Contributions are welcome! Whether you have ideas for new features, want to report bugs, or wish to improve the documentation, your input is invaluable.

### How to Contribute

1. **Fork the Repository**: Create your own fork of the repository.
2. **Create a Branch**: Develop your changes on a new branch.
3. **Commit Changes**: Make sure to follow commit message guidelines.
4. **Push to the Branch**: Push your changes to your forked repository.
5. **Open a Pull Request**: Request to merge your changes into the main repository.

### Contribution Guidelines

- **Code Style**: Follow the project's established coding conventions.
- **Testing**: Ensure that your changes include appropriate tests.
- **Documentation**: Update documentation to reflect any changes.
- **Sign Off**: Use `git commit -s` to sign off on your commits.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Your feedback is crucial to enhancing the platform. For any inquiries, suggestions, or issues, please reach out to us at [support@recipes.com](mailto:support@recipes.com). You can also open an issue directly in the repository's issue tracker.

---

Thank you for being part of the Recipe Sharing Platform! We look forward to seeing the delicious recipes you'll share and the culinary connections you'll make. Bon appétit! 🍳👨🍳

