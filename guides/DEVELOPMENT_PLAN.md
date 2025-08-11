# ViRa's Lobby - Hobbies Portal Development Plan

## 📋 Project Overview

**ViRa's Lobby** is a comprehensive hobbies management portal built with React, designed to catalog and showcase personal interests across 8 different hobby categories. It serves as a personal digital library for books, movies, anime, travel experiences, and creative works.

### 🎯 Core Objectives
- Personal hobby management across 8 distinct categories
- Rich media support with optimized image handling
- Multi-theme responsive design (Formal Light, Formal Dark, Fun Pastel)
- Advanced search, filtering, and export capabilities
- Seamless integration with existing ViRa Verse infrastructure
- Guest access with owner/super admin permissions

---

## 🔧 Technical Specifications

### **Frontend Stack**
- **Framework**: React 18 with Vite
- **Routing**: React Router v6 with deep linking
- **State Management**: Redux Toolkit + React Hooks
- **Styling**: Pure CSS with CSS Modules (no external frameworks)
- **Icons**: VS Code Codicons exclusively
- **Animations**: Framer Motion + WebGL for 3D effects
- **Responsive**: Mobile-first design (≤480px, ≤768px, ≤1024px, >1024px)

### **Backend & Services**
- **Database**: Supabase PostgreSQL (shared with ViRa Verse)
- **Authentication**: Supabase Auth (existing users table)
- **File Storage**: Cloudinary (organized by hobby category)
- **Image Processing**: Cloudinary transformations with optimization

### **Development Rules**
- No inline CSS or static HTML content
- All content externalized in language.json
- Component-based architecture (atoms/molecules/organisms)
- Three-theme support implemented from start
- Fully responsive design across all breakpoints

---

## 👥 User Types & Permissions

### **Owner (vickyram.vira@gmail.com)**
- Full CRUD access to all personal hobby records
- Export and bulk upload capabilities
- Private data management

### **Super Admin (vigneshuramu@gmail.com)**  
- Read/write access to all users' records
- System administration capabilities
- Full data oversight

### **Guest Users**
- Read-only access to owner's public hobby records
- No CRUD operations
- Limited browsing and viewing

---

## 🗃️ Database Schema

### **Hobby Categories & Tables**

