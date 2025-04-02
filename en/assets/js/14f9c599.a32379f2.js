"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7321],{920:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>a,toc:()=>o});const a=JSON.parse('{"id":"examples/layout-examples","title":"Layout-Beispiele","description":"Diese Seite enth\xe4lt interaktive Beispiele f\xfcr die Verwendung der Layout-Komponenten von Smolitux UI in realen Anwendungsf\xe4llen.","source":"@site/docs/examples/layout-examples.md","sourceDirName":"examples","slug":"/examples/layout-examples","permalink":"/smolitux-ui/en/docs/examples/layout-examples","draft":false,"unlisted":false,"editUrl":"https://github.com/EcoSphereNetwork/smolitux-ui/tree/main/docs/docs/examples/layout-examples.md","tags":[],"version":"current","frontMatter":{},"sidebar":"wikiSidebar","previous":{"title":"Formularvalidierung Beispiele","permalink":"/smolitux-ui/en/docs/examples/form-validation-examples"},"next":{"title":"API-Referenz","permalink":"/smolitux-ui/en/docs/api/reference"}}');var i=t(4848),s=t(8453);const r={},l="Layout-Beispiele",d={},o=[{value:"Responsive Dashboard-Layout",id:"responsive-dashboard-layout",level:2},{value:"E-Commerce Produktseite",id:"e-commerce-produktseite",level:2},{value:"Blog-Layout",id:"blog-layout",level:2},{value:"App-Layout mit Navigation",id:"app-layout-mit-navigation",level:2}];function m(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"layout-beispiele",children:"Layout-Beispiele"})}),"\n",(0,i.jsx)(n.p,{children:"Diese Seite enth\xe4lt interaktive Beispiele f\xfcr die Verwendung der Layout-Komponenten von Smolitux UI in realen Anwendungsf\xe4llen."}),"\n",(0,i.jsx)(n.h2,{id:"responsive-dashboard-layout",children:"Responsive Dashboard-Layout"}),"\n",(0,i.jsx)(n.p,{children:"Dieses Beispiel zeigt ein responsives Dashboard-Layout mit Sidebar, Header und Content-Bereich."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:"function DashboardLayout() {\n  const [sidebarOpen, setSidebarOpen] = React.useState(true);\n  const [activeItem, setActiveItem] = React.useState('dashboard');\n  \n  // Simulierte Daten f\xfcr das Dashboard\n  const stats = [\n    { id: 1, title: 'Gesamtumsatz', value: '\u20ac24,567', change: '+12%', trend: 'up' },\n    { id: 2, title: 'Neue Benutzer', value: '1,234', change: '+7.8%', trend: 'up' },\n    { id: 3, title: 'Bestellungen', value: '567', change: '-2.3%', trend: 'down' },\n    { id: 4, title: 'Conversion Rate', value: '3.2%', change: '+0.8%', trend: 'up' },\n  ];\n  \n  const recentActivity = [\n    { id: 1, user: 'Max Mustermann', action: 'hat eine Bestellung aufgegeben', time: 'vor 5 Minuten' },\n    { id: 2, user: 'Anna Schmidt', action: 'hat sich registriert', time: 'vor 12 Minuten' },\n    { id: 3, user: 'Thomas M\xfcller', action: 'hat einen Kommentar hinterlassen', time: 'vor 25 Minuten' },\n    { id: 4, user: 'Lisa Weber', action: 'hat ein Produkt bewertet', time: 'vor 1 Stunde' },\n  ];\n  \n  // Sidebar-Men\xfcpunkte\n  const menuItems = [\n    { id: 'dashboard', label: 'Dashboard', icon: '\ud83d\udcca' },\n    { id: 'users', label: 'Benutzer', icon: '\ud83d\udc65' },\n    { id: 'products', label: 'Produkte', icon: '\ud83d\udce6' },\n    { id: 'orders', label: 'Bestellungen', icon: '\ud83d\uded2' },\n    { id: 'analytics', label: 'Analysen', icon: '\ud83d\udcc8' },\n    { id: 'settings', label: 'Einstellungen', icon: '\u2699\ufe0f' },\n  ];\n  \n  const toggleSidebar = () => {\n    setSidebarOpen(!sidebarOpen);\n  };\n  \n  return (\n    <div className=\"min-h-screen bg-gray-100\">\n      {/* Header */}\n      <header className=\"bg-white shadow-sm\">\n        <Flex \n          justify=\"space-between\" \n          align=\"center\" \n          className=\"px-4 py-3\"\n        >\n          <Flex align=\"center\" gap=\"sm\">\n            <Button \n              variant=\"text\" \n              onClick={toggleSidebar}\n              aria-label=\"Toggle sidebar\"\n            >\n              \u2630\n            </Button>\n            <h1 className=\"text-xl font-bold\">Admin Dashboard</h1>\n          </Flex>\n          \n          <Flex gap=\"md\" align=\"center\">\n            <Button variant=\"outlined\" size=\"sm\">\n              Hilfe\n            </Button>\n            <div className=\"w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center\">\n              \ud83d\udc64\n            </div>\n          </Flex>\n        </Flex>\n      </header>\n      \n      <Flex className=\"min-h-[calc(100vh-56px)]\">\n        {/* Sidebar */}\n        {sidebarOpen && (\n          <div className=\"w-64 bg-white shadow-sm p-4\">\n            <nav>\n              <List>\n                {menuItems.map(item => (\n                  <ListItem \n                    key={item.id}\n                    primary={item.label}\n                    icon={<span className=\"text-xl\">{item.icon}</span>}\n                    className={`rounded cursor-pointer ${activeItem === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}\n                    onClick={() => setActiveItem(item.id)}\n                  />\n                ))}\n              </List>\n            </nav>\n          </div>\n        )}\n        \n        {/* Main Content */}\n        <div className={`flex-1 p-6 ${sidebarOpen ? '' : 'ml-0'}`}>\n          <div className=\"mb-6\">\n            <h2 className=\"text-2xl font-bold mb-2\">Dashboard</h2>\n            <p className=\"text-gray-600\">Willkommen zur\xfcck! Hier ist ein \xdcberblick \xfcber Ihre Daten.</p>\n          </div>\n          \n          {/* Stats Cards */}\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8\">\n            {stats.map(stat => (\n              <div key={stat.id} className=\"bg-white p-6 rounded-lg shadow-sm\">\n                <h3 className=\"text-gray-500 text-sm font-medium mb-1\">{stat.title}</h3>\n                <div className=\"flex items-baseline\">\n                  <span className=\"text-2xl font-bold\">{stat.value}</span>\n                  <span className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>\n                    {stat.change}\n                  </span>\n                </div>\n              </div>\n            ))}\n          </div>\n          \n          {/* Recent Activity */}\n          <div className=\"bg-white rounded-lg shadow-sm p-6 mb-8\">\n            <h3 className=\"text-lg font-bold mb-4\">Neueste Aktivit\xe4ten</h3>\n            <List>\n              {recentActivity.map(activity => (\n                <ListItem \n                  key={activity.id}\n                  primary={activity.user}\n                  secondary={`${activity.action} \u2022 ${activity.time}`}\n                  divider\n                />\n              ))}\n            </List>\n          </div>\n          \n          {/* Charts Placeholder */}\n          <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">\n            <div className=\"bg-white rounded-lg shadow-sm p-6 h-64 flex items-center justify-center\">\n              <div className=\"text-center\">\n                <div className=\"text-4xl mb-2\">\ud83d\udcca</div>\n                <p className=\"text-gray-500\">Umsatzdiagramm</p>\n              </div>\n            </div>\n            <div className=\"bg-white rounded-lg shadow-sm p-6 h-64 flex items-center justify-center\">\n              <div className=\"text-center\">\n                <div className=\"text-4xl mb-2\">\ud83d\udcc8</div>\n                <p className=\"text-gray-500\">Benutzeraktivit\xe4t</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </Flex>\n    </div>\n  );\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"e-commerce-produktseite",children:"E-Commerce Produktseite"}),"\n",(0,i.jsx)(n.p,{children:"Dieses Beispiel zeigt ein Layout f\xfcr eine E-Commerce-Produktseite mit Produktdetails, Bildern und verwandten Produkten."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:'function ProductPage() {\n  // Simulierte Produktdaten\n  const product = {\n    id: 1,\n    name: \'Premium Bluetooth Kopfh\xf6rer\',\n    price: 129.99,\n    rating: 4.5,\n    reviewCount: 127,\n    description: \'Diese Premium Bluetooth Kopfh\xf6rer bieten herausragende Klangqualit\xe4t, aktive Ger\xe4uschunterdr\xfcckung und bis zu 30 Stunden Akkulaufzeit. Perfekt f\xfcr unterwegs und zu Hause.\',\n    features: [\n      \'Aktive Ger\xe4uschunterdr\xfcckung\',\n      \'Bis zu 30 Stunden Akkulaufzeit\',\n      \'Schnellladefunktion (10 Min. = 3 Std. Wiedergabe)\',\n      \'Bluetooth 5.0 mit Multipoint-Verbindung\',\n      \'Integrierte Mikrofone f\xfcr Anrufe\',\n      \'Komfortable Over-Ear-Polster\'\n    ],\n    colors: [\'Schwarz\', \'Wei\xdf\', \'Blau\'],\n    images: [\n      { id: 1, alt: \'Frontansicht\' },\n      { id: 2, alt: \'Seitenansicht\' },\n      { id: 3, alt: \'Detailansicht\' }\n    ]\n  };\n  \n  const relatedProducts = [\n    { id: 1, name: \'Bluetooth Lautsprecher\', price: 89.99, rating: 4.3 },\n    { id: 2, name: \'Kabellose Ohrh\xf6rer\', price: 79.99, rating: 4.7 },\n    { id: 3, name: \'Kopfh\xf6rer-St\xe4nder\', price: 24.99, rating: 4.2 },\n    { id: 4, name: \'Ersatz-Ohrpolster\', price: 19.99, rating: 4.4 }\n  ];\n  \n  const [selectedColor, setSelectedColor] = React.useState(\'Schwarz\');\n  const [quantity, setQuantity] = React.useState(1);\n  const [activeImage, setActiveImage] = React.useState(1);\n  \n  return (\n    <div className="max-w-7xl mx-auto p-6">\n      {/* Breadcrumb */}\n      <div className="mb-6">\n        <Flex gap="xs" className="text-sm text-gray-500">\n          <a href="#" className="hover:text-gray-700">Home</a>\n          <span>/</span>\n          <a href="#" className="hover:text-gray-700">Elektronik</a>\n          <span>/</span>\n          <a href="#" className="hover:text-gray-700">Kopfh\xf6rer</a>\n          <span>/</span>\n          <span className="text-gray-900">{product.name}</span>\n        </Flex>\n      </div>\n      \n      {/* Product Details */}\n      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">\n        {/* Product Images */}\n        <div>\n          <div className="bg-gray-100 rounded-lg mb-4 h-96 flex items-center justify-center">\n            <div className="text-6xl">\ud83c\udfa7</div>\n          </div>\n          <Flex gap="sm" justify="center">\n            {product.images.map(image => (\n              <div \n                key={image.id}\n                className={`w-20 h-20 bg-gray-100 rounded cursor-pointer flex items-center justify-center ${activeImage === image.id ? \'ring-2 ring-blue-500\' : \'\'}`}\n                onClick={() => setActiveImage(image.id)}\n              >\n                <div className="text-2xl">\ud83c\udfa7</div>\n              </div>\n            ))}\n          </Flex>\n        </div>\n        \n        {/* Product Info */}\n        <div>\n          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>\n          \n          <div className="mb-4">\n            <Flex gap="sm" align="center">\n              <div className="flex">\n                {\'\u2605\u2605\u2605\u2605\u2606\'.split(\'\').map((star, i) => (\n                  <span key={i} className="text-yellow-400">{star}</span>\n                ))}\n              </div>\n              <span className="text-gray-600">{product.rating} ({product.reviewCount} Bewertungen)</span>\n            </Flex>\n          </div>\n          \n          <div className="text-2xl font-bold mb-6">\u20ac{product.price.toFixed(2)}</div>\n          \n          <p className="text-gray-700 mb-6">{product.description}</p>\n          \n          {/* Color Selection */}\n          <div className="mb-6">\n            <h3 className="font-medium mb-2">Farbe: {selectedColor}</h3>\n            <Flex gap="sm">\n              {product.colors.map(color => (\n                <div \n                  key={color}\n                  className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center ${selectedColor === color ? \'ring-2 ring-blue-500 ring-offset-2\' : \'\'}`}\n                  style={{ backgroundColor: color === \'Schwarz\' ? \'#000\' : color === \'Wei\xdf\' ? \'#fff\' : \'#3b82f6\', border: color === \'Wei\xdf\' ? \'1px solid #e5e7eb\' : \'none\' }}\n                  onClick={() => setSelectedColor(color)}\n                  title={color}\n                />\n              ))}\n            </Flex>\n          </div>\n          \n          {/* Quantity */}\n          <div className="mb-6">\n            <h3 className="font-medium mb-2">Menge</h3>\n            <Flex align="center" gap="sm">\n              <Button \n                variant="outlined" \n                onClick={() => setQuantity(Math.max(1, quantity - 1))}\n                disabled={quantity <= 1}\n              >\n                -\n              </Button>\n              <span className="w-10 text-center">{quantity}</span>\n              <Button \n                variant="outlined" \n                onClick={() => setQuantity(quantity + 1)}\n              >\n                +\n              </Button>\n            </Flex>\n          </div>\n          \n          {/* Add to Cart */}\n          <Flex gap="md" className="mb-8">\n            <Button variant="primary" fullWidth>\n              In den Warenkorb\n            </Button>\n            <Button variant="outlined">\n              \u2661\n            </Button>\n          </Flex>\n          \n          {/* Features */}\n          <div>\n            <h3 className="font-bold mb-2">Hauptmerkmale:</h3>\n            <ul className="list-disc pl-5 space-y-1">\n              {product.features.map((feature, index) => (\n                <li key={index} className="text-gray-700">{feature}</li>\n              ))}\n            </ul>\n          </div>\n        </div>\n      </div>\n      \n      {/* Related Products */}\n      <div>\n        <h2 className="text-2xl font-bold mb-6">Das k\xf6nnte Ihnen auch gefallen</h2>\n        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">\n          {relatedProducts.map(product => (\n            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">\n              <div className="bg-gray-100 rounded-lg mb-4 h-40 flex items-center justify-center">\n                <div className="text-4xl">\ud83c\udfa7</div>\n              </div>\n              <h3 className="font-medium mb-1">{product.name}</h3>\n              <div className="flex text-yellow-400 text-sm mb-1">{\'\u2605\u2605\u2605\u2605\u2606\'}</div>\n              <div className="font-bold">\u20ac{product.price.toFixed(2)}</div>\n            </div>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"blog-layout",children:"Blog-Layout"}),"\n",(0,i.jsx)(n.p,{children:"Dieses Beispiel zeigt ein Layout f\xfcr einen Blog mit Artikeln, Sidebar und Kommentarbereich."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:'function BlogLayout() {\n  // Simulierte Blogdaten\n  const article = {\n    title: \'Die Zukunft der Web-Entwicklung: Trends f\xfcr 2025\',\n    date: \'15. M\xe4rz 2025\',\n    author: {\n      name: \'Maria Schmidt\',\n      avatar: \'\ud83d\udc69\u200d\ud83d\udcbb\',\n      role: \'Senior Frontend Developer\'\n    },\n    content: `\n      Die Web-Entwicklung entwickelt sich st\xe4ndig weiter, und 2025 wird keine Ausnahme sein. In diesem Artikel werfen wir einen Blick auf die wichtigsten Trends, die die Web-Entwicklung im kommenden Jahr pr\xe4gen werden.\n      \n      ## 1. KI-gest\xfctzte Entwicklungstools\n      \n      K\xfcnstliche Intelligenz revolutioniert die Art und Weise, wie wir Code schreiben und debuggen. KI-Assistenten k\xf6nnen jetzt nicht nur Code vervollst\xe4ndigen, sondern auch Fehler vorhersagen und Optimierungsvorschl\xe4ge machen.\n      \n      ## 2. WebAssembly wird Mainstream\n      \n      WebAssembly (Wasm) erm\xf6glicht es Entwicklern, Hochleistungsanwendungen im Browser auszuf\xfchren. Mit zunehmender Browser-Unterst\xfctzung und besseren Toolchains wird Wasm 2025 zu einer Standardtechnologie f\xfcr komplexe Web-Anwendungen.\n      \n      ## 3. Micro-Frontends gewinnen an Bedeutung\n      \n      Die Aufteilung von Frontend-Anwendungen in kleinere, unabh\xe4ngig entwickelbare und bereitstellbare Teile wird immer beliebter. Micro-Frontends erm\xf6glichen es Teams, unabh\xe4ngig zu arbeiten und verschiedene Technologien innerhalb derselben Anwendung zu verwenden.\n    `,\n    tags: [\'Web-Entwicklung\', \'Trends\', \'JavaScript\', \'WebAssembly\', \'Micro-Frontends\'],\n    comments: [\n      {\n        id: 1,\n        author: \'Thomas Weber\',\n        avatar: \'\ud83d\udc68\',\n        date: \'vor 2 Stunden\',\n        content: \'Sehr interessanter Artikel! Ich bin besonders gespannt auf die Entwicklung von WebAssembly in den n\xe4chsten Jahren.\'\n      },\n      {\n        id: 2,\n        author: \'Julia Becker\',\n        avatar: \'\ud83d\udc69\',\n        date: \'vor 5 Stunden\',\n        content: \'Danke f\xfcr den Einblick! Ich arbeite bereits mit Micro-Frontends und kann best\xe4tigen, dass dieser Ansatz viele Vorteile bietet.\'\n      }\n    ]\n  };\n  \n  const popularPosts = [\n    { id: 1, title: \'TypeScript 5.0: Die wichtigsten Neuerungen\', views: 1245 },\n    { id: 2, title: \'React vs. Vue: Ein objektiver Vergleich\', views: 982 },\n    { id: 3, title: \'CSS Grid: Fortgeschrittene Layouts erstellen\', views: 879 },\n    { id: 4, title: \'Progressive Web Apps in 2025\', views: 754 }\n  ];\n  \n  const categories = [\n    { id: 1, name: \'JavaScript\', count: 42 },\n    { id: 2, name: \'CSS & Design\', count: 38 },\n    { id: 3, name: \'Frontend Frameworks\', count: 27 },\n    { id: 4, name: \'Backend Development\', count: 23 },\n    { id: 5, name: \'DevOps\', count: 19 }\n  ];\n  \n  const [commentText, setCommentText] = React.useState(\'\');\n  \n  return (\n    <div className="max-w-7xl mx-auto p-6">\n      <header className="mb-10">\n        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>\n        <Flex gap="md" align="center" className="text-gray-600">\n          <span>{article.date}</span>\n          <span>\u2022</span>\n          <Flex gap="xs" align="center">\n            <span className="text-xl">{article.author.avatar}</span>\n            <span>{article.author.name}</span>\n          </Flex>\n        </Flex>\n      </header>\n      \n      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">\n        {/* Main Content */}\n        <div className="lg:col-span-2">\n          <article className="prose prose-lg max-w-none mb-10">\n            {article.content.split(\'\\n\\n\').map((paragraph, index) => {\n              if (paragraph.startsWith(\'## \')) {\n                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace(\'## \', \'\')}</h2>;\n              }\n              return <p key={index} className="mb-4">{paragraph}</p>;\n            })}\n          </article>\n          \n          {/* Tags */}\n          <div className="mb-10">\n            <Flex gap="sm" wrap="wrap">\n              {article.tags.map(tag => (\n                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">\n                  {tag}\n                </span>\n              ))}\n            </Flex>\n          </div>\n          \n          {/* Author Bio */}\n          <div className="bg-gray-50 p-6 rounded-lg mb-10">\n            <Flex gap="md">\n              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">\n                {article.author.avatar}\n              </div>\n              <div>\n                <h3 className="font-bold text-lg">{article.author.name}</h3>\n                <p className="text-gray-600 mb-2">{article.author.role}</p>\n                <p className="text-gray-700">\n                  Maria ist eine erfahrene Frontend-Entwicklerin mit \xfcber 10 Jahren Erfahrung in der Webentwicklung.\n                  Sie ist spezialisiert auf moderne JavaScript-Frameworks und Performance-Optimierung.\n                </p>\n              </div>\n            </Flex>\n          </div>\n          \n          {/* Comments */}\n          <div>\n            <h3 className="text-2xl font-bold mb-6">Kommentare ({article.comments.length})</h3>\n            \n            {/* Comment List */}\n            <div className="space-y-6 mb-8">\n              {article.comments.map(comment => (\n                <div key={comment.id} className="border-b border-gray-100 pb-6">\n                  <Flex gap="md">\n                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">\n                      {comment.avatar}\n                    </div>\n                    <div className="flex-1">\n                      <Flex justify="space-between" align="center" className="mb-1">\n                        <span className="font-medium">{comment.author}</span>\n                        <span className="text-sm text-gray-500">{comment.date}</span>\n                      </Flex>\n                      <p className="text-gray-700">{comment.content}</p>\n                    </div>\n                  </Flex>\n                </div>\n              ))}\n            </div>\n            \n            {/* Comment Form */}\n            <div>\n              <h4 className="font-bold mb-4">Hinterlassen Sie einen Kommentar</h4>\n              <form>\n                <TextArea\n                  value={commentText}\n                  onChange={(e) => setCommentText(e.target.value)}\n                  placeholder="Ihr Kommentar..."\n                  rows={4}\n                  className="mb-4"\n                />\n                <Button variant="primary">Kommentar absenden</Button>\n              </form>\n            </div>\n          </div>\n        </div>\n        \n        {/* Sidebar */}\n        <div>\n          {/* Search */}\n          <div className="mb-8">\n            <Input\n              placeholder="Suchen..."\n              className="mb-2"\n            />\n          </div>\n          \n          {/* Popular Posts */}\n          <div className="mb-8">\n            <h3 className="text-xl font-bold mb-4">Beliebte Artikel</h3>\n            <List>\n              {popularPosts.map(post => (\n                <ListItem\n                  key={post.id}\n                  primary={post.title}\n                  secondary={`${post.views} Aufrufe`}\n                  divider\n                />\n              ))}\n            </List>\n          </div>\n          \n          {/* Categories */}\n          <div className="mb-8">\n            <h3 className="text-xl font-bold mb-4">Kategorien</h3>\n            <List>\n              {categories.map(category => (\n                <ListItem\n                  key={category.id}\n                  primary={category.name}\n                  secondary={`${category.count} Artikel`}\n                  divider\n                />\n              ))}\n            </List>\n          </div>\n          \n          {/* Newsletter */}\n          <div className="bg-gray-50 p-6 rounded-lg">\n            <h3 className="text-xl font-bold mb-2">Newsletter abonnieren</h3>\n            <p className="text-gray-700 mb-4">Erhalten Sie die neuesten Artikel direkt in Ihren Posteingang.</p>\n            <Input\n              placeholder="Ihre E-Mail-Adresse"\n              className="mb-2"\n            />\n            <Button variant="primary" fullWidth>Abonnieren</Button>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"app-layout-mit-navigation",children:"App-Layout mit Navigation"}),"\n",(0,i.jsx)(n.p,{children:"Dieses Beispiel zeigt ein Layout f\xfcr eine Web-App mit Navigation, Tabs und Content-Bereich."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:'function AppLayout() {\n  const [activeTab, setActiveTab] = React.useState(\'overview\');\n  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);\n  \n  // Simulierte Projektdaten\n  const project = {\n    name: \'E-Commerce Plattform\',\n    description: \'Eine moderne E-Commerce-Plattform mit Benutzer- und Produktverwaltung.\',\n    progress: 68,\n    status: \'In Bearbeitung\',\n    dueDate: \'15. Mai 2025\',\n    team: [\n      { id: 1, name: \'Anna M.\', avatar: \'\ud83d\udc69\' },\n      { id: 2, name: \'Thomas K.\', avatar: \'\ud83d\udc68\' },\n      { id: 3, name: \'Julia B.\', avatar: \'\ud83d\udc69\u200d\ud83e\uddb0\' },\n      { id: 4, name: \'Michael S.\', avatar: \'\ud83d\udc68\u200d\ud83e\uddb1\' }\n    ],\n    tasks: [\n      { id: 1, title: \'Benutzeroberfl\xe4che entwerfen\', status: \'Abgeschlossen\', assignee: \'Anna M.\' },\n      { id: 2, title: \'API-Endpunkte implementieren\', status: \'In Bearbeitung\', assignee: \'Thomas K.\' },\n      { id: 3, title: \'Zahlungsintegration\', status: \'In Bearbeitung\', assignee: \'Julia B.\' },\n      { id: 4, title: \'Benutzertests durchf\xfchren\', status: \'Ausstehend\', assignee: \'Michael S.\' },\n      { id: 5, title: \'Dokumentation erstellen\', status: \'Ausstehend\', assignee: \'Anna M.\' }\n    ]\n  };\n  \n  // Navigationsmen\xfc\n  const navItems = [\n    { id: \'dashboard\', label: \'Dashboard\', icon: \'\ud83d\udcca\' },\n    { id: \'projects\', label: \'Projekte\', icon: \'\ud83d\udcc1\', active: true },\n    { id: \'tasks\', label: \'Aufgaben\', icon: \'\u2713\' },\n    { id: \'calendar\', label: \'Kalender\', icon: \'\ud83d\udcc5\' },\n    { id: \'messages\', label: \'Nachrichten\', icon: \'\ud83d\udcac\' },\n    { id: \'reports\', label: \'Berichte\', icon: \'\ud83d\udcc8\' }\n  ];\n  \n  // Tabs\n  const tabs = [\n    { id: \'overview\', label: \'\xdcbersicht\' },\n    { id: \'tasks\', label: \'Aufgaben\' },\n    { id: \'files\', label: \'Dateien\' },\n    { id: \'team\', label: \'Team\' },\n    { id: \'settings\', label: \'Einstellungen\' }\n  ];\n  \n  const toggleSidebar = () => {\n    setSidebarCollapsed(!sidebarCollapsed);\n  };\n  \n  return (\n    <div className="min-h-screen bg-gray-50 flex">\n      {/* Sidebar */}\n      <div className={`bg-gray-800 text-white ${sidebarCollapsed ? \'w-16\' : \'w-64\'} transition-all duration-300 ease-in-out`}>\n        {/* Logo */}\n        <div className="p-4 border-b border-gray-700">\n          <Flex justify={sidebarCollapsed ? \'center\' : \'space-between\'} align="center">\n            {!sidebarCollapsed && <span className="font-bold text-xl">TaskFlow</span>}\n            <Button \n              variant="text" \n              color="light"\n              onClick={toggleSidebar}\n              aria-label="Toggle sidebar"\n            >\n              {sidebarCollapsed ? \'\u2192\' : \'\u2190\'}\n            </Button>\n          </Flex>\n        </div>\n        \n        {/* Navigation */}\n        <nav className="p-2">\n          <List>\n            {navItems.map(item => (\n              <ListItem\n                key={item.id}\n                primary={sidebarCollapsed ? null : item.label}\n                icon={<span className="text-xl">{item.icon}</span>}\n                className={`rounded my-1 ${item.active ? \'bg-blue-600\' : \'hover:bg-gray-700\'}`}\n              />\n            ))}\n          </List>\n        </nav>\n      </div>\n      \n      {/* Main Content */}\n      <div className="flex-1 flex flex-col">\n        {/* Header */}\n        <header className="bg-white shadow-sm">\n          <Flex justify="space-between" align="center" className="px-6 py-3">\n            <h1 className="text-xl font-bold">Projekte</h1>\n            \n            <Flex gap="md" align="center">\n              <Button variant="outlined" size="sm">\n                <span className="mr-1">+</span> Neues Projekt\n              </Button>\n              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">\n                \ud83d\udc64\n              </div>\n            </Flex>\n          </Flex>\n        </header>\n        \n        {/* Project Header */}\n        <div className="bg-white border-b p-6">\n          <Flex justify="space-between" align="flex-start" className="mb-6">\n            <div>\n              <h2 className="text-2xl font-bold mb-1">{project.name}</h2>\n              <p className="text-gray-600">{project.description}</p>\n            </div>\n            <Flex gap="sm">\n              <Button variant="outlined" size="sm">Bearbeiten</Button>\n              <Button variant="primary" size="sm">Teilen</Button>\n            </Flex>\n          </Flex>\n          \n          <Flex gap="md" wrap="wrap">\n            <div className="bg-gray-50 px-4 py-2 rounded">\n              <div className="text-sm text-gray-500 mb-1">Status</div>\n              <div className="font-medium">{project.status}</div>\n            </div>\n            <div className="bg-gray-50 px-4 py-2 rounded">\n              <div className="text-sm text-gray-500 mb-1">F\xe4lligkeitsdatum</div>\n              <div className="font-medium">{project.dueDate}</div>\n            </div>\n            <div className="bg-gray-50 px-4 py-2 rounded">\n              <div className="text-sm text-gray-500 mb-1">Fortschritt</div>\n              <div className="font-medium">{project.progress}%</div>\n            </div>\n            <div className="bg-gray-50 px-4 py-2 rounded">\n              <div className="text-sm text-gray-500 mb-1">Team</div>\n              <Flex gap="xs">\n                {project.team.map(member => (\n                  <div key={member.id} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" title={member.name}>\n                    {member.avatar}\n                  </div>\n                ))}\n              </Flex>\n            </div>\n          </Flex>\n        </div>\n        \n        {/* Tabs */}\n        <div className="bg-white border-b">\n          <Flex className="px-6">\n            {tabs.map(tab => (\n              <div\n                key={tab.id}\n                className={`px-4 py-3 cursor-pointer ${activeTab === tab.id ? \'border-b-2 border-blue-500 text-blue-600 font-medium\' : \'text-gray-600 hover:text-gray-900\'}`}\n                onClick={() => setActiveTab(tab.id)}\n              >\n                {tab.label}\n              </div>\n            ))}\n          </Flex>\n        </div>\n        \n        {/* Content */}\n        <div className="flex-1 p-6">\n          {activeTab === \'overview\' && (\n            <div>\n              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">\n                {/* Progress Card */}\n                <div className="bg-white p-6 rounded-lg shadow-sm">\n                  <h3 className="text-lg font-bold mb-4">Projektfortschritt</h3>\n                  <div className="mb-2">\n                    <Flex justify="space-between" className="mb-1">\n                      <span>Fortschritt</span>\n                      <span>{project.progress}%</span>\n                    </Flex>\n                    <div className="w-full bg-gray-200 rounded-full h-2.5">\n                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>\n                    </div>\n                  </div>\n                  <div className="mt-4">\n                    <Flex justify="space-between" className="text-sm text-gray-500">\n                      <span>Start: 1. Februar 2025</span>\n                      <span>Ende: {project.dueDate}</span>\n                    </Flex>\n                  </div>\n                </div>\n                \n                {/* Recent Activity Card */}\n                <div className="bg-white p-6 rounded-lg shadow-sm">\n                  <h3 className="text-lg font-bold mb-4">Neueste Aktivit\xe4ten</h3>\n                  <List>\n                    <ListItem \n                      primary="Thomas K. hat eine Aufgabe abgeschlossen"\n                      secondary="vor 2 Stunden"\n                      divider\n                    />\n                    <ListItem \n                      primary="Anna M. hat eine neue Datei hochgeladen"\n                      secondary="vor 5 Stunden"\n                      divider\n                    />\n                    <ListItem \n                      primary="Julia B. hat einen Kommentar hinzugef\xfcgt"\n                      secondary="gestern"\n                    />\n                  </List>\n                </div>\n              </div>\n              \n              {/* Tasks Overview */}\n              <div className="bg-white p-6 rounded-lg shadow-sm">\n                <Flex justify="space-between" align="center" className="mb-4">\n                  <h3 className="text-lg font-bold">Aufgaben</h3>\n                  <Button variant="text" color="primary">Alle anzeigen</Button>\n                </Flex>\n                <table className="w-full">\n                  <thead>\n                    <tr className="border-b">\n                      <th className="text-left py-2 font-medium">Aufgabe</th>\n                      <th className="text-left py-2 font-medium">Status</th>\n                      <th className="text-left py-2 font-medium">Zugewiesen an</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    {project.tasks.map(task => (\n                      <tr key={task.id} className="border-b">\n                        <td className="py-3">{task.title}</td>\n                        <td className="py-3">\n                          <span className={`px-2 py-1 rounded-full text-xs ${\n                            task.status === \'Abgeschlossen\' ? \'bg-green-100 text-green-800\' :\n                            task.status === \'In Bearbeitung\' ? \'bg-blue-100 text-blue-800\' :\n                            \'bg-gray-100 text-gray-800\'\n                          }`}>\n                            {task.status}\n                          </span>\n                        </td>\n                        <td className="py-3">{task.assignee}</td>\n                      </tr>\n                    ))}\n                  </tbody>\n                </table>\n              </div>\n            </div>\n          )}\n          \n          {activeTab === \'tasks\' && (\n            <div className="bg-white p-6 rounded-lg shadow-sm">\n              <h3 className="text-lg font-bold mb-4">Alle Aufgaben</h3>\n              <p>Hier werden alle Projektaufgaben angezeigt.</p>\n            </div>\n          )}\n          \n          {activeTab === \'files\' && (\n            <div className="bg-white p-6 rounded-lg shadow-sm">\n              <h3 className="text-lg font-bold mb-4">Dateien</h3>\n              <p>Hier werden alle Projektdateien angezeigt.</p>\n            </div>\n          )}\n          \n          {activeTab === \'team\' && (\n            <div className="bg-white p-6 rounded-lg shadow-sm">\n              <h3 className="text-lg font-bold mb-4">Teammitglieder</h3>\n              <p>Hier werden alle Teammitglieder angezeigt.</p>\n            </div>\n          )}\n          \n          {activeTab === \'settings\' && (\n            <div className="bg-white p-6 rounded-lg shadow-sm">\n              <h3 className="text-lg font-bold mb-4">Projekteinstellungen</h3>\n              <p>Hier k\xf6nnen Sie die Projekteinstellungen verwalten.</p>\n            </div>\n          )}\n        </div>\n      </div>\n    </div>\n  );\n}\n'})})]})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var a=t(6540);const i={},s=a.createContext(i);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);