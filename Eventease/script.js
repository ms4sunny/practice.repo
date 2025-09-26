// ==================== EVENTEASE PROFESSIONAL EDITION ====================

console.log("EventEase Professional Edition 🚀");

// ---------------- GLOBAL VARIABLES ----------------
const events = [
    {id: 1, title: "🎶 Music Fest 2025", category: "music", desc: "Biggest music festival of the year.", image: "https://picsum.photos/400/200?random=1", date: "2025-03-15", location: "Central Park", price: "$50", status: "approved"},
    {id: 2, title: "💻 Tech Conference", category: "tech", desc: "48-hour coding marathon.", image: "https://picsum.photos/400/200?random=2", date: "2025-04-20", location: "Convention Center", price: "Free", status: "approved"},
    {id: 3, title: "🎨 Art Expo", category: "art", desc: "Explore modern art from rising stars.", image: "https://picsum.photos/400/200?random=3", date: "2025-05-10", location: "Art Gallery", price: "$25", status: "approved"},
    {id: 4, title: "⚽ Football Championship", category: "sports", desc: "Local teams battle it out.", image: "https://picsum.photos/400/200?random=4", date: "2025-06-05", location: "City Stadium", price: "$15", status: "approved"},
    {id: 5, title: "🎤 Comedy Night", category: "music", desc: "Laugh out loud with top comedians.", image: "https://picsum.photos/400/200?random=5", date: "2025-03-25", location: "Comedy Club", price: "$20", status: "approved"},
    {id: 6, title: "🗳️ Political Forum", category: "political", desc: "Engage with young leaders.", image: "https://picsum.photos/400/200?random=6", date: "2025-07-12", location: "Town Hall", price: "Free", status: "approved"},
    {id: 7, title: "🤝 Social Drive", category: "social", desc: "Promote social responsibility.", image: "https://picsum.photos/400/200?random=7", date: "2025-08-08", location: "Community Center", price: "Free", status: "approved"},
    {id: 8, title: "📚 Education Expo", category: "educational", desc: "University opportunities showcase.", image: "https://picsum.photos/400/200?random=8", date: "2025-09-15", location: "Expo Center", price: "Free", status: "approved"},
    {id: 9, title: "🏥 Health Camp", category: "medical", desc: "Free health checkups.", image: "https://picsum.photos/400/200?random=9", date: "2025-10-05", location: "Medical Center", price: "Free", status: "approved"},
    {id: 10, title: "🏢 Startup Expo", category: "expo", desc: "Discover new innovations.", image: "https://picsum.photos/400/200?random=10", date: "2025-11-20", location: "Innovation Hub", price: "$30", status: "approved"},
    {id: 11, title: "💡 Product Launch", category: "promotion", desc: "New product launches.", image: "https://picsum.photos/400/200?random=11", date: "2025-12-10", location: "Business Center", price: "$40", status: "approved"}
];
// ---------------- SIDEBAR INITIALIZATION ----------------
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");

  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      
      // Update button text based on state
      if (sidebar.classList.contains("active")) {
        toggleBtn.textContent = '✕ Close';
      } else {
        toggleBtn.textContent = '☰ Menu';
      }
    });
    
    console.log("Sidebar toggle initialized successfully");
  } else {
    console.error("Sidebar elements not found");
  }
}
// ---------------- SECURE FAVORITES SYSTEM ----------------
function getFavorites() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];
  
  const allFavorites = JSON.parse(localStorage.getItem("userFavorites")) || {};
  return allFavorites[user.username] || [];
}

function saveFavorites(favorites) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  
  const allFavorites = JSON.parse(localStorage.getItem("userFavorites")) || {};
  allFavorites[user.username] = favorites;
  localStorage.setItem("userFavorites", JSON.stringify(allFavorites));
}

function checkIfFavorite(eventId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;
  
  const favorites = getFavorites();
  return favorites.includes(eventId);
}

function saveFavorite(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    showNotification("Please log in to save favorites", "error");
    openLogin();
    return;
  }

  let favorites = getFavorites();
  const index = favorites.indexOf(id);
  const buttons = document.querySelectorAll(`button[onclick="saveFavorite(${id})"]`);

  if (index === -1) {
    favorites.push(id);
    saveFavorites(favorites);
    buttons.forEach(btn => {
      btn.textContent = "⭐ Saved";
      btn.classList.add('favorited');
    });
    showNotification("Event saved to favorites!");
  } else {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    buttons.forEach(btn => {
      btn.textContent = "☆ Save";
      btn.classList.remove('favorited');
    });
    showNotification("Event removed from favorites!");
  }
}

function removeFavorite(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    showNotification("Please log in to manage favorites", "error");
    openLogin();
    return;
  }

  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  saveFavorites(favorites);
  displayFavorites();
  showNotification("Event removed from favorites!");
}

function displayFavorites() {
  const container = document.getElementById("favoritesContainer");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("user"));
  let favorites = getFavorites();
  let allEvents = [...events, ...(JSON.parse(localStorage.getItem("customEvents")) || [])];
  let favEvents = allEvents.filter(ev => favorites.includes(ev.id));

  container.innerHTML = "";

  if (!user) {
    container.innerHTML = `
      <div class="empty-favorites">
        <div class="login-prompt-card">
          <h3>🔒 Login Required</h3>
          <p>Please log in to view and manage your favorite events</p>
          <button onclick="openLogin()" class="btn">Login Now</button>
          <p class="small-text">Don't have an account? <a href="#" onclick="openSignup()">Sign up here</a></p>
        </div>
      </div>
    `;
    return;
  }

  if (favEvents.length === 0) {
    container.innerHTML = `
      <div class="empty-favorites">
        <p>No favorites yet. Start exploring events! ⭐</p>
        <a href="events.html" class="btn">Browse Events</a>
      </div>
    `;
    return;
  }

  favEvents.forEach(ev => {
    container.innerHTML += `
      <div class="event-card">
        <img src="${ev.image}" alt="${ev.title}">
        <h3>${ev.title}</h3>
        <p class="event-date">📅 ${ev.date} | 📍 ${ev.location}</p>
        <p>${ev.desc}</p>
        <span class="badge">${ev.category}</span>
        <div class="event-actions">
          <a href="event-details.html?id=${ev.id}" class="btn">View Details</a>
          <button onclick="removeFavorite(${ev.id})" class="btn-danger">❌ Remove</button>
        </div>
      </div>
    `;
  });
}

