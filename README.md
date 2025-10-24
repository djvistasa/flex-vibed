# Flex Assessment - Property Management Dashboard

A modern React application built for The Flex Global, featuring a comprehensive property management dashboard with ratings and listings functionality.

## 🏗️ Architecture Overview

This project follows a **feature-based architecture** pattern, organizing code by business domains rather than technical layers. This approach promotes:

- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: Clear separation of concerns and logical code organization
- **Team Collaboration**: Different teams can work on different features independently
- **Code Reusability**: Common components and utilities are shared across features

### 📁 Project Structure

```
src/
├── common/                 # Shared utilities and components
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom hooks
│   ├── stores/           # Global state management
│   ├── theme/            # Design system and styling
│   └── utils/            # Utility functions
├── features/             # Feature-based modules
│   ├── listings/         # Property listings feature
│   │   ├── components/   # Listing-specific components
│   │   ├── hooks/        # Listing-related hooks
│   │   ├── pages/        # Listing pages
│   │   └── store/        # Listing state management
│   └── ratings/          # Ratings and reviews feature
│       ├── components/   # Rating-specific components
│       ├── hooks/        # Rating-related hooks
│       ├── pages/        # Rating pages
│       └── store/        # Rating state management
└── assets/               # Static assets
```

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Fast build tool and dev server

### **Styling & UI**

- **Styled Components 6.1.19** - CSS-in-JS styling
- **Styled Reset 5.0.0** - CSS reset for consistent styling
- **Custom Design System** - Centralized theme and design tokens

### **State Management**

- **Zustand 5.0.8** - Lightweight state management
- **TanStack Query 5.90.5** - Server state management and caching
- **Local Storage Persistence** - Data persistence across sessions

### **Routing & Navigation**

- **React Router DOM 7.9.4** - Client-side routing

### **Development & Testing**

- **Vitest 1.0.0** - Modern testing framework
- **React Testing Library 16.3.0** - Component testing utilities
- **ESLint 9.36.0** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules

### **Build & Development Tools**

- **Babel Plugin React Compiler** - React optimization
- **Babel Plugin Styled Components** - Styled components optimization
- **Dotenv 17.2.3** - Environment variable management

## 🚀 Key Features

### **Property Listings**

- **Detailed Property Views**: Comprehensive property information with images, amenities, and policies
- **Interactive Booking System**: Date range picker with guest selection
- **Dynamic Amenities System**: Fetches all available amenities and maps them to listings using amenity IDs
- **Property Amenities**: Dynamic amenity display with modal for full list
- **Stay Policies**: Cancellation policies and house rules

### **Ratings & Reviews**

- **Rating Management**: Status-based rating workflow (awaiting, pending, scheduled, submitted, published, expired, completed)
- **Advanced Filtering**: Filter by rating, status, arrival/departure dates
- **Sorting Options**: Multiple sorting criteria with ascending/descending options

### **User Interface**

- **Modern UI Components**: Reusable components with consistent styling
- **Interactive Modals**: Status selection and filtering interfaces
- **Real-time Updates**: Live data updates with optimistic UI

## 🔧 Development Setup

### **Prerequisites**

- Node.js 18.17.0 or higher
- npm or yarn package manager

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd flex-assessment

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🧪 Testing Strategy

The project uses **Vitest** as the primary testing framework, providing:

- **Fast Test Execution**: Significantly faster than Jest
- **Vite Integration**: Seamless integration with the build system
- **Modern Testing APIs**: Latest testing utilities and patterns
- **Comprehensive Coverage**: 96 tests covering components, hooks, and stores

### **Test Structure**

- **Component Tests**: UI component behavior and rendering
- **Hook Tests**: Custom hook functionality and state management
- **Store Tests**: State management and persistence
- **Integration Tests**: Feature-level testing

## 📊 Data Management

### **Mock Data Strategy**

The application uses carefully crafted mock data to demonstrate various scenarios:

- **Realistic Data**: Mock data reflects real-world property management scenarios
- **Error Handling**: Some ratings are intentionally not associated with listings to demonstrate error handling capabilities
- **Edge Cases**: Various data states to test different UI conditions
- **Performance Testing**: Large datasets to test filtering and sorting performance

### **Amenities Architecture**

The amenities system demonstrates a sophisticated data management approach:

- **Centralized Amenities Store**: All available amenities are fetched and stored globally
- **ID-Based Mapping**: Listings contain only amenity IDs, which are mapped to full amenity objects at runtime
- **Efficient Data Flow**: This approach minimizes API calls and ensures consistent amenity data across the application
- **Dynamic Rendering**: Amenities are displayed dynamically based on the listing's amenity IDs

### **State Persistence**

- **Local Storage**: User preferences and filter states persist across sessions
- **Optimistic Updates**: UI updates immediately with rollback on errors
- **Cache Management**: Intelligent caching with TanStack Query

## 🎨 Design System

### **Theme Architecture**

- **Centralized Colors**: Consistent color palette with semantic naming
- **Typography Scale**: Harmonious font sizes and weights
- **Spacing System**: Consistent spacing using rem units
- **Component Variants**: Flexible component styling with props

### **Component Library**

- **Reusable Components**: Card, Modal, Stars, DateRangePicker, etc.
- **Consistent API**: Standardized prop interfaces across components
- **Accessibility**: WCAG compliant components with proper ARIA attributes

## 🔄 Error Handling

The application implements comprehensive error handling:

- **API Error Management**: Graceful handling of network and server errors
- **User Feedback**: Clear error messages and loading states
- **Fallback UI**: Graceful degradation when data is unavailable
- **Error Boundaries**: React error boundaries for component-level error handling

## 📱 Responsive Design

- **Touch-Friendly**: Optimized for touch interactions
- **Performance**: Optimized for various device capabilities

## 🚀 Performance Optimizations

- **Code Splitting**: Feature-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Strategic use of React.memo and useMemo
- **Bundle Optimization**: Tree shaking and dead code elimination

---

**Built with ❤️ for The Flex Global**
