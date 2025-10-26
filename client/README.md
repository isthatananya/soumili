# 🎉 Pixelated Birthday Surprise Website 🎉

A retro pixel art birthday surprise website filled with interactive elements, games, and sweet memories!

## 🌟 Features

### 🎊 Hero Section
- Pixelated "Happy Birthday" message with typewriter animation
- Floating pixel balloons, stars, and hearts
- Smooth scroll navigation to the next section

### 🧩 Mystery Puzzle Section
- Interactive drag-and-drop jigsaw puzzle
- Reveals a sweet birthday message when solved
- Pixel art styling with smooth animations

### 🎁 Triple Surprise Gateway
Three interactive surprise boxes leading to:

#### 📸 Hall of Memoirs
- Polaroid-style photo gallery
- Click photos to view full-size with descriptions
- Links to Google Drive for full-resolution memories
- Responsive grid layout

#### 🍬 Candy Memory Machine
- Generate random pixel candies to reveal sweet memories
- Each candy contains a precious shared moment
- Progress tracking and collection system
- Animated candy generation and opening

#### 🐣 Easter Egg Hunt Game
- 60-second pixel world exploration game
- Find hidden eggs worth different points
- High score tracking with localStorage
- Responsive game area with decorative elements

### 💌 Message Board
- Write and submit birthday messages
- View all messages from friends and family
- Like system for messages
- Firebase integration (with localStorage fallback)

## 🎨 Design Features

- **Color Palette**: Soft pink (#FFC0CB), hot pink (#FF69B4), pastel lilac (#E7D3FF), baby peach (#FFD6BA)
- **Typography**: Pixel fonts (Press Start 2P, VT323)
- **Animations**: Framer Motion for smooth transitions and interactions
- **Responsive**: Mobile-first design that works on all devices
- **Pixel Art**: Custom CSS for pixel-perfect styling and effects

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔧 Configuration

### Firebase Setup (Optional)
To enable real-time message storage:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Update the configuration in `src/firebase.js` with your Firebase config
4. The app will automatically use Firebase for message storage

If Firebase is not configured, the app will use localStorage as a fallback.

### Customization
- **Photos**: Update the photo data in `src/components/HallOfMemoirs.js`
- **Memories**: Modify the candy memories in `src/components/CandyMemoryMachine.js`
- **Colors**: Adjust the color palette in `tailwind.config.js`
- **Fonts**: Change pixel fonts in the HTML head or Tailwind config

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen orientations

## 🎮 Interactive Elements

- **Drag and Drop**: Puzzle pieces can be dragged to their correct positions
- **Click Interactions**: All buttons and interactive elements have hover and click effects
- **Smooth Scrolling**: Navigation between sections with smooth scroll behavior
- **Game Mechanics**: Easter egg hunt with scoring and timer
- **Form Handling**: Message submission with validation and feedback

## 🎨 Pixel Art Styling

The website uses custom CSS classes for pixel art effects:
- `.pixel-shadow`: Multi-layered shadow effects
- `.pixel-text`: Text with pixel-style shadows
- `.pixel-button`: Interactive button styling
- `.pixel-card`: Card hover effects
- `.pixel-input`: Form input styling

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## 🎉 Usage

1. **Start the Adventure**: Scroll through the hero section
2. **Solve the Puzzle**: Drag puzzle pieces to reveal the first surprise
3. **Choose Your Surprise**: Click on any of the three surprise boxes
4. **Explore Memories**: View photos, generate candy memories, or play the egg hunt
5. **Leave Messages**: Write birthday wishes on the message board
6. **Share the Fun**: Send the link to friends and family!

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **Firebase**: Real-time database (optional)
- **Pixel Fonts**: Press Start 2P, VT323

## 📝 License

This project is created with love for a special birthday celebration! 🎂

---

**Happy Birthday!** 🎉✨🎈