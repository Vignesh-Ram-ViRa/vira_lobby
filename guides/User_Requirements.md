Title: ViRa's Lobby – Hobbies Portal (React Frontend)

Tech Stack & Rules:

React with React Router v6 for navigation.
State management: React hooks + Redux.
Styling: pure CSS stylesheets or CSS modules (no Tailwind, Bootstrap, ShadCN, or any external styling libraries).
Icons: VS Code’s Codicon set for all icons.
Responsive breakpoints: ≤480px (mobile), ≤768px (tablet), ≤1024px (small desktop), >1024px (desktop).

Themes:
Formal Light - white , beige and gold accents. - will provide a screenshot for color theming
Formal Dark - black, dark grey with gold accents - will provide a screenshot for color theming
Fun (vibrant pastel palette) - dark and light pastel colors with watercolor or marble textures - will provide a screenshot for color theming

Image uploads via backend (Cloudinary handled by supabase) - follow viraverse as reference.
No inline CSS or static HTML content — all dynamic and reusable.
Minimalist, responsive, multi-themed, future-proof UI.

Overall Structure:
Authentication (login/register) — using the same auth as viraverse(will provide reference) . so consider the user as "vickyram.vira@gmail.com" for initial data. its a owner user. owner has r/w access to all their own records. super admin user (vigneshuramu@gmail.com) has r/w access to all users records. guest user has read access to owner records.
Header (edge-to-edge):
	Left: Logo (ViRa's Lobby)
	Right: Home, Theme Switcher, Profile Icon
Navbar:
	- hosted in left side of the screen vertically. just icons when idle. expand to full menu on hover. (will provide screenshot)
Footer: Copyright + Social Links - aligned in the right side in single line

Dashboard (Home):
	Displays all hobbies as tiles with statistics.
	Clicking a tile navigates to that section’s page.
Common Features for All Hobby Tabs:
	Tile/Card Grid View + List View toggle (except tabs marked otherwise).
	an advanced search bar and a plus icon to the right of it (below the header)
		Advanced Search: single smart search input for each tab sepearately(filters across all relevant fields).
		+ Button to add new entry → opens Modal Form (fields vary by tab).
	Click tile → opens Detailed View Modal (full viewing details + Update/Delete icon buttons on the top right).
		update button makes the fields in the modal editable. and image privew will be replaced by image upload provision
		delete button opens a confirm popup for deletion and on confirm deletes the record
	Sort by any field.
	Export to Excel link.
	Bulk Upload: CSV/Excel/JSON import in a predefined format → validate & batch insert.
	Front-end filtering for now (fetch all records on load; ~100 rows max).
Tabs & Data Fields:
	Bookworm – Books I’ve read
		Fields: title, series, author(s), genres(tags), language, start date(mm/yy), end date(mm/yy), star rating, read/download link, pricing, cover image(thumbnail), comment
		Variation: book-like card layout, emphasis on cover image and title.
	Bingescape – Web series
			Fields: title, verse, description, season, genres, language, start date(mm/yy), end date(mm/yy), star rating, watch/download link, poster image(thumbnail), comment
			Variation: poster-dominant grid.
	Film Frenzy – Movies
			Fields: title, verse, part, genres, language, date(mm/yy),imdb rating, star rating, watch/download link, poster image(thumbnail), comment
			Variation: cinematic-style cards with date overlay.
	Otaku Hub – Anime
			Fields: title, verse, season, genres, language, start date(mm/yy), end date(mm/yy), star rating, watch/download link, poster image(thumbnail), comment
			Variation: anime-styled accent colors & card frames.
	Wanderlog – Travel log
		Fields: city, country, area, attractions(tags), highlight, date(mm/yy), star rating, photos link, sample images (multi-image gallery in secondary modal), cover image(prominent), comment
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
	App can run standalone or be embedded in a parent app receiving JWT token via URL. if no token consider as guest.

Performance & UX Notes:
	Efficient image loading (lazy load, placeholders).
	Separate file for API endpoint mappings.
	Mobile-friendly modals and cards. Fully responsive application.

Deliverables for this prompt:
	React app scaffold with pages, components, routing, and theme system.
	CSS module/theme system with three themes.
	Reusable DataGrid component with card/list toggle, search, sort, export, bulk upload.
	Table creation and initial data insertion queries as sql files for all tabs.
	Modular modal components for Add/Edit/View.

All image uploads will happen through linking react -> supabase -> cloudinary . Add provisions to support that. please refer vira_verse. we will be using even the same supabase connection and cloudinary project. 

Ensure all styles and components are modular and reusable.

I ll give you screenshots for reference when we work on each tab. 

generate sql statements for creation of tables and insertion of data(And store it as an sql file in utilities folder). I will provide initial set of data in excel.  


go through this requirements and our cursorRules. ask if you have any questions and clarifications.
We will discuss further and get clear of our requirements and start development only when i explicitly ask you to "start development"


## supabase
N@rutoUzumaki130892
uqrlvppsnppobzowlcqw
postgresql://postgres:[YOUR-PASSWORD]@db.uqrlvppsnppobzowlcqw.supabase.co:5432/postgres