// ---------------- EVENT MANAGEMENT ----------------
function displayEvents(list = events) {
  const container = document.getElementById("eventContainer");
  if (!container) return;
  
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = '<div class="no-events"><p>No events found matching your criteria.</p></div>';
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  list.forEach(ev => {
    const isFavorite = checkIfFavorite(ev.id);
    container.innerHTML += `
      <div class="event-card" data-category="${ev.category}">
        <a href="event-details.html?id=${ev.id}">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy">
          <div class="event-badge">${ev.category}</div>
        </a>
        <div class="event-content">
          <h3>
            <a href="event-details.html?id=${ev.id}">${ev.title}</a>
          </h3>
          <p class="event-date">📅 ${ev.date} | 📍 ${ev.location}</p>
          <p class="event-desc">${ev.desc}</p>
          <div class="event-footer">
            <span class="event-price">${ev.price}</span>
            ${user ? `
              <button onclick="saveFavorite(${ev.id})" class="favorite-btn ${isFavorite ? 'favorited' : ''}">
                ${isFavorite ? '⭐ Saved' : '☆ Save'}
              </button>
            ` : `
              <button onclick="openLogin()" class="favorite-btn login-prompt">
                🔒 Login to Save
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  });
}

function filterEvents() {
  const search = document.getElementById("search")?.value.toLowerCase() || "";
  const category = document.getElementById("category")?.value || "all";

  let customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
  let allEvents = [...events, ...customEvents];

  const user = JSON.parse(localStorage.getItem("user"));

  let filtered = allEvents.filter(ev =>
    ev.title.toLowerCase().includes(search) &&
    (category === "all" || ev.category === category)
  );

  if (user && user.role === "subscriber" && user.subscriberFilter && user.categories?.length > 0) {
    filtered = filtered.filter(ev => user.categories.includes(ev.category));
  }

  displayEvents(filtered);
}

// ---------------- AUTHENTICATION ----------------
function signup() {
  const username = document.getElementById("signupName")?.value.trim();
  const email = document.getElementById("signupEmail")?.value.trim();
  const password = document.getElementById("signupPassword")?.value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!username || !email || !password || !role) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters", "error");
    return;
  }

  const selectedCategories = Array.from(
    document.querySelectorAll("#signupCategories input[type='checkbox']:checked")
  ).map(cb => cb.value);

  const subscriberFilterToggle = document.getElementById("subscriberFilterToggle")?.checked || false;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    showNotification("Username already taken", "error");
    return;
  }

  if (users.find(u => u.email === email)) {
    showNotification("Email already registered", "error");
    return;
  }

  const newUser = {
    username,
    email,
    password,
    role,
    categories: selectedCategories,
    subscriberFilter: subscriberFilterToggle,
    joinedDate: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showNotification("Account created successfully! Please log in.");
  closeSignup();
  openLogin();
}

function memberLogin() {
  const username = document.getElementById("loginUsername")?.value.trim();
  const password = document.getElementById("loginPassword")?.value.trim();

  if (!username || !password) {
    showNotification("Please enter username and password", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    showNotification("Invalid username or password", "error");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  showNotification(`Welcome back, ${user.username}!`);

  renderAuthUI();

  setTimeout(() => {
    if (user.role === "member") {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "events.html";
    }
  }, 1000);
}

// ---------------- AUTH UI ----------------
function renderAuthUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginNav = document.getElementById("loginNav");
  const signupNav = document.getElementById("signupNav");
  const userMenu = document.getElementById("userMenu");
  const dashboardNav = document.getElementById("dashboardNav");

  if (user) {
    // User is logged in
    if (loginNav) loginNav.classList.add("hidden");
    if (signupNav) signupNav.classList.add("hidden");
    if (userMenu) userMenu.classList.remove("hidden");
    if (dashboardNav) dashboardNav.classList.remove("hidden");
    
    const userDropdown = document.getElementById("userDropdown");
    if (userDropdown) {
      userDropdown.innerHTML = `
        <a href="dashboard.html">📊 Dashboard</a>
        <a href="profile.html">👤 Profile</a>
        <a href="favorites.html">⭐ Favorites</a>
        <a href="#" onclick="logout()">🚪 Logout</a>
      `;
    }
  } else {
    // User is not logged in
    if (loginNav) loginNav.classList.remove("hidden");
    if (signupNav) signupNav.classList.remove("hidden");
    if (userMenu) userMenu.classList.add("hidden");
    if (dashboardNav) dashboardNav.classList.add("hidden");
  }
}

// ---------------- MODAL FUNCTIONS ----------------
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("show");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 800);
}

function openLogin() { 
  openModal("loginModal"); 
}

function closeLogin() { 
  closeModal("loginModal"); 
}

function openSignup() { 
  openModal("signupModal"); 
}

function closeSignup() { 
  closeModal("signupModal"); 
}

