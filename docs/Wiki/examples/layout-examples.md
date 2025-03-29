# Layout-Beispiele

Diese Seite enthält interaktive Beispiele für die Verwendung der Layout-Komponenten von Smolitux UI in realen Anwendungsfällen.

## Responsive Dashboard-Layout

Dieses Beispiel zeigt ein responsives Dashboard-Layout mit Sidebar, Header und Content-Bereich.

```jsx live
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState('dashboard');
  
  // Simulierte Daten für das Dashboard
  const stats = [
    { id: 1, title: 'Gesamtumsatz', value: '€24,567', change: '+12%', trend: 'up' },
    { id: 2, title: 'Neue Benutzer', value: '1,234', change: '+7.8%', trend: 'up' },
    { id: 3, title: 'Bestellungen', value: '567', change: '-2.3%', trend: 'down' },
    { id: 4, title: 'Conversion Rate', value: '3.2%', change: '+0.8%', trend: 'up' },
  ];
  
  const recentActivity = [
    { id: 1, user: 'Max Mustermann', action: 'hat eine Bestellung aufgegeben', time: 'vor 5 Minuten' },
    { id: 2, user: 'Anna Schmidt', action: 'hat sich registriert', time: 'vor 12 Minuten' },
    { id: 3, user: 'Thomas Müller', action: 'hat einen Kommentar hinterlassen', time: 'vor 25 Minuten' },
    { id: 4, user: 'Lisa Weber', action: 'hat ein Produkt bewertet', time: 'vor 1 Stunde' },
  ];
  
  // Sidebar-Menüpunkte
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Benutzer', icon: '👥' },
    { id: 'products', label: 'Produkte', icon: '📦' },
    { id: 'orders', label: 'Bestellungen', icon: '🛒' },
    { id: 'analytics', label: 'Analysen', icon: '📈' },
    { id: 'settings', label: 'Einstellungen', icon: '⚙️' },
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <Flex 
          justify="space-between" 
          align="center" 
          className="px-4 py-3"
        >
          <Flex align="center" gap="sm">
            <Button 
              variant="text" 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              ☰
            </Button>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Flex>
          
          <Flex gap="md" align="center">
            <Button variant="outlined" size="sm">
              Hilfe
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              👤
            </div>
          </Flex>
        </Flex>
      </header>
      
      <Flex className="min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-white shadow-sm p-4">
            <nav>
              <List>
                {menuItems.map(item => (
                  <ListItem 
                    key={item.id}
                    primary={item.label}
                    icon={<span className="text-xl">{item.icon}</span>}
                    className={`rounded cursor-pointer ${activeItem === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveItem(item.id)}
                  />
                ))}
              </List>
            </nav>
          </div>
        )}
        
        {/* Main Content */}
        <div className={`flex-1 p-6 ${sidebarOpen ? '' : 'ml-0'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-600">Willkommen zurück! Hier ist ein Überblick über Ihre Daten.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(stat => (
              <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Neueste Aktivitäten</h3>
            <List>
              {recentActivity.map(activity => (
                <ListItem 
                  key={activity.id}
                  primary={activity.user}
                  secondary={`${activity.action} • ${activity.time}`}
                  divider
                />
              ))}
            </List>
          </div>
          
          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-500">Umsatzdiagramm</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-500">Benutzeraktivität</p>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
}
```

## E-Commerce Produktseite

Dieses Beispiel zeigt ein Layout für eine E-Commerce-Produktseite mit Produktdetails, Bildern und verwandten Produkten.

```jsx live
function ProductPage() {
  // Simulierte Produktdaten
  const product = {
    id: 1,
    name: 'Premium Bluetooth Kopfhörer',
    price: 129.99,
    rating: 4.5,
    reviewCount: 127,
    description: 'Diese Premium Bluetooth Kopfhörer bieten herausragende Klangqualität, aktive Geräuschunterdrückung und bis zu 30 Stunden Akkulaufzeit. Perfekt für unterwegs und zu Hause.',
    features: [
      'Aktive Geräuschunterdrückung',
      'Bis zu 30 Stunden Akkulaufzeit',
      'Schnellladefunktion (10 Min. = 3 Std. Wiedergabe)',
      'Bluetooth 5.0 mit Multipoint-Verbindung',
      'Integrierte Mikrofone für Anrufe',
      'Komfortable Over-Ear-Polster'
    ],
    colors: ['Schwarz', 'Weiß', 'Blau'],
    images: [
      { id: 1, alt: 'Frontansicht' },
      { id: 2, alt: 'Seitenansicht' },
      { id: 3, alt: 'Detailansicht' }
    ]
  };
  
  const relatedProducts = [
    { id: 1, name: 'Bluetooth Lautsprecher', price: 89.99, rating: 4.3 },
    { id: 2, name: 'Kabellose Ohrhörer', price: 79.99, rating: 4.7 },
    { id: 3, name: 'Kopfhörer-Ständer', price: 24.99, rating: 4.2 },
    { id: 4, name: 'Ersatz-Ohrpolster', price: 19.99, rating: 4.4 }
  ];
  
  const [selectedColor, setSelectedColor] = React.useState('Schwarz');
  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(1);
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Flex gap="xs" className="text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-gray-700">Elektronik</a>
          <span>/</span>
          <a href="#" className="hover:text-gray-700">Kopfhörer</a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </Flex>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Images */}
        <div>
          <div className="bg-gray-100 rounded-lg mb-4 h-96 flex items-center justify-center">
            <div className="text-6xl">🎧</div>
          </div>
          <Flex gap="sm" justify="center">
            {product.images.map(image => (
              <div 
                key={image.id}
                className={`w-20 h-20 bg-gray-100 rounded cursor-pointer flex items-center justify-center ${activeImage === image.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setActiveImage(image.id)}
              >
                <div className="text-2xl">🎧</div>
              </div>
            ))}
          </Flex>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="mb-4">
            <Flex gap="sm" align="center">
              <div className="flex">
                {'★★★★☆'.split('').map((star, i) => (
                  <span key={i} className="text-yellow-400">{star}</span>
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviewCount} Bewertungen)</span>
            </Flex>
          </div>
          
          <div className="text-2xl font-bold mb-6">€{product.price.toFixed(2)}</div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Farbe: {selectedColor}</h3>
            <Flex gap="sm">
              {product.colors.map(color => (
                <div 
                  key={color}
                  className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                  style={{ backgroundColor: color === 'Schwarz' ? '#000' : color === 'Weiß' ? '#fff' : '#3b82f6', border: color === 'Weiß' ? '1px solid #e5e7eb' : 'none' }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </Flex>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Menge</h3>
            <Flex align="center" gap="sm">
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </Flex>
          </div>
          
          {/* Add to Cart */}
          <Flex gap="md" className="mb-8">
            <Button variant="primary" fullWidth>
              In den Warenkorb
            </Button>
            <Button variant="outlined">
              ♡
            </Button>
          </Flex>
          
          {/* Features */}
          <div>
            <h3 className="font-bold mb-2">Hauptmerkmale:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Das könnte Ihnen auch gefallen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="bg-gray-100 rounded-lg mb-4 h-40 flex items-center justify-center">
                <div className="text-4xl">🎧</div>
              </div>
              <h3 className="font-medium mb-1">{product.name}</h3>
              <div className="flex text-yellow-400 text-sm mb-1">{'★★★★☆'}</div>
              <div className="font-bold">€{product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Blog-Layout

Dieses Beispiel zeigt ein Layout für einen Blog mit Artikeln, Sidebar und Kommentarbereich.

```jsx live
function BlogLayout() {
  // Simulierte Blogdaten
  const article = {
    title: 'Die Zukunft der Web-Entwicklung: Trends für 2025',
    date: '15. März 2025',
    author: {
      name: 'Maria Schmidt',
      avatar: '👩‍💻',
      role: 'Senior Frontend Developer'
    },
    content: `
      Die Web-Entwicklung entwickelt sich ständig weiter, und 2025 wird keine Ausnahme sein. In diesem Artikel werfen wir einen Blick auf die wichtigsten Trends, die die Web-Entwicklung im kommenden Jahr prägen werden.
      
      ## 1. KI-gestützte Entwicklungstools
      
      Künstliche Intelligenz revolutioniert die Art und Weise, wie wir Code schreiben und debuggen. KI-Assistenten können jetzt nicht nur Code vervollständigen, sondern auch Fehler vorhersagen und Optimierungsvorschläge machen.
      
      ## 2. WebAssembly wird Mainstream
      
      WebAssembly (Wasm) ermöglicht es Entwicklern, Hochleistungsanwendungen im Browser auszuführen. Mit zunehmender Browser-Unterstützung und besseren Toolchains wird Wasm 2025 zu einer Standardtechnologie für komplexe Web-Anwendungen.
      
      ## 3. Micro-Frontends gewinnen an Bedeutung
      
      Die Aufteilung von Frontend-Anwendungen in kleinere, unabhängig entwickelbare und bereitstellbare Teile wird immer beliebter. Micro-Frontends ermöglichen es Teams, unabhängig zu arbeiten und verschiedene Technologien innerhalb derselben Anwendung zu verwenden.
    `,
    tags: ['Web-Entwicklung', 'Trends', 'JavaScript', 'WebAssembly', 'Micro-Frontends'],
    comments: [
      {
        id: 1,
        author: 'Thomas Weber',
        avatar: '👨',
        date: 'vor 2 Stunden',
        content: 'Sehr interessanter Artikel! Ich bin besonders gespannt auf die Entwicklung von WebAssembly in den nächsten Jahren.'
      },
      {
        id: 2,
        author: 'Julia Becker',
        avatar: '👩',
        date: 'vor 5 Stunden',
        content: 'Danke für den Einblick! Ich arbeite bereits mit Micro-Frontends und kann bestätigen, dass dieser Ansatz viele Vorteile bietet.'
      }
    ]
  };
  
  const popularPosts = [
    { id: 1, title: 'TypeScript 5.0: Die wichtigsten Neuerungen', views: 1245 },
    { id: 2, title: 'React vs. Vue: Ein objektiver Vergleich', views: 982 },
    { id: 3, title: 'CSS Grid: Fortgeschrittene Layouts erstellen', views: 879 },
    { id: 4, title: 'Progressive Web Apps in 2025', views: 754 }
  ];
  
  const categories = [
    { id: 1, name: 'JavaScript', count: 42 },
    { id: 2, name: 'CSS & Design', count: 38 },
    { id: 3, name: 'Frontend Frameworks', count: 27 },
    { id: 4, name: 'Backend Development', count: 23 },
    { id: 5, name: 'DevOps', count: 19 }
  ];
  
  const [commentText, setCommentText] = React.useState('');
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
        <Flex gap="md" align="center" className="text-gray-600">
          <span>{article.date}</span>
          <span>•</span>
          <Flex gap="xs" align="center">
            <span className="text-xl">{article.author.avatar}</span>
            <span>{article.author.name}</span>
          </Flex>
        </Flex>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="prose prose-lg max-w-none mb-10">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </article>
          
          {/* Tags */}
          <div className="mb-10">
            <Flex gap="sm" wrap="wrap">
              {article.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </Flex>
          </div>
          
          {/* Author Bio */}
          <div className="bg-gray-50 p-6 rounded-lg mb-10">
            <Flex gap="md">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
                {article.author.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg">{article.author.name}</h3>
                <p className="text-gray-600 mb-2">{article.author.role}</p>
                <p className="text-gray-700">
                  Maria ist eine erfahrene Frontend-Entwicklerin mit über 10 Jahren Erfahrung in der Webentwicklung.
                  Sie ist spezialisiert auf moderne JavaScript-Frameworks und Performance-Optimierung.
                </p>
              </div>
            </Flex>
          </div>
          
          {/* Comments */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Kommentare ({article.comments.length})</h3>
            
            {/* Comment List */}
            <div className="space-y-6 mb-8">
              {article.comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-100 pb-6">
                  <Flex gap="md">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <Flex justify="space-between" align="center" className="mb-1">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </Flex>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </Flex>
                </div>
              ))}
            </div>
            
            {/* Comment Form */}
            <div>
              <h4 className="font-bold mb-4">Hinterlassen Sie einen Kommentar</h4>
              <form>
                <TextArea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ihr Kommentar..."
                  rows={4}
                  className="mb-4"
                />
                <Button variant="primary">Kommentar absenden</Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Search */}
          <div className="mb-8">
            <Input
              placeholder="Suchen..."
              className="mb-2"
            />
          </div>
          
          {/* Popular Posts */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Beliebte Artikel</h3>
            <List>
              {popularPosts.map(post => (
                <ListItem
                  key={post.id}
                  primary={post.title}
                  secondary={`${post.views} Aufrufe`}
                  divider
                />
              ))}
            </List>
          </div>
          
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Kategorien</h3>
            <List>
              {categories.map(category => (
                <ListItem
                  key={category.id}
                  primary={category.name}
                  secondary={`${category.count} Artikel`}
                  divider
                />
              ))}
            </List>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Newsletter abonnieren</h3>
            <p className="text-gray-700 mb-4">Erhalten Sie die neuesten Artikel direkt in Ihren Posteingang.</p>
            <Input
              placeholder="Ihre E-Mail-Adresse"
              className="mb-2"
            />
            <Button variant="primary" fullWidth>Abonnieren</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## App-Layout mit Navigation

Dieses Beispiel zeigt ein Layout für eine Web-App mit Navigation, Tabs und Content-Bereich.

```jsx live
function AppLayout() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  // Simulierte Projektdaten
  const project = {
    name: 'E-Commerce Plattform',
    description: 'Eine moderne E-Commerce-Plattform mit Benutzer- und Produktverwaltung.',
    progress: 68,
    status: 'In Bearbeitung',
    dueDate: '15. Mai 2025',
    team: [
      { id: 1, name: 'Anna M.', avatar: '👩' },
      { id: 2, name: 'Thomas K.', avatar: '👨' },
      { id: 3, name: 'Julia B.', avatar: '👩‍🦰' },
      { id: 4, name: 'Michael S.', avatar: '👨‍🦱' }
    ],
    tasks: [
      { id: 1, title: 'Benutzeroberfläche entwerfen', status: 'Abgeschlossen', assignee: 'Anna M.' },
      { id: 2, title: 'API-Endpunkte implementieren', status: 'In Bearbeitung', assignee: 'Thomas K.' },
      { id: 3, title: 'Zahlungsintegration', status: 'In Bearbeitung', assignee: 'Julia B.' },
      { id: 4, title: 'Benutzertests durchführen', status: 'Ausstehend', assignee: 'Michael S.' },
      { id: 5, title: 'Dokumentation erstellen', status: 'Ausstehend', assignee: 'Anna M.' }
    ]
  };
  
  // Navigationsmenü
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projekte', icon: '📁', active: true },
    { id: 'tasks', label: 'Aufgaben', icon: '✓' },
    { id: 'calendar', label: 'Kalender', icon: '📅' },
    { id: 'messages', label: 'Nachrichten', icon: '💬' },
    { id: 'reports', label: 'Berichte', icon: '📈' }
  ];
  
  // Tabs
  const tabs = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'tasks', label: 'Aufgaben' },
    { id: 'files', label: 'Dateien' },
    { id: 'team', label: 'Team' },
    { id: 'settings', label: 'Einstellungen' }
  ];
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <Flex justify={sidebarCollapsed ? 'center' : 'space-between'} align="center">
            {!sidebarCollapsed && <span className="font-bold text-xl">TaskFlow</span>}
            <Button 
              variant="text" 
              color="light"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? '→' : '←'}
            </Button>
          </Flex>
        </div>
        
        {/* Navigation */}
        <nav className="p-2">
          <List>
            {navItems.map(item => (
              <ListItem
                key={item.id}
                primary={sidebarCollapsed ? null : item.label}
                icon={<span className="text-xl">{item.icon}</span>}
                className={`rounded my-1 ${item.active ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              />
            ))}
          </List>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <Flex justify="space-between" align="center" className="px-6 py-3">
            <h1 className="text-xl font-bold">Projekte</h1>
            
            <Flex gap="md" align="center">
              <Button variant="outlined" size="sm">
                <span className="mr-1">+</span> Neues Projekt
              </Button>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                👤
              </div>
            </Flex>
          </Flex>
        </header>
        
        {/* Project Header */}
        <div className="bg-white border-b p-6">
          <Flex justify="space-between" align="flex-start" className="mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <Flex gap="sm">
              <Button variant="outlined" size="sm">Bearbeiten</Button>
              <Button variant="primary" size="sm">Teilen</Button>
            </Flex>
          </Flex>
          
          <Flex gap="md" wrap="wrap">
            <div className="bg-gray-50 px-4 py-2 rounded">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div className="font-medium">{project.status}</div>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded">
              <div className="text-sm text-gray-500 mb-1">Fälligkeitsdatum</div>
              <div className="font-medium">{project.dueDate}</div>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded">
              <div className="text-sm text-gray-500 mb-1">Fortschritt</div>
              <div className="font-medium">{project.progress}%</div>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded">
              <div className="text-sm text-gray-500 mb-1">Team</div>
              <Flex gap="xs">
                {project.team.map(member => (
                  <div key={member.id} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" title={member.name}>
                    {member.avatar}
                  </div>
                ))}
              </Flex>
            </div>
          </Flex>
        </div>
        
        {/* Tabs */}
        <div className="bg-white border-b">
          <Flex className="px-6">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`px-4 py-3 cursor-pointer ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </Flex>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Progress Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Projektfortschritt</h3>
                  <div className="mb-2">
                    <Flex justify="space-between" className="mb-1">
                      <span>Fortschritt</span>
                      <span>{project.progress}%</span>
                    </Flex>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Flex justify="space-between" className="text-sm text-gray-500">
                      <span>Start: 1. Februar 2025</span>
                      <span>Ende: {project.dueDate}</span>
                    </Flex>
                  </div>
                </div>
                
                {/* Recent Activity Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Neueste Aktivitäten</h3>
                  <List>
                    <ListItem 
                      primary="Thomas K. hat eine Aufgabe abgeschlossen"
                      secondary="vor 2 Stunden"
                      divider
                    />
                    <ListItem 
                      primary="Anna M. hat eine neue Datei hochgeladen"
                      secondary="vor 5 Stunden"
                      divider
                    />
                    <ListItem 
                      primary="Julia B. hat einen Kommentar hinzugefügt"
                      secondary="gestern"
                    />
                  </List>
                </div>
              </div>
              
              {/* Tasks Overview */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Flex justify="space-between" align="center" className="mb-4">
                  <h3 className="text-lg font-bold">Aufgaben</h3>
                  <Button variant="text" color="primary">Alle anzeigen</Button>
                </Flex>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Aufgabe</th>
                      <th className="text-left py-2 font-medium">Status</th>
                      <th className="text-left py-2 font-medium">Zugewiesen an</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.tasks.map(task => (
                      <tr key={task.id} className="border-b">
                        <td className="py-3">{task.title}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'Abgeschlossen' ? 'bg-green-100 text-green-800' :
                            task.status === 'In Bearbeitung' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3">{task.assignee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Alle Aufgaben</h3>
              <p>Hier werden alle Projektaufgaben angezeigt.</p>
            </div>
          )}
          
          {activeTab === 'files' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Dateien</h3>
              <p>Hier werden alle Projektdateien angezeigt.</p>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Teammitglieder</h3>
              <p>Hier werden alle Teammitglieder angezeigt.</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Projekteinstellungen</h3>
              <p>Hier können Sie die Projekteinstellungen verwalten.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```