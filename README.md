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
- **Google Reviews Integration**: Displays Google reviews alongside internal ratings for enhanced credibility
- **Automatic Place Detection**: Automatically finds Google Places based on listing coordinates when no Place ID is available

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
- **Google Places API Key** (required for Google Reviews functionality)

### **API Requirements**

**Google Places API Key Setup:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - **Places API** (required for place details and nearby search)
   - **Maps JavaScript API** (optional, for enhanced features)
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Add the key to your `.env` file as `VITE_GOOGLE_PLACES_API_KEY=your_api_key_here`

> **Note**: Without a valid Google Places API key, the Google Reviews functionality will show error messages instead of reviews.

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd flex-assessment

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your API keys:
# VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

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
- **Comprehensive Coverage**: 113 tests covering components, hooks, and stores

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

### **Google Reviews Integration**

The Google Reviews system provides external validation and credibility:

> **⚠️ API Key Required**: To use Google Reviews functionality, you need a valid Google Places API key. Add `VITE_GOOGLE_PLACES_API_KEY=your_api_key_here` to your `.env` file. The API key must have the following APIs enabled:
>
> - Places API (for place details and nearby search)
> - Maps JavaScript API (optional, for enhanced features)

- **Google Places API Integration**: Fetches reviews directly from Google Places API using listing place IDs
- **Automatic Place Discovery**: Uses Google Places Nearby Search to find places based on coordinates
- **Coordinate-Based Place ID Resolution**:
  - Uses Google Places Nearby Search API with `location=${lat},${lng}&radius=${radius}&type=lodging`
  - Searches for lodging/accommodation types within specified radius (default 100m)
  - Returns the closest matching Google Place ID for the listing coordinates
  - Falls back gracefully when no Google place is found in the area
- **Smart Fallback Strategy**:
  - If listing has pre-configured `googlePlaceId` → Use direct Google Reviews
  - If no `googlePlaceId` → Automatically discover using coordinates
  - If no place found → Show appropriate "no reviews available" message
- **Caching Strategy**:
  - Reviews cached for 5 minutes (frequent updates)
  - Place IDs cached for 24 hours (rarely change)
- **Error Handling**: Graceful fallback when Google reviews are unavailable or API errors occur
- **Consistent UI**: Google reviews follow the same design patterns as internal reviews for seamless integration

#### **Technical Implementation Details**

**Coordinate-to-Place-ID Process:**

1. **Input**: Listing coordinates (`lat: 53.5403, lng: 8.58936`)
2. **API Call**: `GET https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.5403,8.58936&radius=100&type=lodging&key=${API_KEY}`
3. **Response Processing**:
   - Parse Google Places API response
   - Extract `place_id` from first result
   - Return `null` if no lodging found within radius
4. **Caching**: Store place ID for 24 hours to minimize API calls
5. **Reviews Fetch**: Use discovered place ID to fetch Google reviews

**API Endpoints Used:**

- **Nearby Search**: `/place/nearbysearch/json` - Find places by coordinates
- **Place Details**: `/place/details/json` - Get reviews for specific place ID

**Error Handling:**

- API key validation before requests
- Network error handling with retry logic
- Graceful degradation when no place found
- User-friendly error messages

#### **Code Examples**

**Finding Place ID from Coordinates:**

```typescript
import { useFindGooglePlaceId } from "@common/hooks/useFindGooglePlaceId";

function ListingComponent({ lat, lng }) {
  const {
    data: placeId,
    isLoading,
    error,
  } = useFindGooglePlaceId(lat, lng, 150);

  if (isLoading) return <div>Finding Google place...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!placeId) return <div>No Google place found</div>;

  return <GoogleReviews placeId={placeId} />;
}
```

**Automatic Place Discovery Component:**

```typescript
import { AutoGoogleReviews } from "@common/components/autoGoogleReviews";

function ListingPage({ listing }) {
  return (
    <div>
      {/* Other listing content */}

      {/* Automatically finds and displays Google reviews */}
      <AutoGoogleReviews lat={listing.lat} lng={listing.lng} radius={200} />
    </div>
  );
}
```

**Smart Fallback Strategy:**

```typescript
function ListingReviews({ listing }) {
  return (
    <div>
      {listing.googlePlaceId ? (
        // Use pre-configured place ID
        <GoogleReviews placeId={listing.googlePlaceId} />
      ) : (
        // Auto-discover using coordinates
        <AutoGoogleReviews lat={listing.lat} lng={listing.lng} />
      )}
    </div>
  );
}
```

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
