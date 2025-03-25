# Avatar

Die Avatar-Komponente wird verwendet, um Benutzer oder Entitäten visuell darzustellen. Sie unterstützt Bilder, Initialen und Status-Indikatoren.

## Import

```jsx
import { Avatar, AvatarGroup } from '@smolitux/core';
```

## Verwendung

### Einfacher Avatar

```jsx
<Avatar src="/images/profile.jpg" alt="Profilbild" />
```

### Avatar mit Initialen

```jsx
<Avatar name="Max Mustermann" />
```

### Verschiedene Größen

```jsx
<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />
```

### Verschiedene Formen

```jsx
<Avatar shape="circle" name="C" />
<Avatar shape="square" name="S" />
<Avatar shape="rounded" name="R" />
```

### Avatar mit Rahmen

```jsx
<Avatar 
  src="/images/profile.jpg" 
  bordered 
  borderColor="primary" 
/>
```

### Avatar mit Status

```jsx
<Avatar 
  src="/images/profile.jpg" 
  status="online" 
/>

<Avatar 
  name="John Doe" 
  status="offline" 
/>

<Avatar 
  name="Jane Smith" 
  status="away" 
/>

<Avatar 
  name="Bob Johnson" 
  status="busy" 
/>
```

### Avatar-Gruppe

```jsx
<AvatarGroup>
  <Avatar src="/images/user1.jpg" />
  <Avatar src="/images/user2.jpg" />
  <Avatar src="/images/user3.jpg" />
  <Avatar name="JD" />
  <Avatar count={5} /> {/* Zeigt "+5" an */}
</AvatarGroup>
```

### Avatar-Gruppe mit Limit

```jsx
<AvatarGroup max={3}>
  <Avatar src="/images/user1.jpg" />
  <Avatar src="/images/user2.jpg" />
  <Avatar src="/images/user3.jpg" />
  <Avatar src="/images/user4.jpg" />
  <Avatar src="/images/user5.jpg" />
</AvatarGroup>
```

### Benutzerdefinierter Avatar

```jsx
<Avatar
  customComponent={
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
  }
/>
```

## Props

### Avatar Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `src` | `string` | - | Bildquelle URL |
| `alt` | `string` | `'Avatar'` | Ausweichtext, wenn Bild nicht geladen werden kann |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe des Avatars |
| `name` | `string` | - | Platzhaltername (für Avatar ohne Bild) |
| `bordered` | `boolean` | `false` | Rahmen hinzufügen |
| `borderColor` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'gray' \| string` | `'gray'` | Rahmenfarbe |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | - | Status |
| `customComponent` | `ReactNode` | - | Benutzerdefinierte Komponente |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Form des Avatars |
| `group` | `boolean` | `false` | Gruppe von Avataren |
| `stackIndex` | `number` | `0` | Position im Stack (für Gruppen) |
| `count` | `number` | - | Anzahl zusätzlicher Avatare (für "+n" Avatar) |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

### AvatarGroup Props

| Prop | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `children` | `ReactNode` | - | Avatar-Komponenten |
| `max` | `number` | - | Maximale Anzahl anzuzeigender Avatare |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Größe aller Avatare in der Gruppe |
| `spacing` | `number` | `-8` | Abstand zwischen Avataren in Pixeln |
| `className` | `string` | - | Zusätzliche CSS-Klassen |

## Barrierefreiheit

Die Avatar-Komponente ist für Barrierefreiheit optimiert:

- Verwendet `alt`-Attribute für Bilder
- Korrekte ARIA-Attribute für Status-Indikatoren
- Ausreichender Kontrast für Initialen

## Beispiele

### Avatar mit Tooltip

```jsx
import { Tooltip } from '@smolitux/core';

<Tooltip content="Max Mustermann">
  <Avatar src="/images/profile.jpg" />
</Tooltip>
```

### Avatar mit Abzeichen

```jsx
<div className="relative">
  <Avatar src="/images/profile.jpg" />
  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
</div>
```

### Interaktiver Avatar

```jsx
function InteractiveAvatar() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={`
        cursor-pointer transition-transform duration-200
        ${isActive ? 'transform scale-110 ring-2 ring-primary-500' : ''}
      `}
      onClick={() => setIsActive(!isActive)}
    >
      <Avatar 
        src="/images/profile.jpg" 
        alt="Interaktiver Avatar"
        status={isActive ? 'online' : 'offline'}
      />
    </div>
  );
}
```

### Avatar mit Fallback

```jsx
function AvatarWithFallback() {
  return (
    <Avatar
      src="https://invalid-image-url.jpg"
      name="John Doe"
      alt="John Doe"
    />
  );
}
```

### Benutzerliste mit Avataren

```jsx
const users = [
  { id: 1, name: 'John Doe', avatar: '/images/john.jpg', status: 'online' },
  { id: 2, name: 'Jane Smith', avatar: '/images/jane.jpg', status: 'offline' },
  { id: 3, name: 'Bob Johnson', avatar: '/images/bob.jpg', status: 'away' },
  { id: 4, name: 'Alice Brown', avatar: null, status: 'busy' },
];

function UserList() {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Avatar 
            src={user.avatar} 
            name={user.name} 
            status={user.status} 
            size="md"
          />
          <div className="ml-3">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Avatar mit Hintergrundfarbe basierend auf Namen

```jsx
function ColoredAvatar({ name }) {
  // Einfache Funktion, um eine konsistente Farbe basierend auf dem Namen zu generieren
  const getColorFromName = (name) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  return (
    <Avatar 
      name={name} 
      className={getColorFromName(name)}
    />
  );
}

// Verwendung
<ColoredAvatar name="John Doe" />
<ColoredAvatar name="Jane Smith" />
<ColoredAvatar name="Bob Johnson" />
```