function toggleUserMenu() {
  const dropdown = document.getElementById("userDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

function showExtraFields(isMember) {
  const extra = document.getElementById("memberExtra");
  if (extra) {
    if (isMember) {
      extra.classList.add("show");
    } else {
      extra.classList.remove("show");
    }
  }
}

function logout() {
  localStorage.removeItem("user");
  showNotification("You have been logged out");
  renderAuthUI();
  setTimeout(() => window.location.href = "index.html", 1000);
}

// ---------------- UTILITY FUNCTIONS ----------------
function showNotification(message, type = "success") {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ---------------- FAVORITES PAGE ENHANCEMENTS ----------------
function updateFavoritesStats() {
  const statsContainer = document.getElementById('favoritesStats');
  if (!statsContainer) return;
  
  const user = JSON.parse(localStorage.getItem('user'));
  const favorites = getFavorites();
  
  if (!user) {
    statsContainer.innerHTML = `
      <div class="stat-item">
        <span class="stat-number">🔒</span>
        <span class="stat-label">Login to view stats</span>
      </div>
    `;
    return;
  }
  
  statsContainer.innerHTML = `
    <div class="stat-item">
      <span class="stat-number">${favorites.length}</span>
      <span class="stat-label">Total Favorites</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">⭐</span>
      <span class="stat-label">Saved Events</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">${new Date().getFullYear()}</span>
      <span class="stat-label">Your Collection</span>
    </div>
  `;
}

// ---------------- EVENT DETAILS FUNCTIONS ----------------
function displayEventDetails() {
  const container = document.getElementById("eventDetailContainer");
  const titleElement = document.getElementById('eventDetailTitle');
  const subtitleElement = document.getElementById('eventDetailSubtitle');
  
  if (!container) {
    console.error("Event detail container not found");
    return;
  }

  // Show loading state
  container.innerHTML = `
    <div class="loading-event">
      <p>Loading event details...</p>
    </div>
  `;

  // Get event ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id'));
  
  console.log("Looking for event ID:", eventId);
  
  if (!eventId || isNaN(eventId)) {
    container.innerHTML = `
      <div class='error-message'>
        <p>❌ Event not specified. Please select an event from the events page.</p>
        <a href="events.html" class="btn-secondary">Browse Events</a>
      </div>
    `;
    return;
  }

  // Find the event in your existing events array
  const event = findEventById(eventId);
  
  if (!event) {
    container.innerHTML = `
      <div class='error-message'>
        <p>❌ Event not found. It may have been removed or doesn't exist.</p>
        <a href="events.html" class="btn-secondary">Browse Events</a>
      </div>
    `;
    return;
  }

  // Update page title and hero section
  if (titleElement) titleElement.textContent = event.title;
  if (subtitleElement) subtitleElement.textContent = `${event.date} • ${event.location}`;
  document.title = `${event.title} - EventEase`;
  
  // Render the event details
  renderEventDetails(event, container);
}

function findEventById(eventId) {
  // Search in predefined events
  let foundEvent = events.find(event => event.id === eventId);
  
  // If not found, search in custom events
  if (!foundEvent) {
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    foundEvent = customEvents.find(event => event.id === eventId);
  }
  
  return foundEvent;
}

function renderEventDetails(event, container) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isFavorite = checkIfFavorite(event.id);
  const isRegistered = checkIfRegistered(event.id);
  
  const eventDetailsHTML = `
    <div class="event-detail-card">
      <div class="event-detail-image">
        <img src="${event.image}" alt="${event.title}" onerror="this.src='https://picsum.photos/800/400?random=99'">
        <div class="event-detail-badge">${event.category}</div>
      </div>
      <div class="event-detail-content">
        <h1>${event.title}</h1>
        
        <div class="event-meta">
          <span class="meta-item">📅 ${event.date}</span>
          <span class="meta-item">📍 ${event.location}</span>
          <span class="meta-item price-tag">${event.price}</span>
          <span class="meta-item">👥 ${event.category.toUpperCase()} EVENT</span>
        </div>
        
        <p class="event-detail-desc">${event.desc}</p>
        
        <div class="event-features">
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <strong>Category</strong>
            <p>${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">💰</span>
            <strong>Price</strong>
            <p>${event.price}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📅</span>
            <strong>Date</strong>
            <p>${event.date}</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📍</span>
            <strong>Location</strong>
            <p>${event.location}</p>
          </div>
        </div>
        
        ${isRegistered ? `
          <div class="registration-success show">
            ✅ You are registered for this event!
          </div>
        ` : ''}
        
        <div class="event-detail-actions">
          ${user ? `
            <button onclick="saveFavorite(${event.id})" class="btn-favorite ${isFavorite ? 'favorited' : ''}">
              ${isFavorite ? '⭐ Remove from Favorites' : '☆ Add to Favorites'}
            </button>
            ${!isRegistered ? `
              <button class="btn-primary" onclick="registerForEvent(${event.id})">Register for Event</button>
            ` : `
              <button class="btn-primary" disabled>Already Registered</button>
            `}
          ` : `
            <button onclick="openLogin()" class="btn-favorite login-prompt">🔒 Login to Save Favorite</button>
            <button onclick="openLogin()" class="btn-primary">🔒 Login to Register</button>
          `}
          <a href="events.html" class="btn-secondary">← Back to Events</a>
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = eventDetailsHTML;
}

function loadRelatedEvents() {
  const container = document.getElementById("relatedEventsContainer");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const currentEventId = parseInt(urlParams.get('id'));
  
  if (!currentEventId) return;

  const currentEvent = findEventById(currentEventId);
  if (!currentEvent) return;

  // Get related events (same category, exclude current event)
  const allEvents = [...events, ...(JSON.parse(localStorage.getItem("customEvents")) || [])];
  const relatedEvents = allEvents.filter(event => 
    event.id !== currentEventId && 
    event.category === currentEvent.category
  ).slice(0, 3);

  if (relatedEvents.length === 0) {
    container.innerHTML = '<p class="no-events">No related events found. Check out all <a href="events.html">events</a>.</p>';
    return;
  }

  container.innerHTML = relatedEvents.map(event => `
    <div class="event-card">
      <img src="${event.image}" alt="${event.title}" loading="lazy">
      <div class="event-badge">${event.category}</div>
      <div class="event-content">
        <h3><a href="event-details.html?id=${event.id}">${event.title}</a></h3>
        <p class="event-date">📅 ${event.date} | 📍 ${event.location}</p>
        <p class="event-desc">${event.desc}</p>
        <div class="event-footer">
          <span class="event-price">${event.price}</span>
          <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Enhanced checkIfRegistered function
function checkIfRegistered(eventId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;
  
  const registrations = JSON.parse(localStorage.getItem("eventRegistrations")) || [];
  return registrations.some(reg => reg.eventId === eventId && reg.userId === user.username);
}

// Test function to check if events are loading properly
function testEventLoading() {
  console.log("Events array:", events);
  console.log("Custom events:", JSON.parse(localStorage.getItem("customEvents")) || []);
}

function setupDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    showNotification("Please log in to access the dashboard", "error");
    setTimeout(() => window.location.href = "index.html", 1500);
    return;
  }

  // Update welcome message with user's name
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${user.username}! 👋`;
  }

  // Load statistics
  loadDashboardStats(user);

  // Show correct dashboard area based on role
  const memberArea = document.getElementById("memberArea");
  const subscriberArea = document.getElementById("subscriberArea");

  if (user.role === "member") {
    if (memberArea) memberArea.classList.remove("hidden");
    displayMyEvents();
  } else if (user.role === "subscriber") {
    if (subscriberArea) subscriberArea.classList.remove("hidden");
    loadSubscriberEvents(user);
  }

  // Initialize sidebar
  initializeSidebar();
}

// Enhanced function to load dashboard statistics
function loadDashboardStats(user) {
  const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
  const userEvents = customEvents.filter(ev => ev.owner === user.username);
  const favorites = getFavorites();

  // Update stats display
  const totalEventsEl = document.getElementById("totalEvents");
  const totalFavoritesEl = document.getElementById("totalFavorites");
  const memberSinceEl = document.getElementById("memberSince");
  
  if (totalEventsEl) totalEventsEl.textContent = userEvents.length;
  if (totalFavoritesEl) totalFavoritesEl.textContent = favorites.length;
  if (memberSinceEl) memberSinceEl.textContent = user.joinedDate || "2025";
}

// Add these missing functions
function displayMyEvents() {
  const container = document.getElementById("myEventsContainer");
  if (!container) return;
  
  const user = JSON.parse(localStorage.getItem("user"));
  const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
  const userEvents = customEvents.filter(ev => ev.owner === user.username);
  
  if (userEvents.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>You haven't created any events yet.</p>
        <a href="create-event.html" class="btn">Create Your First Event</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = userEvents.map(event => `
    <div class="event-card">
      <img src="${event.image}" alt="${event.title}">
      <h3>${event.title}</h3>
      <p class="event-date">📅 ${event.date} | 📍 ${event.location}</p>
      <p>${event.desc}</p>
      <span class="badge">${event.category}</span>
      <div class="event-actions">
        <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        <button onclick="deleteEvent(${event.id})" class="btn-danger">Delete</button>
      </div>
    </div>
  `).join('');
}

function loadSubscriberEvents(user) {
  const container = document.getElementById("subscriberEventsContainer");
  if (!container) return;
  
  let allEvents = [...events, ...(JSON.parse(localStorage.getItem("customEvents")) || [])];
  let filteredEvents = allEvents;
  
  if (user.subscriberFilter && user.categories?.length > 0) {
    filteredEvents = allEvents.filter(ev => user.categories.includes(ev.category));
  }
  
  if (filteredEvents.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No events match your preferred categories.</p>
        <a href="events.html" class="btn">Browse All Events</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredEvents.map(event => `
    <div class="event-card">
      <img src="${event.image}" alt="${event.title}">
      <h3>${event.title}</h3>
      <p class="event-date">📅 ${event.date} | 📍 ${event.location}</p>
      <p>${event.desc}</p>
      <span class="badge">${event.category}</span>
      <div class="event-actions">
        <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
        <button onclick="saveFavorite(${event.id})" class="favorite-btn ${checkIfFavorite(event.id) ? 'favorited' : ''}">
          ${checkIfFavorite(event.id) ? '⭐ Saved' : '☆ Save'}
        </button>
      </div>
    </div>
  `).join('');
}

// ---------------- PROFILE PAGE FUNCTIONS ----------------
function loadProfileData() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        showNotification("Please log in to view your profile", "error");
        setTimeout(() => window.location.href = "index.html", 1500);
        return;
    }

    // Populate user information
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileRole").textContent = `Role: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`;
    document.getElementById("profileEmail").textContent = user.email;
    
    // Populate form fields
    document.getElementById("profileName").value = user.username;
    document.getElementById("profileEmailInput").value = user.email;
    
    // Populate member since
    const memberSinceEl = document.getElementById("memberSince");
    if (memberSinceEl) {
        memberSinceEl.textContent = user.joinedDate || "2025";
    }

    // Load user interests/categories
    loadProfileCategories(user);
    
    // Load user statistics
    loadProfileStatistics(user);
}

function loadProfileCategories(user) {
    const categoriesContainer = document.getElementById("profileCategories");
    if (!categoriesContainer) return;

    const allCategories = [
        { value: "music", label: "🎵 Music", icon: "🎵" },
        { value: "tech", label: "💻 Tech", icon: "💻" },
        { value: "art", label: "🎨 Art", icon: "🎨" },
        { value: "sports", label: "⚽ Sports", icon: "⚽" },
        { value: "political", label: "🗳️ Political", icon: "🗳️" },
        { value: "social", label: "🤝 Social", icon: "🤝" },
        { value: "educational", label: "📚 Educational", icon: "📚" },
        { value: "medical", label: "🏥 Medical", icon: "🏥" },
        { value: "expo", label: "🏢 Expo", icon: "🏢" },
        { value: "promotion", label: "💡 Promotion", icon: "💡" }
    ];

    categoriesContainer.innerHTML = "";

    allCategories.forEach(category => {
        const isSelected = user.categories && user.categories.includes(category.value);
        const categoryElement = document.createElement("div");
        categoryElement.className = `category-checkbox ${isSelected ? 'selected' : ''}`;
        categoryElement.innerHTML = `
            <input type="checkbox" id="cat-${category.value}" value="${category.value}" ${isSelected ? 'checked' : ''}>
            <label for="cat-${category.value}">
                <span class="category-icon">${category.icon}</span>
                ${category.label}
            </label>
        `;
        categoriesContainer.appendChild(categoryElement);
    });

    // Add event listeners to checkboxes
    const checkboxes = categoriesContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.parentElement.classList.toggle('selected', this.checked);
        });
    });
}

function loadProfileStatistics(user) {
    // Load events created count
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const userEvents = customEvents.filter(ev => ev.owner === user.username);
    const eventsCreatedEl = document.getElementById("eventsCreated");
    if (eventsCreatedEl) eventsCreatedEl.textContent = userEvents.length;

    // Load favorites count
    const favorites = getFavorites();
    const favoritesCountEl = document.getElementById("favoritesCount");
    if (favoritesCountEl) favoritesCountEl.textContent = favorites.length;
}

function updateProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        showNotification("Please log in to update your profile", "error");
        return;
    }

    const newUsername = document.getElementById("profileName").value.trim();
    const newEmail = document.getElementById("profileEmailInput").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation
    if (!newUsername || !newEmail) {
        showNotification("Please fill in all required fields", "error");
        return;
    }

    if (newPassword && newPassword.length < 6) {
        showNotification("Password must be at least 6 characters", "error");
        return;
    }

    if (newPassword && newPassword !== confirmPassword) {
        showNotification("Passwords do not match", "error");
        return;
    }

    // Get updated categories
    const selectedCategories = Array.from(
        document.querySelectorAll('#profileCategories input[type="checkbox"]:checked')
    ).map(cb => cb.value);

    // Update user data
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.username === user.username);
    
    if (userIndex === -1) {
        showNotification("User not found", "error");
        return;
    }

    // Check if username or email already exists (excluding current user)
    const usernameExists = users.find(u => u.username === newUsername && u.username !== user.username);
    const emailExists = users.find(u => u.email === newEmail && u.email !== user.email);

    if (usernameExists) {
        showNotification("Username already taken", "error");
        return;
    }

    if (emailExists) {
        showNotification("Email already registered", "error");
        return;
    }

    // Update user data
    users[userIndex].username = newUsername;
    users[userIndex].email = newEmail;
    users[userIndex].categories = selectedCategories;
    
    if (newPassword) {
        users[userIndex].password = newPassword;
    }

    // Save updated users array
    localStorage.setItem("users", JSON.stringify(users));
    
    // Update current user session
    const updatedUser = users[userIndex];
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update UI
    document.getElementById("profileUsername").textContent = newUsername;
    document.getElementById("profileEmail").textContent = newEmail;

    showNotification("Profile updated successfully!");

    // Clear password fields
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    // Update sidebar if user changed username
    renderAuthUI();
}

// ---------------- ENHANCED EVENT CREATION FUNCTIONS ----------------

// Toggle location fields based on event type
function toggleLocationFields() {
    const locationType = document.getElementById('eventLocationType').value;
    const physicalFields = document.getElementById('physicalLocationFields');
    const onlineFields = document.getElementById('onlineLocationFields');

    if (locationType === 'physical') {
        physicalFields.style.display = 'block';
        onlineFields.style.display = 'none';
    } else if (locationType === 'online') {
        physicalFields.style.display = 'none';
        onlineFields.style.display = 'block';
    } else { // hybrid
        physicalFields.style.display = 'block';
        onlineFields.style.display = 'block';
    }
}

// Toggle price field based on ticket type
function togglePriceField() {
    const priceType = document.getElementById('eventPriceType').value;
    const priceGroup = document.getElementById('priceAmountGroup');
    
    if (priceType === 'paid') {
        priceGroup.style.display = 'block';
    } else {
        priceGroup.style.display = 'none';
        document.getElementById('eventPriceAmount').value = '';
    }
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').min = today;
}

// Enhanced addEvent function with new fields
function addEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        showNotification("Please log in to create events", "error");
        openLogin();
        return;
    }

    // Get form values
    const title = document.getElementById("eventTitle").value.trim();
    const category = document.getElementById("eventCategory").value;
    const desc = document.getElementById("eventDesc").value.trim();
    const image = document.getElementById("eventImage").value.trim();
    const eventDate = document.getElementById("eventDate").value;
    const eventTime = document.getElementById("eventTime").value;
    const locationType = document.getElementById("eventLocationType").value;
    const venue = document.getElementById("eventVenue").value.trim();
    const address = document.getElementById("eventAddress").value.trim();
    const city = document.getElementById("eventCity").value.trim();
    const eventLink = document.getElementById("eventLink").value.trim();
    const priceType = document.getElementById("eventPriceType").value;
    const priceAmount = document.getElementById("eventPriceAmount").value;
    const capacity = document.getElementById("eventCapacity").value;

    // Enhanced validation
    if (!title || !category || !desc || !eventDate || !eventTime || !venue) {
        showNotification("Please fill in all required fields", "error");
        return;
    }

    if (title.length < 5) {
        showNotification("Event title must be at least 5 characters", "error");
        return;
    }

    if (desc.length < 20) {
        showNotification("Event description must be at least 20 characters", "error");
        return;
    }

    // Date validation
    const selectedDate = new Date(eventDate + 'T' + eventTime);
    const now = new Date();
    if (selectedDate <= now) {
        showNotification("Event date must be in the future", "error");
        return;
    }

    // Price validation for paid events
    if (priceType === 'paid' && (!priceAmount || parseFloat(priceAmount) <= 0)) {
        showNotification("Please enter a valid ticket price for paid events", "error");
        return;
    }

    // Format price display
    let priceDisplay = "Free";
    if (priceType === 'paid') {
        priceDisplay = `$${parseFloat(priceAmount).toFixed(2)}`;
    }

    // Format location information
    let locationDisplay = venue;
    if (locationType === 'physical' && address) {
        locationDisplay += `, ${address}`;
        if (city) locationDisplay += `, ${city}`;
    } else if (locationType === 'online' && eventLink) {
        locationDisplay = `Online: ${eventLink}`;
    } else if (locationType === 'hybrid') {
        locationDisplay = `Hybrid: ${venue}`;
        if (eventLink) locationDisplay += ` | Online: ${eventLink}`;
    }

    // Create new event object with enhanced fields
    const newEvent = {
        id: generateEventId(),
        title: title,
        category: category,
        desc: desc,
        image: image || getDefaultEventImage(category),
        date: eventDate,
        time: eventTime,
        datetime: selectedDate.toISOString(),
        locationType: locationType,
        location: locationDisplay,
        venue: venue,
        address: address,
        city: city,
        eventLink: eventLink,
        priceType: priceType,
        price: priceDisplay,
        priceAmount: priceType === 'paid' ? parseFloat(priceAmount) : 0,
        capacity: capacity ? parseInt(capacity) : null,
        owner: user.username,
        status: 'pending', // 'pending' for implement admin approval
        createdAt: new Date().toISOString(),
        attendees: [] // For future registration system
    };

    // Save event to localStorage
    saveEvent(newEvent);

    // Clear form
    resetEventForm();

    // Show success message
    showNotification("Event created successfully! 🎉");

    // Refresh events list
    displayMyEvents();

    // Update statistics
    loadDashboardStats(user);
}

// Reset form to initial state
function resetEventForm() {
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventCategory").value = "";
    document.getElementById("eventDesc").value = "";
    document.getElementById("eventImage").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";
    document.getElementById("eventLocationType").value = "physical";
    document.getElementById("eventVenue").value = "";
    document.getElementById("eventAddress").value = "";
    document.getElementById("eventCity").value = "";
    document.getElementById("eventLink").value = "";
    document.getElementById("eventPriceType").value = "free";
    document.getElementById("eventPriceAmount").value = "";
    document.getElementById("eventCapacity").value = "";
    
    // Reset visibility
    toggleLocationFields();
    togglePriceField();
    setMinDate();
}

// Enhanced event display with new fields
function displayMyEvents() {
    const container = document.getElementById("myEventList");
    const emptyState = document.getElementById("emptyEvents");
    
    if (!container) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const userEvents = customEvents.filter(ev => ev.owner === user.username);

    container.innerHTML = "";

    if (userEvents.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    if (emptyState) emptyState.style.display = "none";

    userEvents.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" onerror="this.src='https://picsum.photos/400/200?random=99'">
            <div class="event-badge">${event.category}</div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date} | ⏰ ${event.time}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-desc">${event.desc}</p>
                <div class="event-footer">
                    <span class="event-price">${event.price}</span>
                    ${event.capacity ? `<span class="event-capacity">👥 ${event.capacity} seats</span>` : ''}
                    <div class="event-actions">
                        <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
                        <button onclick="editEvent(${event.id})" class="btn-secondary">Edit</button>
                        <button onclick="deleteEvent(${event.id})" class="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

// Initialize form when page loads
function initializeEventForm() {
    setMinDate();
    toggleLocationFields();
    togglePriceField();
    
    // Set default time to next hour
    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);
    document.getElementById('eventTime').value = nextHour.toTimeString().slice(0, 5);
}



// ---------------- UNIVERSAL SIDEBAR FUNCTIONS ----------------
function toggleMainSidebar() {
    const sidebar = document.getElementById("mainSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && overlay) {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("mainSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && overlay) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }
}

function quickSearch() {
    const searchTerm = document.getElementById("globalSearch").value.trim();
    if (searchTerm) {
        window.location.href = `events.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

function initializeUniversalSidebar() {
    const toggleBtn = document.getElementById("mainSidebarToggle");
    const sidebar = document.getElementById("mainSidebar");
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", toggleMainSidebar);
        
        // Close sidebar when clicking on links
        const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }
}

function updateSidebarContent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const sidebarGuest = document.getElementById("sidebarGuest");
    const sidebarUser = document.getElementById("sidebarUser");
    const sidebarMember = document.getElementById("sidebarMember");
    const sidebarUserName = document.getElementById("sidebarUserName");
    const sidebarUserRole = document.getElementById("sidebarUserRole");
    
    if (user) {
        // User is logged in
        if (sidebarGuest) sidebarGuest.classList.add("hidden");
        if (sidebarUser) sidebarUser.classList.remove("hidden");
        if (sidebarMember) {
            sidebarMember.classList.toggle("hidden", user.role !== "member");
        }
        if (sidebarUserName) sidebarUserName.textContent = user.username;
        if (sidebarUserRole) sidebarUserRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    } else {
        // User is logged out
        if (sidebarGuest) sidebarGuest.classList.remove("hidden");
        if (sidebarUser) sidebarUser.classList.add("hidden");
    }
}

