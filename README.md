
🍳 Recipe Haven - Share & Discover Delicious Recipes

![Screenshot 2025-04-07 003142](https://github.com/user-attachments/assets/83ad5d66-c4cb-4c78-8e88-7615d9785f7f)


**Live Demo**: [https://recipe-haven-three.vercel.app/](https://recipe-haven-three.vercel.app/)

## 🌟 Features
- **User Authentication**: Secure signup/login with JWT
- **Recipe Management**: Create, read, update, and delete recipes
- **Interactive UI**: Filter recipes by category (Dessert/Vegetarian/Non-Veg)
- **Responsive Design**: Works flawlessly on mobile & desktop
- **Real-time Updates**: MongoDB-backed data persistence

## 🛠️ Tech Stack
| Frontend          | Backend           | Database       | Deployment     |
|-------------------|-------------------|----------------|----------------|
| React.js          | Node.js           | MongoDB Atlas  | Vercel (FE)    |
| Tailwind CSS      | Express.js        |                | Render (BE)    |
| Context API       | JWT Auth          |                |                |

## 🚀 Quick Start
### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account

### Local Development
1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/recipe-haven.git
   cd recipe-haven
   ```

2. **Set up environment variables**  
   Create `.env` in both `/client` and `/server`:
   ```env
   # Client/.env
   REACT_APP_API_URL=http://localhost:5000

   # Server/.env
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/recipeDB
   JWT_SECRET=your_secure_secret
   ```

3. **Install dependencies & run**
   ```bash
   # Frontend
   cd client
   npm install
   npm start

   # Backend (in separate terminal)
   cd ../server
   npm install
   npm run dev
   ```

## 📂 Project Structure
```
recipe-haven/
├── client/           # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/  # Auth state
│       └── pages/
├── server/           # Backend (Node/Express)
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .gitignore
└── README.md
```

## 🔧 Deployment
### Frontend (Vercel)
1. Push changes to GitHub
2. Import project in Vercel
3. Set environment variables

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repo
3. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT=10000`

## 🤝 How to Contribute
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for details.

## 📬 Contact
Project Link: [https://github.com/yourusername/recipe-haven](https://github.com/yourusername/recipe-haven)  
Email: kc893825@gmail.com
```

### Key Improvements:
1. **Visual Hierarchy**: Added emojis and clear section headers
2. **Tech Stack Table**: Better visualization of technologies
3. **Simplified Setup**: Removed redundant installation steps
4. **Deployment Guide**: Specific instructions for Vercel+Render
5. **Professional Structure**: Standard open-source project format
6. **Mobile-Friendly**: Clean markdown that renders well everywhere

Would you like me to:
1. Add a screenshot section with sample images?
2. Include API endpoint documentation?
3. Add a development roadmap?