#### **1. Bookworm (Books)**
```sql
CREATE TABLE bookworm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  series VARCHAR(255),
  authors TEXT[], -- Array of author names
  genres TEXT[], -- Array of genre tags
  language VARCHAR(100),
  start_date VARCHAR(7), -- MM/YY format
  end_date VARCHAR(7), -- MM/YY format
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  read_download_link VARCHAR(500),
  pricing VARCHAR(20) CHECK (pricing IN ('Free', 'Paid')),
  cover_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **2. Bingescape (Web Series)**
```sql
CREATE TABLE bingescape (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  description TEXT,
  season VARCHAR(50),
  genres TEXT[],
  language VARCHAR(100),
  start_date VARCHAR(7),
  end_date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **3. Film Frenzy (Movies)**
```sql
CREATE TABLE film_frenzy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  part VARCHAR(100),
  genres TEXT[],
  language VARCHAR(100),
  date VARCHAR(7),
  imdb_rating DECIMAL(3,1),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **4. Otaku Hub (Anime)**
```sql
CREATE TABLE otaku_hub (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  season VARCHAR(50),
  genres TEXT[],
  language VARCHAR(100),
  start_date VARCHAR(7),
  end_date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **5. Wanderlog (Travel)**
```sql
CREATE TABLE wanderlog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  area VARCHAR(255),
  attractions TEXT[], -- Array of attraction tags
  highlight TEXT,
  date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  photos_link VARCHAR(500),
  sample_images TEXT[], -- Array of image URLs
  cover_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **6. Scribbles (Doodles & Sketches)**
```sql
CREATE TABLE scribbles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **7. Shutter Tales (Photography)**
```sql
CREATE TABLE shutter_tales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  location VARCHAR(255),
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **8. Spot Light (Personal Portfolio)**
```sql
CREATE TABLE spot_light (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  location VARCHAR(255),
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🏗️ Application Structure

### **Page Hierarchy**
```
/                     → Dashboard with hero banner + hobby tiles
/login               → Cosmic-themed authentication
/bookworm            → Books management
/bingescape          → Web series management
/film-frenzy         → Movies management
/otaku-hub           → Anime management
/wanderlog           → Travel experiences
/scribbles           → Doodles & sketches (grid only)
/shutter-tales       → Photography (grid only)
/spot-light          → Portfolio photos (grid only)
```

### **Component Architecture**
```
src/
├── components/
│   ├── atoms/           → Button, Icon, Input, etc.
│   ├── molecules/       → SearchBar, ThemeToggle, Card, etc.
│   ├── organisms/       → Header, Sidebar, DataGrid, Modal, etc.
│   └── layouts/         → AuthLayout, MainLayout
├── pages/               → Route components for each hobby
├── hooks/               → useAuth, useTheme, useHobby
├── utils/               → API client, helpers
├── constants/           → API endpoints, themes, language
├── styles/              → CSS modules for themes
└── features/            → Redux slices for state management
```

---

## 🎨 UI/UX Requirements

### **Theme System**
1. **Formal Light**: White/beige backgrounds with gold accents and geometric patterns
2. **Formal Dark**: Black/dark grey backgrounds with gold accents and linear patterns  
3. **Fun Pastel**: Watercolor/marble textures in purple-pink hues

### **Header (Edge-to-Edge)**
- **Left**: ViRa's Lobby logo
- **Right**: Home icon, Theme switcher, Profile icon
- Minimal and clean design

### **Sidebar Navigation**
- **Left-aligned vertical navigation**
- Icons when idle, expand to full menu on hover
- **Items**: Dashboard + 8 hobby categories
- Smooth animations with Framer Motion

### **Dashboard Page**
- **Hero Banner**: 
  - Welcome title and description
  - 3D cosmic background with WebGL effects
  - Subtle parallax on mouse movement
- **Hobby Tiles**: 
  - Grid layout with statistics (total count, top genres)
  - Clicking navigates to specific hobby page
  - Theme-appropriate styling

### **Login Page**
- **Cosmic Design**: Space/mountain landscape with aurora effects
- **3D Elements**: Floating particles and depth effects
- **Social Icons**: Facebook, Google, Twitter (top right)
- **Form**: Email/password with "Remember Me" checkbox
- **Guest Access**: "Don't have an account? Sign in as Guest"

### **Hobby Pages Layout**
- **Search Bar**: Advanced single-input search with filters
- **Action Bar**: Add button (+), Sort options, Export, Bulk upload
- **View Toggle**: Grid/List view (except image-focused hobbies)
- **Content Area**: Cards or table based on view mode

### **Modal Systems**
- **Add/Edit Modal**: Form with all fields + image upload
- **View Modal**: Read-only detailed view with action buttons
- **Delete Confirmation**: Simple confirm/cancel dialog
- **Bulk Upload**: CSV/Excel/JSON import with validation

---

## 📱 Responsive Design

### **Breakpoints**
- **≤480px**: Mobile phones (single column, compact cards)
- **≤768px**: Tablets (2-3 columns, touch-friendly)
- **≤1024px**: Small desktops (3-4 columns)
- **>1024px**: Large desktops (4+ columns, full features)

### **Responsive Features**
- Collapsible sidebar on mobile
- Adaptive grid layouts
- Touch-friendly modal sizes
- Horizontal scrolling for table views
- Optimized image loading

---

## 🖼️ Image Management Strategy

### **Cloudinary Organization**
- **Folder Structure**: `/vira_lobby/{hobby_category}/`
  - `/vira_lobby/bookworm/`
  - `/vira_lobby/bingescape/`
  - `/vira_lobby/wanderlog/`
  - etc.

### **Optimization Strategy**

#### **Media-Focused Hobbies (Bookworm, Bingescape, Film Frenzy, Otaku Hub)**
- **Thumbnails**: `w_200,h_300,c_fill,f_auto,q_auto` (~10-15KB)
- **Medium**: `w_400,h_600,c_fill,f_auto,q_auto` (~30-50KB)
- **Delete Original**: After creating optimized versions
- **Usage**: Thumbnails for cards, medium for modals

#### **Image-Focused Hobbies (Wanderlog, Scribbles, Shutter Tales, Spot Light)**
- **Thumbnails**: `w_300,h_300,c_fill,f_auto,q_auto` (~15-25KB)
- **Display**: `w_800,h_800,c_limit,f_auto,q_auto` (~100-200KB)
- **High Quality**: `w_1920,h_1920,c_limit,f_auto,q_80` (<10MB)
- **Keep Originals**: High-quality versions preserved
- **Usage**: Thumbnails for grid, display for modal, high-quality for download

### **Upload Flow**
1. User selects image in modal
2. Frontend sends to Supabase Edge Function
3. Edge Function uploads to Cloudinary with transformations
4. Returns optimized URLs to frontend
5. URLs stored in database

---

## 🔐 Authentication & Security

### **Authentication Flow**
- **Shared Auth**: Uses existing ViRa Verse Supabase Auth
- **User Table**: Shared with ViRa Verse (no new user table)
- **Login Options**: Email/password or Guest access
- **Session Management**: Persistent login state
- **JWT Integration**: Ready for embedded app support (future)

### **Row Level Security (RLS)**
- **Owner Access**: Full CRUD on own records
- **Super Admin**: Read/write access to all records  
- **Guest Access**: Read-only on owner's public data
- **Policies**: Inherit from ViRa Verse pattern

---

## ⚙️ Feature Specifications

### **Core Features**

#### **CRUD Operations**
- **Create**: Modal forms with validation and image upload
- **Read**: Grid/List views with search and filter
- **Update**: Pre-populated edit modals
- **Delete**: Confirmation dialogs with cascade cleanup

#### **Advanced Search**
- **Single Input**: Smart search across all relevant fields
- **Real-time Filtering**: Client-side for performance
- **Field-specific**: Title, genre, author, year, rating filters
- **Case-insensitive**: Flexible matching

#### **Data Management**
- **Export to Excel**: Filtered results with all columns
- **Bulk Upload**: CSV/Excel/JSON with validation
- **Sort Options**: Any field, ascending/descending
- **Pagination**: If record count exceeds threshold

#### **View Modes**
- **Grid View**: Card-based layout (all hobbies)
- **List View**: Table format (except image-focused hobbies)
- **Gallery Mode**: Large image tiles (image-focused hobbies only)

### **Hobby-Specific Features**

#### **Bookworm**
- Book-like card design with cover prominence
- Series grouping and author filtering
- Reading status and rating system

#### **Bingescape & Film Frenzy & Otaku Hub**
- Poster-dominant layouts
- IMDB rating display (manual entry for now)
- Season/episode tracking

#### **Wanderlog**
- Cover image backgrounds with location overlays
- Multi-image gallery in secondary modal
- Attraction tags and highlight text

#### **Scribbles & Shutter Tales & Spot Light**
- **Grid View Only**: No list/table modes
- Large image tiles with hover effects
- Portfolio-style presentation
- High-quality image preservation

---

## 🎬 Animation & Visual Effects

### **3D & WebGL Effects**
- **Dashboard Hero**: Cosmic particle system with mouse tracking
- **Login Page**: Aurora effects and floating mountain landscape
- **Background Elements**: Subtle depth and parallax

### **Framer Motion Integration**
- **Page Transitions**: Smooth route changes
- **Modal Animations**: Enter/exit with spring physics
- **Card Interactions**: Hover states and micro-animations
- **Sidebar**: Expand/collapse animations
- **Theme Switching**: Smooth color transitions

### **Performance Considerations**
- **Lazy Loading**: Images and heavy animations
- **GPU Acceleration**: CSS transforms for smooth 60fps
- **Reduced Motion**: Respect user preferences
- **Progressive Enhancement**: Fallbacks for older devices

---

## 📊 Dashboard Statistics

### **Hobby Tile Metrics**
- **Total Count**: Number of entries in each category
- **Top Genres**: Most common 2-3 genre tags
- **Recent Activity**: Latest additions or updates
- **Completion Rate**: For time-based hobbies (books, series)
- **Average Rating**: Star rating average

### **Visual Design**
- **Minimal Information**: Avoid overcrowding
- **Icon-based**: Genre icons and status indicators
- **Color Coding**: Theme-appropriate accent colors
- **Hover Effects**: Additional details on interaction

---

## 🔄 Development Action Plan

### **Phase 1: Foundation & Infrastructure (Week 1)**
**Goals**: Set up project structure, theme system, and core components

**Tasks:**
1. **Project Setup**
   - Initialize Vite + React project
   - Configure Redux Toolkit store
   - Set up React Router v6 with routes
   - Install dependencies (Framer Motion, etc.)

2. **Theme System**
   - Create CSS variables for all three themes
   - Implement theme context and switcher
   - Set up CSS modules structure

3. **Component Architecture**
   - Create atoms (Button, Icon, Input)
   - Build molecules (SearchBar, ThemeToggle)
   - Design layout components (Header, Sidebar)

4. **Database Setup**
   - Create all 8 hobby tables in Supabase
   - Set up RLS policies following ViRa Verse pattern
   - Generate initial data insertion scripts

**Deliverables:**
- Working project with theme system
- Complete component library foundation
- Database schema implemented
- Initial data loaded

---

### **Phase 2: Authentication & Cosmic Design (Week 2)**
**Goals**: Implement authentication system and cosmic-themed login

**Tasks:**
1. **Authentication Integration**
   - Connect to existing ViRa Verse Supabase Auth
   - Implement login/guest access flow
   - Set up route protection
   - Create user session management

2. **Cosmic Login Page**
   - Design space/mountain landscape
   - Implement WebGL aurora effects
   - Add floating particle animations
   - Create responsive form design

3. **Layout Foundation**
   - Build header with logo and icons
   - Create expandable sidebar navigation
   - Implement theme switching functionality
   - Add responsive behavior

**Deliverables:**
- Fully functional authentication
- Stunning cosmic login page
- Complete layout structure
- Theme switching working

---

### **Phase 3: Dashboard & Hero Banner (Week 3)**
**Goals**: Create impressive dashboard with 3D effects and hobby tiles

**Tasks:**
1. **Hero Banner Design**
   - Create cosmic background with WebGL
   - Implement mouse tracking parallax
   - Add welcome title and description
   - Design responsive layout

2. **Hobby Tiles System**
   - Build statistic calculation logic
   - Create tile components with hover effects
   - Implement navigation to hobby pages
   - Add loading and empty states

3. **Dashboard Logic**
   - Fetch data from all hobby tables
   - Calculate statistics per category
   - Implement real-time updates
   - Add responsive grid layout

**Deliverables:**
- Impressive dashboard with 3D effects
- Working hobby tiles with statistics
- Navigation to all hobby categories
- Responsive design across devices

---

### **Phase 4: Bookworm Template (Week 4-5)**
**Goals**: Build complete CRUD system using Bookworm as template

**Tasks:**
1. **Data Grid Component**
   - Create reusable grid/list toggle
   - Implement search and filter system
   - Add sort functionality
   - Build pagination if needed

2. **Modal System**
   - Design add/edit modal with form validation
   - Create view modal for detailed display
   - Implement delete confirmation
   - Add image upload integration

3. **Cloudinary Integration**
   - Set up image upload to `/vira_lobby/bookworm/`
   - Implement thumbnail generation
   - Add image optimization
   - Create deletion cleanup

4. **Advanced Features**
   - Export to Excel functionality
   - Bulk upload with CSV/JSON support
   - Advanced search across all fields
   - Error handling and validation

**Deliverables:**
- Complete Bookworm management system
- Reusable components for other hobbies
- Full CRUD with image support
- Export and import capabilities

---

### **Phase 5: Replication & Optimization (Week 6-7)**
**Goals**: Replicate Bookworm template for all other hobby categories

**Tasks:**
1. **Media Categories (Bingescape, Film Frenzy, Otaku Hub)**
   - Adapt components for video content
   - Implement poster-dominant layouts
   - Add season/episode tracking
   - Configure image optimization

2. **Travel Category (Wanderlog)**
   - Create multi-image gallery modal
   - Implement cover image backgrounds
   - Add attraction tags system
   - Design location-focused UI

3. **Image Categories (Scribbles, Shutter Tales, Spot Light)**
   - Remove list view (grid only)
   - Implement large image tiles
   - Add high-quality image preservation
   - Create portfolio-style layouts

4. **Performance Optimization**
   - Implement lazy loading
   - Optimize bundle size
   - Add error boundaries
   - Test cross-browser compatibility

**Deliverables:**
- All 8 hobby categories functional
- Optimized performance
- Consistent user experience
- Complete testing coverage

---

### **Phase 6: Polish & Enhancement (Week 8)**
**Goals**: Final polish, animations, and deployment preparation

**Tasks:**
1. **Animation Enhancement**
   - Add Framer Motion to all transitions
   - Implement micro-interactions
   - Optimize 3D effects performance
   - Add loading animations

2. **Responsive Refinement**
   - Test on all device sizes
   - Optimize mobile experience
   - Fix tablet-specific issues
   - Ensure touch accessibility

3. **Documentation & Deployment**
   - Create deployment guide
   - Document API integration points
   - Write user manual
   - Prepare environment variables

4. **Final Testing**
   - Cross-browser testing
   - Performance auditing
   - Accessibility compliance
   - User acceptance testing

**Deliverables:**
- Production-ready application
- Complete documentation
- Deployment guide
- Performance optimized

---

## 🔒 Security & Performance

### **Security Measures**
- **Input Validation**: All form inputs sanitized
- **XSS Protection**: Proper content escaping
- **File Upload Security**: Type and size restrictions
- **RLS Enforcement**: Database-level access control

### **Performance Optimization**
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Cloudinary auto-optimization
- **Bundle Analysis**: Minimize JavaScript payload
- **Caching Strategy**: Efficient resource caching

---

## 📚 Integration Requirements

### **Cloudinary Setup**
- **Account**: Existing ViRa Verse Cloudinary account
- **Folders**: `/vira_lobby/{category}/` structure
- **API Keys**: Stored in Supabase environment variables
- **Transformations**: Automatic optimization enabled

### **Supabase Configuration**
- **Project**: Shared with ViRa Verse
- **Tables**: 8 new hobby tables + existing users
- **RLS**: Policies for owner/admin/guest access
- **Edge Functions**: Image upload processing

### **Environment Variables**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CLOUDINARY_CLOUD_NAME=dnar75gig
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Testing Strategy

### **Unit Testing**
- Component testing with React Testing Library
- Redux store testing
- Utility function testing
- Form validation testing

### **Integration Testing**
- Authentication flow testing
- CRUD operation testing
- Image upload testing
- Theme switching testing

### **User Acceptance Testing**
- Owner user flow verification
- Guest user flow verification
- Responsive design testing
- Cross-browser compatibility

---

## 🚀 Future Enhancements

### **Phase 2 Features (Post-MVP)**
- **IMDB API Integration**: Automatic movie/series data fetching
- **Advanced Analytics**: Hobby insights and trends
- **Social Features**: Sharing and recommendations
- **Mobile App**: React Native version
- **Offline Support**: PWA capabilities

### **Technical Improvements**
- **Advanced Search**: Elasticsearch integration
- **Real-time Updates**: WebSocket notifications
- **Advanced Caching**: Redis integration
- **Performance Monitoring**: Analytics integration

---

## 📝 Development Notes

### **Key Dependencies**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "@reduxjs/toolkit": "^1.9.0",
  "framer-motion": "^10.0.0",
  "@supabase/supabase-js": "^2.8.0",
  "three": "^0.150.0",
  "xlsx": "^0.18.0"
}
```

### **File Structure**
```
vira_lobby/
├── public/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── layouts/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── styles/
│   └── features/
├── utilities/
│   ├── database/
│   │   ├── schema.sql
│   │   ├── initial-data/
│   │   │   ├── bookworm.sql
│   │   │   ├── bingescape.sql
│   │   │   └── ...
│   │   └── rls-policies.sql
│   └── cloudinary/
└── guides/
    ├── User_Requirements.md
    ├── Initial_data.md
    └── DEVELOPMENT_PLAN.md
```

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Author**: AI Assistant  
**Project**: ViRa's Lobby - Hobbies Portal

---

*This document serves as the single source of truth for the ViRa's Lobby project. All development decisions and implementations should reference this comprehensive plan.* 