// ---------------- EVENT CREATION FUNCTIONS ----------------
function addEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        showNotification("Please log in to create events", "error");
        openLogin();
        return;
    }

    // Get form values
    const title = document.getElementById("eventTitle").value.trim();
    const category = document.getElementById("eventCategory").value;
    const desc = document.getElementById("eventDesc").value.trim();
    const image = document.getElementById("eventImage").value.trim();

    // Validation
    if (!title || !category || !desc) {
        showNotification("Please fill in all required fields", "error");
        return;
    }

    if (title.length < 5) {
        showNotification("Event title must be at least 5 characters", "error");
        return;
    }

    if (desc.length < 20) {
        showNotification("Event description must be at least 20 characters", "error");
        return;
    }

    // Create new event object
    const newEvent = {
        id: generateEventId(),
        title: title,
        category: category,
        desc: desc,
        image: image || getDefaultEventImage(category),
        date: getDefaultEventDate(),
        location: "Online Event", // Default location
        price: "Free", // Default price
        owner: user.username,
        createdAt: new Date().toISOString()
    };

    // Save event to localStorage
    saveEvent(newEvent);

    // Clear form
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventCategory").value = "";
    document.getElementById("eventDesc").value = "";
    document.getElementById("eventImage").value = "";

    // Show success message
    showNotification("Event created successfully!");

    // Refresh events list
    displayMyEvents();

    // Update statistics
    loadDashboardStats(user);
}

