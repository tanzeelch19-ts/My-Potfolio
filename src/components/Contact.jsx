import { useState } from "react";
import { Mail, Phone, MapPin, Download, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Section from "./Section.jsx";
import { SOCIALS } from "../data/data.js";

function ContactRow({ icon, label, href }) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="p-2 rounded-md bg-paper dark:bg-ink-700 text-amber">
        {icon}
      </span>
      <span className="text-sm text-ink-900 dark:text-paper">{label}</span>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block hover:opacity-80 transition-opacity"
    >
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      setFormStatus("error");
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`;
    setFormStatus("sent");
  };

  return (
    <Section id="contact" eyebrow="07" title="Contact">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ContactRow icon={<Mail size={16} />} label={SOCIALS.email} href={`mailto:${SOCIALS.email}`} />
          <ContactRow icon={<Phone size={16} />} label={SOCIALS.phone} href={`tel:${SOCIALS.phone.replace(/\s/g, "")}`} />
          <ContactRow icon={<MapPin size={16} />} label="Bahawalpur, Punjab, Pakistan" />
          <ContactRow icon={<FaGithub size={16} />} label="github.com/tanzeelch19-ts" href={SOCIALS.github} />
          <ContactRow icon={<FaLinkedin size={16} />} label="LinkedIn" href={SOCIALS.linkedin} />
          <a
            href="/resume.pdf"
            className="font-mono text-sm inline-flex items-center gap-2 mt-2 px-4 py-2.5 rounded-md border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper hover:border-amber transition-colors"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg p-5 glass hover-lift"
        >
          <p className="font-mono text-xs mb-4 text-gray-500 dark:text-gray-400">
            <span className="text-amber">$</span> send --message
          </p>
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Your name"
              className="font-mono w-full px-3 py-2.5 rounded-md text-sm outline-none bg-paper dark:bg-ink-700 border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper focus:border-amber transition-colors"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="font-mono w-full px-3 py-2.5 rounded-md text-sm outline-none bg-paper dark:bg-ink-700 border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper focus:border-amber transition-colors"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={4}
              className="font-mono w-full px-3 py-2.5 rounded-md text-sm outline-none resize-none bg-paper dark:bg-ink-700 border border-paper-line dark:border-ink-line text-ink-900 dark:text-paper focus:border-amber transition-colors"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium bg-amber text-ink-900 hover:bg-amber-bright transition-colors"
            >
              Send Message <Send size={15} />
            </button>
            {formStatus === "error" && (
              <p className="text-xs text-red-500">
                Please fill in every field before sending.
              </p>
            )}
            {formStatus === "sent" && (
              <p className="text-xs text-amber">
                Opening your email app to send this message…
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}