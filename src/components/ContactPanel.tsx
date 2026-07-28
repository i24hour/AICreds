import type { ContactMethod } from "@/lib/types";

type ContactItem = {
  key: keyof ContactMethod;
  label: string;
  href: (value: string) => string | null;
  display: (value: string) => string;
};

const ITEMS: ContactItem[] = [
  {
    key: "email",
    label: "Email",
    href: (v) => `mailto:${v}`,
    display: (v) => v,
  },
  {
    key: "phone",
    label: "Phone",
    href: (v) => `tel:${v.replace(/\s+/g, "")}`,
    display: (v) => v,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: (v) => {
      const digits = v.replace(/[^\d+]/g, "").replace(/^\+/, "");
      return `https://wa.me/${digits}`;
    },
    display: (v) => v,
  },
  {
    key: "telegram",
    label: "Telegram",
    href: (v) => {
      const handle = v.replace(/^@/, "");
      return `https://t.me/${handle}`;
    },
    display: (v) => (v.startsWith("@") ? v : `@${v}`),
  },
  {
    key: "discord",
    label: "Discord",
    href: () => null,
    display: (v) => v,
  },
  {
    key: "reddit",
    label: "Reddit",
    href: (v) => {
      const user = v.replace(/^u\//, "");
      return `https://reddit.com/user/${user}`;
    },
    display: (v) => (v.startsWith("u/") ? v : `u/${v}`),
  },
];

export function ContactPanel({
  contact,
  sellerName,
}: {
  contact: ContactMethod;
  sellerName: string;
}) {
  const available = ITEMS.filter((item) => Boolean(contact[item.key]?.trim()));

  if (available.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        No contact methods were provided for this listing.
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm text-ink-muted">
        Reach {sellerName} on any of the channels below. Deals happen off-platform.
      </p>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {available.map((item) => {
          const value = contact[item.key]!.trim();
          const href = item.href(value);
          const content = (
            <>
              <span className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                {item.label}
              </span>
              <span className="mt-1 block font-medium text-ink">
                {item.display(value)}
              </span>
            </>
          );

          return (
            <li key={item.key}>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block py-4 transition-colors hover:bg-accent-soft/50 sm:px-2"
                >
                  {content}
                </a>
              ) : (
                <div className="py-4 sm:px-2">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