function generateEventId() {
    // Generate unique ID based on timestamp and random number
    return Date.now() + Math.floor(Math.random() * 1000);
}

function getDefaultEventImage(category) {
    // Default images based on category
    const categoryImages = {
        music: "https://picsum.photos/400/200?random=music",
        tech: "https://picsum.photos/400/200?random=tech",
        art: "https://picsum.photos/400/200?random=art",
        sports: "https://picsum.photos/400/200?random=sports",
        political: "https://picsum.photos/400/200?random=political",
        social: "https://picsum.photos/400/200?random=social",
        educational: "https://picsum.photos/400/200?random=educational",
        medical: "https://picsum.photos/400/200?random=medical",
        expo: "https://picsum.photos/400/200?random=expo",
        promotion: "https://picsum.photos/400/200?random=promotion"
    };
    return categoryImages[category] || "https://picsum.photos/400/200?random=event";
}

function getDefaultEventDate() {
    // Default to 30 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    return futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

function saveEvent(event) {
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    customEvents.push(event);
    localStorage.setItem("customEvents", JSON.stringify(customEvents));
}

function displayMyEvents() {
    const container = document.getElementById("myEventList");
    const emptyState = document.getElementById("emptyEvents");
    
    if (!container) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const userEvents = customEvents.filter(ev => ev.owner === user.username);

    container.innerHTML = "";

    if (userEvents.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    if (emptyState) emptyState.style.display = "none";

    userEvents.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" onerror="this.src='https://picsum.photos/400/200?random=99'">
            <div class="event-badge">${event.category}</div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date} | 📍 ${event.location}</p>
                <p class="event-desc">${event.desc}</p>
                <div class="event-footer">
                    <span class="event-price">${event.price}</span>
                    <div class="event-actions">
                        <a href="event-details.html?id=${event.id}" class="btn">View Details</a>
                        <button onclick="editEvent(${event.id})" class="btn-secondary">Edit</button>
                        <button onclick="deleteEvent(${event.id})" class="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

function deleteEvent(eventId) {
    if (!confirm("Are you sure you want to delete this event?")) {
        return;
    }

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const updatedEvents = customEvents.filter(ev => ev.id !== eventId);
    localStorage.setItem("customEvents", JSON.stringify(updatedEvents));

    showNotification("Event deleted successfully!");
    displayMyEvents();

    // Update statistics
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        loadDashboardStats(user);
    }
}

function editEvent(eventId) {
    // Find the event
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const event = customEvents.find(ev => ev.id === eventId);
    
    if (!event) {
        showNotification("Event not found", "error");
        return;
    }

    // Populate form with event data
    document.getElementById("eventTitle").value = event.title;
    document.getElementById("eventCategory").value = event.category;
    document.getElementById("eventDesc").value = event.desc;
    document.getElementById("eventImage").value = event.image;

    // Change button to update
    const createButton = document.querySelector('.add-event-form button');
    createButton.innerHTML = '<span class="btn-icon">✏️</span> Update Event';
    createButton.onclick = function() { updateEvent(eventId); };

    // Scroll to form
    document.querySelector('.add-event-section').scrollIntoView({ behavior: 'smooth' });
    
    showNotification("Edit mode activated. Update the event details.");
}

function updateEvent(eventId) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        showNotification("Please log in to update events", "error");
        return;
    }

    // Get form values
    const title = document.getElementById("eventTitle").value.trim();
    const category = document.getElementById("eventCategory").value;
    const desc = document.getElementById("eventDesc").value.trim();
    const image = document.getElementById("eventImage").value.trim();

    // Validation
    if (!title || !category || !desc) {
        showNotification("Please fill in all required fields", "error");
        return;
    }

    // Update event
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const eventIndex = customEvents.findIndex(ev => ev.id === eventId);
    
    if (eventIndex === -1) {
        showNotification("Event not found", "error");
        return;
    }

    customEvents[eventIndex] = {
        ...customEvents[eventIndex],
        title: title,
        category: category,
        desc: desc,
        image: image || getDefaultEventImage(category)
    };

    localStorage.setItem("customEvents", JSON.stringify(customEvents));

    // Reset form and button
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventCategory").value = "";
    document.getElementById("eventDesc").value = "";
    document.getElementById("eventImage").value = "";

    const createButton = document.querySelector('.add-event-form button');
    createButton.innerHTML = '<span class="btn-icon">➕</span> Create Event';
    createButton.onclick = addEvent;

    showNotification("Event updated successfully!");
    displayMyEvents();
}

