import { KineticText } from '../typography/KineticText.jsx'

export function Menu({ items, onSelect }) {
  return (
    <nav className="menu" aria-label="주 메뉴">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="menu-item"
          onClick={(e) => {
            if (onSelect) onSelect(item, e)
          }}
        >
          <KineticText text={item.label} />
        </a>
      ))}
    </nav>
  )
}
