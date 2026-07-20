import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Trips", href: "/trips" },
      { label: "Community", href: "/community" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/about#contact" },
      { label: "FAQ", href: "/about#faq" },
      { label: "Cancellation Policy", href: "#" },
      { label: "Safety Guidelines", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: "var(--slate-50)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 no-underline mb-4">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 38,
                  height: 38,
                  background: "var(--navy-700)",
                }}
              >
                <Compass size={22} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[15px] font-bold leading-tight tracking-tight"
                  style={{ color: "var(--navy-700)" }}
                >
                  Zero Gravity
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] leading-tight"
                  style={{ color: "var(--slate-400)" }}
                >
                  Tours
                </span>
              </div>
            </Link>
            <p
              className="text-[14px] leading-relaxed mb-6 max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Providing live schedules, transparent group sizes, and clear inclusions for budget travellers everywhere.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={14} />
                <span>Sydney, AU — Global Operations</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                <Mail size={14} />
                <span>hello@zerogravitytours.com</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                <Phone size={14} />
                <span>+61 2 8000 1234</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                className="text-[13px] font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] no-underline transition-colors duration-200 hover:text-navy-700"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-[13px] m-0"
            style={{ color: "var(--text-tertiary)" }}
          >
            © {new Date().getFullYear()} Zero Gravity Tours. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-[13px] no-underline transition-colors hover:text-navy-700"
              style={{ color: "var(--text-tertiary)" }}
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[13px] no-underline transition-colors hover:text-navy-700"
              style={{ color: "var(--text-tertiary)" }}
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[13px] no-underline transition-colors hover:text-navy-700"
              style={{ color: "var(--text-tertiary)" }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