// Enhanced setupDashboard function to include events display
function setupDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        showNotification("Please log in to access the dashboard", "error");
        setTimeout(() => window.location.href = "index.html", 1500);
        return;
    }

    // Update welcome message with user's name
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${user.username}! 👋`;
    }

    // Load statistics
    loadDashboardStats(user);

    // Initialize event form
    initializeEventForm(); // ADD THIS LINE

    // Show correct dashboard area based on role
    const memberArea = document.getElementById("memberArea");
    const subscriberArea = document.getElementById("subscriberArea");

    if (user.role === "member") {
        if (memberArea) memberArea.classList.remove("hidden");
        displayMyEvents();
    } else if (user.role === "subscriber") {
        if (subscriberArea) subscriberArea.classList.remove("hidden");
        loadSubscriberEvents(user);
    }

    // Initialize sidebar
    initializeSidebar();
}

// ---------------- ADMIN APPROVAL SYSTEM ----------------

// Check if current user is admin
function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin";
}

// Load admin dashboard
function loadAdminDashboard() {
    if (!isAdmin()) return;

    loadAdminStatistics();
    loadPendingEvents();
    loadApprovedEvents();
    loadUsers();
}

// Load admin statistics
function loadAdminStatistics() {
    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const pendingCount = customEvents.filter(ev => ev.status === 'pending').length;
    const approvedCount = customEvents.filter(ev => ev.status === 'approved').length;
    
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('approvedCount').textContent = approvedCount;
    document.getElementById('totalEventsCount').textContent = customEvents.length;
    document.getElementById('totalUsers').textContent = users.length;
}

// Load pending events for approval
function loadPendingEvents() {
    const container = document.getElementById('pendingEvents');
    const noEvents = document.getElementById('noPendingEvents');
    
    if (!container) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const pendingEvents = customEvents.filter(ev => ev.status === 'pending');

    container.innerHTML = '';

    if (pendingEvents.length === 0) {
        noEvents.style.display = 'block';
        return;
    }

    noEvents.style.display = 'none';

    pendingEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card pending';
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-badge">${event.category}</div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date} | ⏰ ${event.time}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-desc">${event.desc}</p>
                <p class="event-owner">👤 Created by: ${event.owner}</p>
                <div class="event-footer">
                    <span class="event-price">${event.price}</span>
                    <div class="admin-actions">
                        <button onclick="approveEvent(${event.id})" class="btn-success">✅ Approve</button>
                        <button onclick="rejectEvent(${event.id})" class="btn-danger">❌ Reject</button>
                        <button onclick="viewEventDetails(${event.id})" class="btn">👁️ View</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

// Load recently approved events
function loadApprovedEvents() {
    const container = document.getElementById('approvedEvents');
    if (!container) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const approvedEvents = customEvents.filter(ev => ev.status === 'approved').slice(0, 5); // Show last 5

    container.innerHTML = '';

    approvedEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card approved';
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-badge">${event.category}</div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${event.date}</p>
                <p class="event-price">${event.price}</p>
                <div class="event-footer">
                    <span class="approval-status">✅ Approved</span>
                    <button onclick="viewEventDetails(${event.id})" class="btn">View</button>
                </div>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

// Load users for management
function loadUsers() {
    const container = document.getElementById('userList');
    if (!container) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <strong>${user.username}</strong>
                <span class="user-role ${user.role}">${user.role}</span>
                <span class="user-email">${user.email}</span>
                <span class="join-date">Joined: ${user.joinedDate}</span>
            </div>
            <div class="user-actions">
                <button onclick="promoteToAdmin('${user.username}')" class="btn-secondary" ${user.role === 'admin' ? 'disabled' : ''}>Make Admin</button>
            </div>
        </div>
    `).join('');
}

