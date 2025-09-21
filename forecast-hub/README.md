# 🌤️ Forecast Hub - Weather Dashboard

A modern, responsive weather dashboard built with React that provides current weather conditions and 5-day forecasts for any city worldwide. Features dynamic backgrounds, real-time data, and an intuitive user interface.

![Weather Dashboard](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Current Weather Display**: Real-time weather conditions with temperature, humidity, wind speed, and cloud cover
- **5-Day Forecast**: Horizontal scrolling forecast with daily high/low temperatures and weather conditions
- **Dynamic Backgrounds**: Weather-themed backgrounds that change based on current conditions and time of day
- **City Search**: Search for weather information by city name with error handling
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Timezone Support**: Automatic timezone detection and local time display
- **Error Handling**: Graceful error handling with user-friendly notifications
- **Performance Optimized**: Image preloading and memoized calculations for smooth user experience

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and functional components
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for styling

### Libraries & Tools
- **Luxon 3.7.1** - Modern date/time manipulation library
- **tz-lookup 6.1.25** - Timezone lookup from coordinates
- **React Icons 5.5.0** - Popular icon library
- **Axios 1.11.0** - HTTP client for API requests

### Development Tools
- **ESLint 9.33.0** - Code linting and quality assurance
- **TypeScript Types** - Type definitions for better development experience

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd forecast-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage Examples

### Basic Usage

1. **Default View**: The app loads with Lagos, Nigeria as the default location
2. **Search for a City**: Use the search bar to find weather for any city
3. **View Forecast**: Scroll horizontally through the 5-day forecast
4. **Error Handling**: Invalid cities or network issues show user-friendly error messages

### API Integration

The app integrates with OpenWeatherMap API to fetch:
- Current weather conditions
- 5-day weather forecast
- Weather icons and descriptions

### Responsive Design

- **Desktop**: Two-column layout with weather display and details
- **Mobile**: Single-column stacked layout optimized for touch
- **Tablet**: Adaptive layout that adjusts based on screen size

## 🏗️ Project Structure

```
forecast-hub/
├── public/                 # Static assets
│   ├── *.jpg              # Weather background images
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # React components
│   │   ├── WeatherCard.jsx    # Main weather display component
│   │   ├── SearchBar.jsx      # City search input
│   │   ├── Forecast.jsx       # 5-day forecast display
│   │   ├── ErrorMessage.jsx   # Error notification component
│   │   └── fetchWeather.js    # API integration utility
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   ├── App.css            # Application styles
│   └── index.css          # Global styles and Tailwind imports
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Production Build
```bash
npm run build        # Creates optimized build in dist/
npm run preview      # Serves the production build locally
```

## 🌐 API Configuration

### OpenWeatherMap API Setup

1. **Sign up** at [OpenWeatherMap](https://openweathermap.org/api)
2. **Get your API key** from the dashboard
3. **Add to environment variables**:
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key
   ```

### API Endpoints Used

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

## 🎨 Customization

### Adding New Weather Backgrounds

1. Add new background images to the `public/` directory
2. Update the `WEATHER_BACKGROUNDS` constant in `WeatherCard.jsx`:
   ```javascript
   const WEATHER_BACKGROUNDS = {
     clear: { day: "/sunny.jpg", night: "/clearnight.jpg" },
     // Add your new weather condition
     fog: { day: "/fog.jpg", night: "/fog-night.jpg" },
   };
   ```

### Styling Customization

The app uses Tailwind CSS for styling. Key customization points:
- **Colors**: Modify the teal color scheme in component classes
- **Layout**: Adjust responsive breakpoints and spacing
- **Typography**: Customize font sizes and weights

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

### Netlify

1. **Build the project**: `npm run build`
2. **Deploy the `dist/` folder** to Netlify
3. **Set environment variables** in Netlify dashboard

### Manual Deployment

1. **Build the project**: `npm run build`
2. **Upload the `dist/` folder** to your web server
3. **Configure environment variables** on your server

## 🧪 Testing

### Manual Testing Checklist

- [ ] App loads with default Lagos weather
- [ ] City search works for valid cities
- [ ] Error messages appear for invalid cities
- [ ] 5-day forecast displays correctly
- [ ] Responsive design works on mobile/tablet
- [ ] Background images change based on weather
- [ ] Timezone display is accurate

### Browser Compatibility

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and documentation patterns
- Add comprehensive docstrings to new functions
- Include inline comments for complex logic
- Test your changes across different screen sizes
- Ensure all linting passes: `npm run lint`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing the weather API
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Luxon** for date/time manipulation
- **Vite** for the fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Include browser console logs** for debugging

---

**Built with ❤️ using React and modern web technologies**