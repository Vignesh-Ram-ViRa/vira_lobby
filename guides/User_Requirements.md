Title: ViRa's Lobby – Hobbies Portal (React Frontend)

Tech Stack & Rules:

React with React Router v6 for navigation.
State management: React hooks + Redux.
Styling: pure CSS stylesheets or CSS modules (no Tailwind, Bootstrap, ShadCN, or any external styling libraries).
Icons: VS Code’s Codicon set for all icons.
Responsive breakpoints: ≤480px (mobile), ≤768px (tablet), ≤1024px (small desktop), >1024px (desktop).

Themes:
Formal Light
Formal Dark
Fun (vibrant pastel palette)

Image uploads via backend (Cloudinary handled server-side).
Mock API structure for now, real API endpoints will be integrated later.
No inline CSS or static HTML content — all dynamic and reusable.
Minimalist, responsive, multi-themed, future-proof UI.

Overall Structure:
Authentication (login/register) — placeholder screens, to be linked with existing Java Spring Boot auth later. For now anyone who hits the URL can access everything.
Header (edge-to-edge):
	Left: Logo (ViRa's Lobby)
	Center: Menu (Dashboard + Hobby tabs)
	Right: Home, Theme Switcher, Profile Icon
Footer: Copyright + Social Links
Dashboard (Home):
	Displays all hobbies as tiles with statistics.
	Clicking a tile navigates to that section’s page.
Common Features for All Hobby Tabs:
	Tile/Card Grid View + List View toggle (except tabs marked otherwise).
	+ Button to add new entry → opens Modal Form (fields vary by tab).
	Click tile → opens Detailed View Modal (full details + Update/Delete).
	Advanced Search: single smart search input (filters across all relevant fields).
	Sort by any field.
	Export to Excel link.
	Bulk Upload: CSV/Excel/JSON import in a predefined format → validate & batch insert.
	Front-end filtering for now (fetch all records on load; ~100 rows max).
Tabs & Data Fields:
	Bookworm – Books I’ve read
		Fields: title, series, author(s), genres(tags), language, start date(mm/yy), end date(mm/yy), star rating, read/download link, pricing, cover image, comment
		Variation: book-like card layout, emphasis on cover image and title.
	Media Madness (parent menu) — contains three sub menus:
		Bingescape – Web series
			Fields: title, verse, description, season, genres, language, start date(mm/yy), end date(mm/yy), star rating, watch/download link, poster image, comment
			Variation: poster-dominant grid.
		Film Frenzy – Movies
			Fields: title, verse, part, genres, language, date(mm/yy),imdb rating, star rating, watch/download link, poster image, comment
			Variation: cinematic-style cards with date overlay.
		Otaku Hub – Anime
			Fields: title, verse, season, genres, language, start date(mm/yy), end date(mm/yy), star rating, watch/download link, poster image, comment
			Variation: anime-styled accent colors & card frames.
	Wanderlog – Travel log
		Fields: city, country, area, attractions(tags), highlight, date(mm/yy), star rating, photos link, sample images (multi-image gallery in secondary modal), cover image, comment
		Variation: cover image background, location pins as icons.
	Scribbles – Doodles & sketches (no list view)
		Fields: name, image(prominent), genre, category, date, description
		Variation: image-dominant cards with sketchbook texture background.
	Shutter Tales – Photography (no list view)
		Fields: name, image(prominent), location, genre, category, date, description
		Variation: large photo tiles with hover effects.
	Spot Light – Personal portfolio photos (no list view)
		Fields: image(prominent), location, genre, category, date, description
		Variation: magazine/portfolio card style.
Routing & Access:
	Fully functional deep linking (e.g., /bookworm goes directly to that page).
	App can run standalone or be embedded in a parent app receiving JWT token via URL. 
	If token + route provided, open that page pre-authenticated. No authentication for now since only mock data is used.

Performance & UX Notes:
	Efficient image loading (lazy load, placeholders).
	Separate file for API endpoint mappings.
	Mobile-friendly modals and cards. Fully responsive application.

Deliverables for this prompt:
	React app scaffold with pages, components, routing, and theme system.
	CSS module/theme system with three themes.
	Reusable DataGrid component with card/list toggle, search, sort, export, bulk upload.
	Sample mock data for each tab.
	Modular modal components for Add/Edit/View.

Do not add backend logic; only mock API calls with placeholder JSON and mock data in a constants file. (the mock data will be later replaced by actual data. i ll give the table structure alone for reference)
Ensure all styles and components are modular and reusable.

I ll give you screenshots for reference when we work on each tab. 


One correction. Please use supabase + cloudinary for db storage instead of mock data / springboot API calls.authentication is also to be handled through supabase. You should generate sql statements for creation of tables and insertion of data(And store it as an sql file in utilities folder). I will provide initial set of data in excel.  


go through this requirements and our cursorRules. ask if you have any questions and clarifications.
We will discuss further and get clear of our requirements and start development only when i explicitly ask you to "start development"


## supabase
N@rutoUzumaki130892
uqrlvppsnppobzowlcqw
postgresql://postgres:[YOUR-PASSWORD]@db.uqrlvppsnppobzowlcqw.supabase.co:5432/postgres