// Approve an event
function approveEvent(eventId) {
    if (!confirm("Approve this event?")) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const eventIndex = customEvents.findIndex(ev => ev.id === eventId);
    
    if (eventIndex === -1) {
        showNotification("Event not found", "error");
        return;
    }

    customEvents[eventIndex].status = 'approved';
    customEvents[eventIndex].approvedAt = new Date().toISOString();
    
    localStorage.setItem("customEvents", JSON.stringify(customEvents));
    
    showNotification("Event approved successfully! ✅");
    
    // Reload the dashboard
    loadAdminDashboard();
    
    // Simulate notification to event owner
    simulateNotification(customEvents[eventIndex].owner, "Your event has been approved!");
}

// Reject an event
function rejectEvent(eventId) {
    const reason = prompt("Please enter reason for rejection:");
    if (!reason) return;

    const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const eventIndex = customEvents.findIndex(ev => ev.id === eventId);
    
    if (eventIndex === -1) {
        showNotification("Event not found", "error");
        return;
    }

    customEvents[eventIndex].status = 'rejected';
    customEvents[eventIndex].rejectionReason = reason;
    customEvents[eventIndex].rejectedAt = new Date().toISOString();
    
    localStorage.setItem("customEvents", JSON.stringify(customEvents));
    
    showNotification("Event rejected ❌");
    
    // Reload the dashboard
    loadAdminDashboard();
    
    // Simulate notification to event owner
    simulateNotification(customEvents[eventIndex].owner, `Your event was rejected. Reason: ${reason}`);
}

// View event details
function viewEventDetails(eventId) {
    window.open(`event-details.html?id=${eventId}`, '_blank');
}

// Promote user to admin
function promoteToAdmin(username) {
    if (!confirm(`Make ${username} an admin?`)) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex === -1) {
        showNotification("User not found", "error");
        return;
    }

    users[userIndex].role = 'admin';
    localStorage.setItem("users", JSON.stringify(users));
    
    showNotification(`${username} is now an admin! 👑`);
    loadUsers();
}

// Simulate notification (would be email in real system)
function simulateNotification(username, message) {
    console.log(`📧 Notification to ${username}: ${message}`);
    // In a real system, this would send an email
}

// Update event display functions to respect approval status
function displayEvents(list = events) {
    const container = document.getElementById("eventContainer");
    if (!container) return;
    
    container.innerHTML = "";

    // Combine default events with approved custom events
    let customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    customEvents = customEvents.filter(ev => ev.status === 'approved'); // Only show approved events
    
    let allEvents = [...events, ...customEvents];

    // If a specific list is provided, use that instead
    if (list !== events) {
        allEvents = list;
    }

    if (allEvents.length === 0) {
        container.innerHTML = '<div class="no-events"><p>No events found matching your criteria.</p></div>';
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    allEvents.forEach(ev => {
        const isFavorite = checkIfFavorite(ev.id);
        container.innerHTML += `
            <div class="event-card" data-category="${ev.category}">
                <a href="event-details.html?id=${ev.id}">
                    <img src="${ev.image}" alt="${ev.title}" loading="lazy">
                    <div class="event-badge">${ev.category}</div>
                </a>
                <div class="event-content">
                    <h3>
                        <a href="event-details.html?id=${ev.id}">${ev.title}</a>
                    </h3>
                    <p class="event-date">📅 ${ev.date} | 📍 ${ev.location}</p>
                    <p class="event-desc">${ev.desc}</p>
                    <div class="event-footer">
                        <span class="event-price">${ev.price}</span>
                        ${user ? `
                            <button onclick="saveFavorite(${ev.id})" class="favorite-btn ${isFavorite ? 'favorited' : ''}">
                                ${isFavorite ? '⭐ Saved' : '☆ Save'}
                            </button>
                        ` : `
                            <button onclick="openLogin()" class="favorite-btn login-prompt">
                                🔒 Login to Save
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    });
}

// ---------------- INITIALIZATION ----------------
document.addEventListener("DOMContentLoaded", function() {
  // Migrate old favorites
  if (localStorage.getItem("favorites") && !localStorage.getItem("userFavorites")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const oldFavorites = JSON.parse(localStorage.getItem("favorites"));
      const allFavorites = {};
      allFavorites[user.username] = oldFavorites;
      localStorage.setItem("userFavorites", JSON.stringify(allFavorites));
    }
    localStorage.removeItem("favorites");
  }
  
  renderAuthUI();
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const userMenu = document.getElementById('userMenu');
    const dropdown = document.getElementById('userDropdown');
    
    if (userMenu && dropdown && !userMenu.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
  
  // Close modals when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('show');
      setTimeout(() => {
        e.target.classList.add('hidden');
      }, 300);
    }
  });

   // Initialize universal sidebar
  initializeUniversalSidebar();
  updateSidebarContent();

  // Check if we're on the dashboard page and set it up
  if (window.location.pathname.includes('dashboard.html')) {
    setupDashboard();
  }

  // Check if we're on event details page
  if (window.location.pathname.includes('event-details.html')) {
    displayEventDetails();
    loadRelatedEvents();
  }

  // Check if we're on favorites page
  if (window.location.pathname.includes('favorites.html')) {
    displayFavorites();
    updateFavoritesStats();
  }

   // Check if we're on profile page
  if (window.location.pathname.includes('profile.html')) {
      loadProfileData();
  }

  // Check if we're on events page
  if (window.location.pathname.includes('events.html')) {
    displayEvents();
  }
});